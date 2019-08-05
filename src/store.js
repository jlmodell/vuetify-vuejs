import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";
import axios from "axios";
import * as types from "./mutation-types";

const currentMonth = new Date().getMonth();
const year = new Date().getFullYear();

Vue.use(Vuex);
Vue.use(VueCookies);

const state = {
  msg: "",
  token: localStorage.getItem("auth_token") || null,
  api: {
    url: "https://busse-nestjs-api.herokuapp.com/"
  },
  start:
    localStorage.getItem("start") ||
    new Date(year, currentMonth - 2, 1).toISOString().substring(0, 10),
  end:
    localStorage.getItem("end") ||
    new Date(year, currentMonth - 1, 0).toISOString().substring(0, 10),
  customers: []
};

const getters = {
  drawer(state) {
    return state.drawer;
  },
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
  },
  customers(state) {
    return state.customers;
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
  },
  [types.DISTINCT_CUSTOMERS](state, payload) {
    state.customers = payload;
  }
};

const actions = {
  async login({ commit }, payload) {
    try {
      const res = await axios.post(
        `${this.state.api.url}users/login/`,
        payload
      );

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
  },
  async customers({ commit }) {
    try {
      const res = await axios.get(
        `${this.state.api.url}sales/distinct/cust/${this.state.start}/${
          this.state.end
        }`,
        {
          headers: { Authorization: authStr }
        }
      );

      if (res.status === 200) {
        commit(types.DISTINCT_CUSTOMERS, res.data[0].customer);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const authStr = `Bearer ${state.token}`;

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
