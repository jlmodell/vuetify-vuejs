import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
import axios from "axios";
import * as types from "./mutation-types";

const url = `https://busse-nestjs-api.herokuapp.com/users/login/`;

Vue.use(Vuex);
Vue.use(VueCookies);

const state = {
  msg: "",
  token: localStorage.getItem("auth_token") || null,
  start: localStorage.getItem("start") || "",
  end: localStorage.getItem("end") || ""
};

const getters = {
  loggedIn(state) {
    return state.token !== null;
  },
  token(state) {
    return state.token;
  },
  start(state) {
    return state.start;
  },
  end(state) {
    return state.end;
  }
};

const mutations = {
  [types.LOGIN](state, payload) {
    (state.token = payload), (state.msg = "Valid Credentials.");
  },
  [types.INVALID_LOGIN](state, payload) {
    state.msg = `${payload.message}: Invalid Credentials.`;
  },
  [types.LOGOUT](state) {
    state.token = null;
  },
  [types.UPDATE_START_DATE](state, payload) {
    state.start = payload;
  },
  [types.UPDATE_END_DATE](state, payload) {
    state.end = payload;
  }
};

const actions = {
  async login({ commit }, payload) {
    try {
      const res = await axios.post(url, payload);

      if (res.status == 201) {
        localStorage.setItem("auth_token", res.data.token);
        commit(types.LOGIN, res.data.token);
      }
    } catch (err) {
      commit(types.INVALID_LOGIN, err);
    }
  },
  async logout({ commit }) {
    await localStorage.removeItem("auth_token");
    commit(types.LOGOUT);
  },
  async start({ commit }, payload) {
    try {
      await localStorage.setItem("start", payload);
      commit(types.UPDATE_START_DATE, payload);
    } catch (err) {
      console.log(err);
    }
  },
  async end({ commit }, payload) {
    try {
      await localStorage.setItem("end", payload);
      commit(types.UPDATE_END_DATE, payload);
    } catch (err) {
      console.log(err);
    }
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
