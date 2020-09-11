import gsap from "gsap";

const state = {
    isNavOpen: false,
    loading: false,
    error: null,
    overlayLoading: true,
    isCreatorActive: false
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
    },
    setCreatorActive(state: { isCreatorActive: boolean }, payload: boolean) {
      state.isCreatorActive = payload;
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
    },
    isCreatorActive(state: { isCreatorActive: boolean }) {
      return state.isCreatorActive;
    }
  };

  const actions = {
    closeCreator({ state, commit }: any) {
      if (state.isCreatorActive) {
        commit('setCreatorActive' , false);
  
        const tl = gsap.timeline();
        tl.to(".creator__container", {
          autoAlpha: 0,
          y: -50
        });
  
        tl.set(".creator__container", {
          display: "none"
        });
        tl.to(".product__background--container", {
          top: "auto",
          left: "auto",
          scale: 1,
          ease: "power4"
        });
  
        tl.set(".product__background--container", {
          position: "static"
        });
      }
    }
  
  }
  
  export default {
    state,
    mutations,
    getters,
    actions
  };