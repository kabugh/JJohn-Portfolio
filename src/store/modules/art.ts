import Category from "@/utils/typings/Category";
import ProductModel from '@/utils/typings/ProductModel';
/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.VUE_APP_space,
  accessToken: process.env.VUE_APP_accessToken
});

const state = {
  categories: [],
  currentCategory: {},
  currentWork: {}
};

const mutations = {
  setCategories(state: { categories: Category[] }, payload: any) {
    state.categories = payload;
  },
  setCurrentCategory(state: { currentCategory: Category }, payload: any) {
    state.currentCategory = payload;
  },
  setCurrentWork(state: { currentWork: ProductModel }, payload: any) {
    state.currentWork = payload;
  }
};

const getters = {
  categories(state: { categories: Category[] }) {
    return state.categories;
  },
  currentCategory(state: { currentCategory: Category }) {
    return state.currentCategory;
  },
  currentWork(state: { currentWork: ProductModel }) {
    return state.currentWork;
  }
};

const actions = {
  fetchCategories({ commit, state }: any) {
    if (state.categories.length === 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          /* eslint-disable @typescript-eslint/camelcase */
          content_type: "category",
          include: 1
        })
        .then((entries: { items: any[] }) => {
          const categories = entries.items.map((item: any) => item.fields);
          commit("setCategories", categories);
          commit("setLoading", false);
        });
    } else {
      commit("setCategories", state.categories);
    }
  },
  fetchCategory({ commit, state }: any, slug: string) {
    console.log(state.currentCategory.slug !== slug)
    if (state.categories.length === 0 || state.currentCategory.slug !== slug) {
      commit("setLoading", true);
      commit("clearError");
      return client
        .getEntries({
          order: "sys.updatedAt",
          content_type: "category",
          "fields.slug[match]": slug,
          include: 2
        })
        .then((entries: { items: any[] }) => {
          const category = {
            ...entries.items[0].fields,
            works: entries.items[0].fields.works.map((work: any) => work.fields)
          };
          commit("setCurrentCategory", category);
          commit("setLoading", false);
        });
    } else {
      const foundCategory = state.categories.find(
        (category: Category) => category.slug === slug
      );
      commit("setCurrentCategory", foundCategory);
    }
  },
  fetchWork({ commit, state }: any, payload: { category: string, catalogId: number }) {
    if (state.categories.length === 0 || state.currentWork.category !== payload.category && state.currentWork.catalogId !== payload.catalogId) {
      commit("setLoading", true);
      commit("clearError");
      return client
        .getEntries({
          order: "sys.updatedAt",
          content_type: "art",
          "fields.catalogId": payload.catalogId,
          include: 2
        })
        .then((entries: { items: any[] }) => {
          commit("setCurrentWork", entries.items[0].fields);
          commit("setLoading", false);
        });
    } else {
      const foundWork = state.currentCategory.works.find(
        (work: ProductModel) => work.catalogId === payload.catalogId
      );
      commit("setCurrentWork", foundWork);
    }
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
