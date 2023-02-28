<template>
  <div class="signin">
  <section class="vh-50" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                <!-- <form class="mx-1 mx-md-4" > -->

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.email.$error}">
                      <span class="error-feedback text-danger" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</span>
                      <input type="email" v-model="email" id="form3Example3c" class="form-control" />
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.password.$error}">
                      <span class="error-feedback text-danger" v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</span>
                      <input type="password" v-model="password" id="form3Example4c" class="form-control" />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>


                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    
                    <button type="button" class="btn btn-danger btn-lg" @click="SignIn">Log In</button>&nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-warning btn-lg" @click="redirectTo({val:'SignupView'})">Register</button>
                  </div>

                <!-- </form> -->

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  </div>
</template>

<script>
import { mapActions } from 'vuex';
import useValidate from '@vuelidate/core';
import {required,email,minLength }from '@vuelidate/validators';
import axios from 'axios';
// import { reactive,computed } from 'vue';
export default {
  name: "SignIn",
  //composition api
    // setUp(){
    //   //data
    //   const state=reactive({
    //     email:"",
    //     password:""
    //   });
    //   //validations
    //   const rules=computed(()=>{
    //     return{
    //       email:{required,email},
    //       password:{required}
    //     };
    //   });
    //   const v$=useValidate(rules,state);
    //   return{
    //     state,
    //     v$
    //   };
    validations(){
    return{
      password:{required,minLength:minLength(10)},
      email:{required,email}
    };
  },
  data(){
    return{
       v$: useValidate(),
       email:"",
       password:""
    };
  }
  ,methods:{
    ...mapActions(['redirectTo']),
    // gotosignup(){
    //     this.$router.push({name: "SignupView"});
    // }
     async SignIn(){
      this.v$.$validate();
      if(!this.v$.$error){
        console.log("asd");
        let userLink="http://localhost:3000/users?email="+this.email+"&password="+this.password;
        let result=await axios.get(userLink);
        console.log(result);
        if(result.status==200 && result.data.length>0){ 
            localStorage.setItem("user-info",JSON.stringify(result.data[0]));
            this.redirectTo({val:'home'})
        }else{
          alert("Not Found");
        }
      }else{
        console.log("zxc");
      }
     }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-group-error input{
    color:red;
    border-color: red;
}
</style>
