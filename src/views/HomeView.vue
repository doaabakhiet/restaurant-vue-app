<template>
  <div class="home">
     <HeaderApp/>
     <section class="pt-3">
        <div class="container">
          <h1 class="textColor">Hi, {{name}}</h1>
        </div>
      </section>
        <LocationModal/>
        <ShowLocation/>
        <FooterApp/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions } from 'vuex';
import HeaderApp from "@/components/HeaderApp.vue";
import LocationModal from "@/components/Location/LocationModal.vue"
import ShowLocation from '@/components/Location/ShowLocation.vue';
import FooterApp from '@/components/FooterApp.vue';
export default {
  name: "HomeView",
  data(){
    return{
        name:""
    }
  },
  components: {
    //HelloWorld,
    HeaderApp,
    LocationModal,
    ShowLocation,
    FooterApp
},
    mounted(){
    let userData=localStorage.getItem("user-info");
    if(userData){
      this.redirectTo({val:'home'});
      this.name=JSON.parse(userData).name;
    }else{
      this.redirectTo({val:'SignupView'});
    }
  },
  methods:{
    ...mapActions(['redirectTo']),
  }
};
</script>
