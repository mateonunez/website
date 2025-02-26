import Cookies from 'js-cookie';
import { z } from 'zod';

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const defaultOptions: CookieOptions = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

export class CookieError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CookieError';
  }
}

const validateName = (name: string): void => {
  if (!name || typeof name !== 'string') {
    throw new CookieError('Cookie name must be a non-empty string');
  }
};

const mergeOptions = (options?: CookieOptions): CookieOptions => ({
  ...defaultOptions,
  ...options,
});

export const cookieService = {
  get<T>(name: string, schema?: z.ZodType<T>): T | undefined {
    validateName(name);

    try {
      const value = Cookies.get(name);
      if (!value) return undefined;

      const parsed = JSON.parse(value);

      if (schema) {
        return schema.parse(parsed);
      }

      return parsed;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new CookieError(`Cookie validation failed: ${error.message}`);
      }
      return undefined;
    }
  },

  set<T>(name: string, value: T, options?: CookieOptions): void {
    validateName(name);

    try {
      const stringValue = JSON.stringify(value);
      const mergedOptions = mergeOptions(options);

      Cookies.set(name, stringValue, mergedOptions);
    } catch (error) {
      throw new CookieError(`Failed to set cookie: ${error.message}`);
    }
  },

  remove(name: string, options?: Pick<CookieOptions, 'path' | 'domain'>): void {
    validateName(name);

    try {
      const mergedOptions = mergeOptions(options);
      Cookies.remove(name, mergedOptions);
    } catch (error) {
      throw new CookieError(`Failed to remove cookie: ${error.message}`);
    }
  },

  exists(name: string): boolean {
    validateName(name);
    return Cookies.get(name) !== undefined;
  },
};
