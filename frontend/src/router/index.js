import { createWebHistory, createRouter } from "vue-router";
// import store from "../store";

const routes = [
  {
    path: "/",
    alias: "/",
    name: "Saler",
    component: () => import("../views/Saler"),
  },
  {
    path: "/products/findAll/:id",
    name: "hihi",
    component: () => import("../views/ProductInfo"),
  },
  {
    path: "/salers/:id",
    name: "EditSaler",
    component: () => import("../views/SalerEdit"),
  },
  {
    path: "/quan-ao",
    name: "Clothes",
    component: () => import("../views/Clothes"),
  },
  {
    path: "/giay-dep",
    name: "Shoes",
    component: () => import("../views/Shoes"),
  },
  {
    path: "/dong-ho-thoi-trang",
    name: "Watch",
    component: () => import("../views/Watch"),
  },
  {
    path: "/add",
    name: "SalerAdd",
    component: () => import("../views/SalerAdd"),
  },
  {
    path: "/editSaler/:id",
    name: "SalerEdit",
    component: () => import("../views/SalerEdit"),
  },
  {
    path: "/editProduct/:id",
    name: "ProductEdit",
    component: () => import("../views/ProductEdit"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/UserRegister.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/register", "/"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = store.getters.userLoggedIn;

//   if (authRequired && !loggedIn) {
//       next("/login");
//   } else {
//       next();
//   }
// });

router.beforeEach((to, from, next) => {
  next();
});

export default router;