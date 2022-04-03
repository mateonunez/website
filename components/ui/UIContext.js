import React, { useCallback, useMemo, useContext, useReducer } from 'react';

export const initialState = {
  isLoading: false,
  // Sidebar

  showSidebar: false,
  // Modal

  showModal: false,
  modalView: '',
  // Navbar

  showNavbar: false,
  minimalNavbar: false,
  navbarView: '',

  // Terminal
  isTerminalCompleted: false,

  // BigBang
  bigBang: false,

  // Spotify
  listening: {}
};

export const types = {
  SET_LOADING: 'SET_LOADING',

  // Sidebar
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
  SET_SIDEBAR_VIEW: 'SET_SIDEBAR_VIEW',

  // Modal
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SET_MODAL_VIEW: 'SET_MODAL_VIEW',

  // Navbar
  OPEN_NAVBAR: 'OPEN_NAVBAR',
  CLOSE_NAVBAR: 'CLOSE_NAVBAR',
  SET_NAVBAR_VIEW: 'SET_NAVBAR_VIEW',

  // Terminal
  COMPLETE_TERMINAL: 'COMPLETE_TERMINAL',

  // BigBang
  SET_BIG_BANG: 'SET_BIG_BANG',

  SET_SPOTIFY_LISTENING: 'SET_SPOTIFY_LISTENING'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }

    // Sidebar
    case types.OPEN_SIDEBAR: {
      return {
        ...state,
        showSidebar: true
      };
    }
    case types.CLOSE_SIDEBAR: {
      return {
        ...state,
        showSidebar: false
      };
    }
    case types.SET_SIDEBAR_VIEW: {
      return {
        ...state,
        sidebarView: action.payload
      };
    }

    // Modal
    case types.OPEN_MODAL: {
      return {
        ...state,
        showModal: true,
        showSidebar: false
      };
    }
    case types.CLOSE_MODAL: {
      return {
        ...state,
        showModal: false
      };
    }
    case types.SET_MODAL_VIEW: {
      return {
        ...state,
        modalView: action.payload
      };
    }

    // Navbar
    case types.OPEN_NAVBAR: {
      return {
        ...state,
        showNavbar: true
      };
    }
    case types.CLOSE_NAVBAR: {
      return {
        ...state,
        showNavbar: false
      };
    }
    case types.SET_NAVBAR_VIEW: {
      return {
        ...state,
        navbarView: action.payload
      };
    }

    // Terminal
    case types.COMPLETE_TERMINAL: {
      return {
        ...state,
        isTerminalCompleted: true
      };
    }

    // BigBang
    case types.SET_BIG_BANG: {
      return {
        ...state,
        bigBang: action.payload
      };
    }

    // Spotify
    case types.SET_SPOTIFY_LISTENING: {
      return {
        ...state,
        listening: action.payload
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const UIContext = React.createContext(initialState);
UIContext.displayName = 'UIContext';

export const UIProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Loading
  const setLoading = useCallback(
    payload => dispatch({ type: types.SET_LOADING, payload }),
    [dispatch]
  );

  // Sidebar
  const openSidebar = useCallback(() => dispatch({ type: types.OPEN_SIDEBAR }), [dispatch]);
  const closeSidebar = useCallback(() => dispatch({ type: types.CLOSE_SIDEBAR }), [dispatch]);
  const setSidebarView = useCallback(
    payload => dispatch({ type: types.SET_SIDEBAR_VIEW, payload }),
    [dispatch]
  );

  // Modal
  const openModal = useCallback(() => dispatch({ type: types.OPEN_MODAL }), [dispatch]);
  const closeModal = useCallback(() => dispatch({ type: types.CLOSE_MODAL }), [dispatch]);
  const setModalView = useCallback(
    payload => dispatch({ type: types.SET_MODAL_VIEW, payload }),
    [dispatch]
  );

  // Navbar
  const openNavbar = useCallback(() => dispatch({ type: types.OPEN_NAVBAR }), [dispatch]);
  const closeNavbar = useCallback(() => dispatch({ type: types.CLOSE_NAVBAR }), [dispatch]);
  const setNavbarView = useCallback(
    payload => dispatch({ type: types.SET_NAVBAR_VIEW, payload }),
    [dispatch]
  );

  // Terminal
  const completeTerminal = useCallback(
    () => dispatch({ type: types.COMPLETE_TERMINAL }),
    [dispatch]
  );

  // BigBang
  const setBigBang = useCallback(
    payload => dispatch({ type: types.SET_BIG_BANG, payload }),
    [dispatch]
  );

  // Spotify
  const setSpotifyListening = useCallback(
    payload => dispatch({ type: types.SET_SPOTIFY_LISTENING, payload }),
    [dispatch]
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
      setSpotifyListening
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};
