import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UserList from "../views/UserList.vue";
import GamesShow from "../views/GamesShow.vue";
import GamesShowTest from "../views/GamesShowTest.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/signup", name: "Signup", component: Signup }, 
  { path: "/login", name: "Login", component: Login },
  { path: "/logout", name: "Logout", component: Logout },
  //these go after everything that doesn't need a wildcard
  { path: "/userlist/:id", name: "UserList", component: UserList },
  { path: "/games/test/:id", name: "GamesShowTest", component: GamesShowTest },
  { path: "/games/:id", name: "GamesShow", component: GamesShow },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
