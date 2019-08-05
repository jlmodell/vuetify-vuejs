import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false,
        requiresVisitor: false
      }
    },
    {
      path: "/sales",
      name: "sales",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Sales"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./components/Login"),
      meta: {
        requiresVisitor: true
      }
    }
  ]
});
