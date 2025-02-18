import React, { useCallback, useMemo, useContext, useReducer } from 'react';

export const initialState = {
  isLoading: false,

  prevRecentlyPlayed: false,
  nextRecentlyPlayed: false,
};

export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_RECENTLY_TRACK_SELECTED: 'SET_RECENTLY_TRACK_SELECTED',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.SET_RECENTLY_TRACK_SELECTED:
      return {
        ...state,
        recentlyTrackSelected: action.payload,
      };
    default:
      return state;
  }
};

export const SpotifyContext = React.createContext();
SpotifyContext.displayName = 'SpotifyContext';

export const SpotifyProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Loading
  const setLoading = useCallback((payload) => dispatch({ type: types.SET_LOADING, payload }), []);

  // Recently Track Selected
  const setRecentlyTrackSelected = useCallback(
    (payload) => dispatch({ type: types.SET_RECENTLY_TRACK_SELECTED, payload }),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      setLoading,
      setRecentlyTrackSelected,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return <SpotifyContext.Provider value={value} {...props} />;
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);

  if (!context) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }

  return context;
};
