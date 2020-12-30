import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    children: [
      {
        path: "/logging",
        name: "Logging",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/user/Logging.vue")
      },
      {
        path: "/api/logging",
        name: "ApiLogging",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/user/ApiLogging.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
