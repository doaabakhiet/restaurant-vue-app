<template>
  <div class="signup">
  <section class="vh-50" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">
                  <h6 class="text-warning">{{ErrorMessage}}</h6>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    
                    <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.name.$error}">
                      <span class="error-feedback text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
                      <input type="text" v-model="name" id="form3Example1c" class="form-control" />
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

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
                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" @click="redirectTo({val:'SigninView'})" class="btn btn-primary btn-lg">Login</button>&nbsp;&nbsp;&nbsp;
                    <button type="button" @click="SignUp()" class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

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
import axios from "axios";
export default {
  name: "SignUp",
  data(){
    return{
        v$: useValidate(),
        name:' ',
        password: ' ',
        email: ' ',
        ListOfUsers:[],
        ErrorMessage:""
    }
  },
  validations(){
    return{
      name:{required, minLength :minLength (5)},
      password:{required ,minLength:minLength(10)},
      email:{required,email}
    };
  },
  async mounted(){
    let userData=localStorage.getItem("user-info");
    if(userData){
      this.redirectTo({val:'home'});
    }
    let result = await axios.get(`http://localhost:3000/users`);
        if (result.status == 200) {
          this.ListOfUsers=result.data;
        }
  },
  methods:{
     ...mapActions(['redirectTo']),
    async SignUp(){
      this.v$.$validate();
      if(!this.v$.$error){
        let FilterUserName=this.ListOfUsers.filter(
          (v)=>v.email.toLocaleLowerCase() ==this.email.toLocaleLowerCase()
        );
        if(FilterUserName.length>0){
          console.log("s");
          this.ErrorMessage="This User Added Before ,Try Again...!"
        }else{
          this.ErrorMessage="";
        let result= await axios.post("http://localhost:3000/users",
        {
          name: this.name,
          password:this.password,
          email: this.email
        }
        );
        this.redirectTo({val:'home'});
        if(result.status==201){
          console.log("success");
          //Add data to local storage
          localStorage.setItem("user-info",JSON.stringify(result.data));
          console.log(result);
          console.log(JSON.stringify(result.data));

        }
        else{
          console.log("Failed")
        }
      }
      }else{
        console.log("failed");
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
