import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import SigninView from "../views/SigninView.vue";
import ProfileView from "../views/ProfileView.vue";
import DeleteLocation from "../components/Location/DeleteLocation.vue";
import MenuPage from "../components/Menu/MenuPage.vue";
import ErrorPage from "../views/ErrorPage.vue";
import AddItem from "../components/Menu/item/AddItem.vue";
import UpdateItem from "../components/Menu/item/UpdateItem.vue";
import ItemPage from "../components/Menu/item/ItemPage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "SignupView",
    component: SignupView,
  },
  {
    path: "/signin",
    name: "SigninView",
    component: SigninView,
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
  },
  {
    path: "/DeleteLocation/:LocationId",
    name: "DeleteLocation",
    component: DeleteLocation,
  },
  {
    path: "/Menu/AddItem/:LocationId",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/Menu/location/:locationId",
    name: "MenuPage",
    component: MenuPage,
  },
  {
  path: "/Menu/catId/:catId/location/:locationId",
  name: "ItemPage",
  component: ItemPage,
  },
  {
    path: "/Menu/update/item/:itemId/location/:locationId",
    name: "UpdateItem",
    component: UpdateItem,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to,from,next)=>{
  // console.log(to)
  if(to.name != undefined){
    document.title=`${process.env.VUE_APP_TITLE} - ${to.name}`;
  }else{
    document.title="OOOps! Unkown Page";
  }
  
  next();
});
export default router;
