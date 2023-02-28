<template>
    <div class="ProfileApp">

        <section class="vh-50" style="background-color: #eee;">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style="border-radius: 25px;">
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update Your Data</p>
                                        <h2 class="text-success">{{successMsg}}</h2>
                                        <form class="mx-1 mx-md-4">

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <span class="error-feedback text-danger" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
                                                    <input type="text" v-model="name" id="form3Example1c"
                                                        class="form-control" />
                                                    <label class="form-label" for="form3Example1c">Your Name</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <span class="error-feedback text-danger"
                                                        v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                                                    <input type="email" v-model="email" id="form3Example3c"
                                                        class="form-control" />
                                                    <label class="form-label" for="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <span class="error-feedback text-danger"
                                                        v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
                                                   <label class="form-label" for="form3Example4c">Password</label>
                                                   <input type="password" v-model="password" id="form3Example4c"
                                                        class="form-control" />
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" @click="Update()"
                                                    class="btn btn-primary btn-lg">Update</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div
                                        class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

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
import useValidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import axios from 'axios';
export default {
    name: "ProfileApp",
    props: {
        msg: String,
    },
    data() {
        return {
            v$: useValidate(),
            name: '',
            password: '',
            email: '',
            id:'',
            successMsg:''
        }
    },
    validations() {
        return {
            name: { required, minLength: minLength(5) },
            password: { required },
            email: { required, email }
        };
    },
    mounted(){
        let UserData=localStorage.getItem("user-info");
        if(UserData){
            this.name=JSON.parse(UserData).name;
            this.password=JSON.parse(UserData).password;
            this.email=JSON.parse(UserData).email;
            this.id=JSON.parse(UserData).id;
        }
    },
    methods: {
        async Update() {
            this.v$.$validate();
            if (!this.v$.$error) {
                let result=await axios.put(`http://localhost:3000/users/${this.id}`,{
                   name:this.name ,
                   password:this.password,
                   email:this.email
                });
                if(result.status==200){
                    localStorage.setItem("user-info",JSON.stringify(result.data));
                    console.log(result);
                    console.log(JSON.stringify(result.data));
                    this.successMsg="Data Updated Successfully";
                }else{
                    console.log("Failedyyy");
                }

            }
            else {
                console.log("Failed")
            }


        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
