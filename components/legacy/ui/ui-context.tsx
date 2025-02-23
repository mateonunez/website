'use client';

import type { NormalizedCurrentlyPlaying } from '@/types/spotify';
import type { NormalizedGitHubUser } from '@/types/github';
import React, { useCallback, useMemo, useContext, useReducer, type ReactNode, type JSX } from 'react';

interface UIState {
  isLoading: boolean;
  showSidebar: boolean;
  showModal: boolean;
  modalView: string;
  showNavbar: boolean;
  minimalNavbar: boolean;
  navbarView: string;
  sidebarView?: string;
  isTerminalCompleted: boolean;
  bigBang: boolean;
  listening: NormalizedCurrentlyPlaying | null;
  githubProfile: { profile: NormalizedGitHubUser } | null;
}

export const initialState: UIState = {
  isLoading: false,
  showSidebar: false,
  showModal: false,
  modalView: '',
  showNavbar: false,
  minimalNavbar: false,
  navbarView: '',
  isTerminalCompleted: false,
  bigBang: false,
  listening: {},
  githubProfile: null,
};

export const types = {
  SET_LOADING: 'SET_LOADING',
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  SET_SIDEBAR_VIEW: 'SET_SIDEBAR_VIEW',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SET_MODAL_VIEW: 'SET_MODAL_VIEW',
  OPEN_NAVBAR: 'OPEN_NAVBAR',
  CLOSE_NAVBAR: 'CLOSE_NAVBAR',
  SET_NAVBAR_VIEW: 'SET_NAVBAR_VIEW',
  COMPLETE_TERMINAL: 'COMPLETE_TERMINAL',
  SET_BIG_BANG: 'SET_BIG_BANG',
  SET_SPOTIFY_LISTENING: 'SET_SPOTIFY_LISTENING',
  SET_GITHUB_PROFILE: 'SET_GITHUB_PROFILE',
} as const;

type ActionType = (typeof types)[keyof typeof types];

interface UIAction {
  type: ActionType;
  payload?: unknown;
}

export const reducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };

    case types.OPEN_SIDEBAR:
      return {
        ...state,
        showSidebar: true,
      };
    case types.CLOSE_SIDEBAR:
      return {
        ...state,
        showSidebar: false,
      };
    case types.SET_SIDEBAR_VIEW:
      return {
        ...state,
        sidebarView: action.payload as string,
      };

    case types.OPEN_MODAL:
      return {
        ...state,
        showModal: true,
        showSidebar: false,
      };
    case types.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case types.SET_MODAL_VIEW:
      return {
        ...state,
        modalView: action.payload as string,
      };

    case types.OPEN_NAVBAR:
      return {
        ...state,
        showNavbar: true,
      };
    case types.CLOSE_NAVBAR:
      return {
        ...state,
        showNavbar: false,
      };
    case types.SET_NAVBAR_VIEW:
      return {
        ...state,
        navbarView: action.payload as string,
      };

    case types.COMPLETE_TERMINAL:
      return {
        ...state,
        isTerminalCompleted: true,
      };

    case types.SET_BIG_BANG:
      return {
        ...state,
        bigBang: action.payload as boolean,
      };

    case types.SET_SPOTIFY_LISTENING:
      return {
        ...state,
        listening: action.payload as NormalizedCurrentlyPlaying,
      };

    case types.SET_GITHUB_PROFILE:
      return {
        ...state,
        githubProfile: action.payload as { profile: NormalizedGitHubUser },
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

interface UIContextType extends UIState {
  setLoading: (payload: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setSidebarView: (payload: string) => void;
  openModal: () => void;
  closeModal: () => void;
  setModalView: (payload: string) => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  setNavbarView: (payload: string) => void;
  completeTerminal: () => void;
  setBigBang: (payload: boolean) => void;
  setSpotifyListening: (payload: NormalizedCurrentlyPlaying) => void;
  setGithubProfile: (payload: NormalizedGitHubUser) => void;
}

export const UIContext = React.createContext<UIContextType | undefined>(undefined);
UIContext.displayName = 'UIContext';

interface UIProviderProps {
  children: ReactNode;
  [key: string]: unknown;
}

export const UIProvider = ({ children, ...props }: UIProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = useCallback((payload: boolean) => dispatch({ type: types.SET_LOADING, payload }), []);

  const openSidebar = useCallback(() => dispatch({ type: types.OPEN_SIDEBAR }), []);

  const closeSidebar = useCallback(() => dispatch({ type: types.CLOSE_SIDEBAR }), []);

  const setSidebarView = useCallback((payload: string) => dispatch({ type: types.SET_SIDEBAR_VIEW, payload }), []);

  const openModal = useCallback(() => dispatch({ type: types.OPEN_MODAL }), []);

  const closeModal = useCallback(() => dispatch({ type: types.CLOSE_MODAL }), []);

  const setModalView = useCallback((payload: string) => dispatch({ type: types.SET_MODAL_VIEW, payload }), []);

  const openNavbar = useCallback(() => dispatch({ type: types.OPEN_NAVBAR }), []);

  const closeNavbar = useCallback(() => dispatch({ type: types.CLOSE_NAVBAR }), []);

  const setNavbarView = useCallback((payload: string) => dispatch({ type: types.SET_NAVBAR_VIEW, payload }), []);

  const completeTerminal = useCallback(() => dispatch({ type: types.COMPLETE_TERMINAL }), []);

  const setBigBang = useCallback((payload: boolean) => dispatch({ type: types.SET_BIG_BANG, payload }), []);

  const setSpotifyListening = useCallback(
    (payload: NormalizedCurrentlyPlaying) => dispatch({ type: types.SET_SPOTIFY_LISTENING, payload }),
    [],
  );

  const setGithubProfile = useCallback(
    (payload: NormalizedGitHubUser) => dispatch({ type: types.SET_GITHUB_PROFILE, payload }),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      setLoading,
      openSidebar,
      closeSidebar,
      setSidebarView,
      openModal,
      closeModal,
      setModalView,
      openNavbar,
      closeNavbar,
      setNavbarView,
      completeTerminal,
      setBigBang,
      setSpotifyListening,
      setGithubProfile,
    }),
    [
      state,
      setLoading,
      openSidebar,
      closeSidebar,
      setSidebarView,
      openModal,
      closeModal,
      setModalView,
      openNavbar,
      closeNavbar,
      setNavbarView,
      completeTerminal,
      setBigBang,
      setSpotifyListening,
      setGithubProfile,
    ],
  );

  return (
    <UIContext.Provider value={value} {...props}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};
