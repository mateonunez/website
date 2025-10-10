import { useOptimistic } from 'react';

export function useOptimisticUpdate<T>(initialState: T): [T, (action: T | ((state: T) => T)) => void] {
  return useOptimistic(initialState, (_state, newState: T | ((state: T) => T)) => {
    if (typeof newState === 'function') {
      return (newState as (state: T) => T)(_state);
    }
    return newState;
  });
}
