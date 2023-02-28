<template>
  <div class="LocationModal">
    <section class="pt-3">
        <div class="container">
          <!-- Button trigger modal -->
          <button type="button" class="btn btnColor" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add New Location
          </button>
        </div>
    </section>


     
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title textColor" id="exampleModalLabel"><font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add New Location</h5>
        <button type="button" class="close btnAddItem" data-bs-dismiss="modal" aria-label="Close"  @click="reloadPage()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <form class="mx-1 mx-md-4" @click.prevent>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label textColor" for="form3Example1c">Restaurant Name</label>
                      <input type="text" v-model.trim="state.name" id="form3Example1c" class="form-control" />
                      <span class="error-feedback text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label textColor" for="form3Example3c">Phone Number</label>
                      <input type="text" v-model.trim="state.phone" id="form3Example3c" class="form-control" />
                      <span class="error-feedback text-danger" v-if="v$.phone.$error">{{v$.phone.$errors[0].$message}}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0"> 
                      <label class="form-label textColor" for="form3Example4c">Address</label>
                      <input type="text" v-model.trim="state.address" id="form3Example4c" class="form-control" />
                      <span class="error-feedback text-danger" v-if="v$.address.$error">{{v$.address.$errors[0].$message}}</span>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button"  @click="Add" class="btn btnColor btn-lg"><font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add</button>
                  </div>

                </form>




      </div>
      <div class="modal-footer">
        <button type="button" class="btn btnAddItem" data-bs-dismiss="modal" @click="reloadPage()">Close</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required,minLength } from '@vuelidate/validators';
import {reactive,computed} from "vue";
import { mapActions } from 'vuex';
import axios from "axios";
export default {
  name: "LocationModal",
  setup(){
    const state=reactive({
      name:"",
      phone:"",
      address:""
    });
    const rules=computed(()=>{
      return{
        name:{required,minLength:minLength(10)},
        phone:{required,minLength:minLength(10)},
        address:{required,minLength:minLength(10)}
      }
    });
    const v$=useVuelidate(rules,state);
    return {state,v$}
  },
  data(){
    return{
      userid:"",
    }
  },
  mounted(){
        let userData=localStorage.getItem("user-info");
        if(userData){
          this.redirectTo({val:'home'});
          this.userid=JSON.parse(userData).id;
        }
  },
  methods:{
    ...mapActions(['redirectTo']),
    async Add(){
      this.v$.$validate();
      if(!this.v$.$error){
        let result= await axios.post("http://localhost:3000/locations",
            {
              name: this.state.name,
              phone:this.state.phone,
              address: this.state.address,
              userid:this.userid
            });
        if(result.status==201){
          console.log("success");
          alert("Location Added successfully");

          setTimeout(() => {
            this.state.name="";
            this.state.phone="";
            this.state.address="";
            this.v$.name.$errors[0].$message="";
            this.v$.phone.$errors[0].$message="";
            this.v$.address.$errors[0].$message="";
            
          }, 2000);
        }
        else{
          alert("Failed")
        }
      }else{
          console.log("Failed")
      }
    },
    reloadPage(){
      setTimeout(() => {
        window.location.reload(); //refresh the page
      },2000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btnColor{background-color: #9c3e5a;color: #E3F1D5;}
.btnColor:hover{background-color: #862844;color: #E3F1D5;}
</style>
