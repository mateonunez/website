import { after } from 'next/server';

export function logAnalyticsAfterResponse(event: string, data: Record<string, unknown>) {
  after(async () => {
    try {
      console.log(`[Analytics] ${event}`, data);
    } catch (error) {
      console.error('Analytics logging failed:', error);
    }
  });
}

export function trackApiUsage(endpoint: string, duration: number, statusCode: number) {
  after(async () => {
    console.log(`[API Metrics] ${endpoint}`, {
      duration: `${duration}ms`,
      status: statusCode,
      timestamp: new Date().toISOString(),
    });
  });
}
