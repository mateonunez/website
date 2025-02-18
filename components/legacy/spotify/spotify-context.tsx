import React, { useCallback, useMemo, useContext, useReducer, type ReactNode, type JSX } from 'react';

interface SpotifyState {
  isLoading: boolean;
  prevRecentlyPlayed: boolean;
  nextRecentlyPlayed: boolean;
  recentlyTrackSelected?: SpotifyTrackItem;
}

interface SpotifyTrackItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  thumbnail: string;
  url: string;
  played_at: string;
  duration: number;
}

export const initialState: SpotifyState = {
  isLoading: false,
  prevRecentlyPlayed: false,
  nextRecentlyPlayed: false,
};

export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_RECENTLY_TRACK_SELECTED: 'SET_RECENTLY_TRACK_SELECTED',
} as const;

type ActionType = (typeof types)[keyof typeof types];

interface SpotifyAction {
  type: ActionType;
  payload: boolean | SpotifyTrackItem;
}

export const reducer = (state: SpotifyState, action: SpotifyAction): SpotifyState => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case types.SET_RECENTLY_TRACK_SELECTED:
      return {
        ...state,
        recentlyTrackSelected: action.payload as SpotifyTrackItem,
      };
    default:
      return state;
  }
};

interface SpotifyContextType extends SpotifyState {
  setLoading: (payload: boolean) => void;
  setRecentlyTrackSelected: (payload: SpotifyTrackItem) => void;
}

export const SpotifyContext = React.createContext<SpotifyContextType | undefined>(undefined);
SpotifyContext.displayName = 'SpotifyContext';

interface SpotifyProviderProps {
  children: ReactNode;
  [key: string]: unknown;
}

export const SpotifyProvider = ({ children, ...props }: SpotifyProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = useCallback((payload: boolean) => dispatch({ type: types.SET_LOADING, payload }), []);

  const setRecentlyTrackSelected = useCallback(
    (payload: SpotifyTrackItem) => dispatch({ type: types.SET_RECENTLY_TRACK_SELECTED, payload }),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      setLoading,
      setRecentlyTrackSelected,
    }),
    [state, setLoading, setRecentlyTrackSelected],
  );

  return (
    <SpotifyContext.Provider value={value} {...props}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = (): SpotifyContextType => {
  const context = useContext(SpotifyContext);

  if (context === undefined) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }

  return context;
};
