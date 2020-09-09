const state = {
    isNavOpen: false,
    loading: false,
    error: null,
    overlayLoading: true
  };
  
  const mutations = {
    setNav(state: { isNavOpen: boolean }, payload: boolean) {
      state.isNavOpen = payload;
    },
    setLoading(state: { loading: boolean }, payload: boolean) {
      state.loading = payload;
    },
    setError(state: { error: string }, payload: string) {
      state.error = payload;
    },
    clearError(state: { error: null }) {
      state.error = null;
    },
    setOverlayLoading(state: { overlayLoading: boolean }, payload: boolean) {
      state.overlayLoading = payload;
    }
  };
  
  const getters = {
    isNavOpen(state: { isNavOpen: boolean }) {
      return state.isNavOpen;
    },
    loading(state: { loading: boolean }) {
      return state.loading;
    },
    error(state: { error: string }) {
      return state.error;
    },
    overlayLoading(state: { overlayLoading: boolean }) {
      return state.overlayLoading;
    }
  };
  
  export default {
    state,
    mutations,
    getters
  };