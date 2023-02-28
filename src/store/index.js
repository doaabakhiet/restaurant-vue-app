import { createStore } from "vuex";
import router  from "@/router";
import axios from "axios";
const state={
  IsuserLoggedIn:"",
  LoggedinUserId:"",
  NumOfCategories:"",
  ListOfCategories:[],
  ListOfLocations:[],
  ListOfItems:[],
};
const getters={};
const mutations={
  redirectTo(state,payload){
    router.push({name:payload});
  },
  IsLoggedInUser(state){
    let user=localStorage.getItem("user-info");
    if(user){
      state.IsuserLoggedIn=true;
      state.LoggedinUserId=JSON.parse(user).id;

    }else{
      state.IsuserLoggedIn=false;
    }
  },
  async displayCategories(state,payload){
    let result = await axios.get(`http://localhost:3000/categories?userid=${payload.userid}&&locationId=${payload.locationId}`);
            if (result.status == 200) {
              state.ListOfCategories=result.data;
              state.NumOfCategories=result.data.length;
            }
  },
  async CanUserAccessLocation(state,payload){
    let result = await axios.get(`http://localhost:3000/locations?userid=${payload.userid}&id=${payload.locationId}`);
    if (result.status == 200) {
      state.ListOfLocations=result.data;
      if(state.ListOfLocations.length !=1){
        this.commit("redirectTo",payload.redirectToPage);
      }
    }
  },
  async CanUserAccessItem(state,payload){
    let result = await axios.get(`http://localhost:3000/items?userid=${payload.userid}&locId=${payload.locationId}&id=${payload.itemId}`);
    if (result.status == 200) {
      state.ListOfItems=result.data;
      if(state.ListOfItems.length <1){
        
        this.commit("redirectTo",payload.redirectToPage);
      }
    }
  },
  async DisplayItems(state,payload){
      let result = await axios.get(`http://localhost:3000/items?userid=${payload.userid}&locId=${payload.locationId}&id=${payload.itemId}`);
      if (result.status == 200) {
        state.ListOfItems=result.data;
   
        console.log(state.ListOfItems)      }
  },

};
const actions={
  redirectTo({commit},payload){
    commit("redirectTo",payload.val);
  }
};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
