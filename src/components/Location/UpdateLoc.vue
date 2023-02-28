<template>
      <!-- Button trigger modal -->
      <div style="display:none">
      {{dtarget="#m"+locData.id }}
      {{idmodal="m"+locData.id}}
      </div>
<button type="button" class="btn btn-light text-success" data-bs-toggle="modal" :data-bs-target=dtarget>
  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
</button>

<!-- Modal -->
<div class="modal fade" :id=idmodal data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title textColor" id="staticBackdropLabel"><font-awesome-icon icon="fa-solid fa-pen-to-square" />&nbsp;Edit Location</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reloadPage()"></button>
      </div>
      <div class="modal-body">
        <form class="mx-1 mx-md-4" @click.prevent>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label textColor" for="form3Example1c">Restaurant Name</label>
                      <input type="text" v-model.trim="state.lname" id="form3Example1c" class="form-control" />
                      <span class="error-feedback text-danger" v-if="v$.lname.$error">{{v$.lname.$errors[0].$message}}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label textColor" for="form3Example3c">Phone Number</label>
                      <input type="text" v-model.trim="state.lphone" id="form3Example3c" class="form-control" />
                      <span class="error-feedback text-danger" v-if="v$.lphone.$error">{{v$.lphone.$errors[0].$message}}</span>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0"> 
                      <label class="form-label textColor" for="form3Example4c">Address</label>
                      <input type="text" v-model.trim="state.laddress" id="form3Example4c" class="form-control" />
                      <span class="error-feedback text-danger" v-if="v$.laddress.$error">{{v$.laddress.$errors[0].$message}}</span>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button"  @click="Edit" class="btn btnColor btn-lg"><font-awesome-icon icon="fa-solid fa-pen-to-square" />&nbsp;Edit</button>
                  </div>

                </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btnAddItem" data-bs-dismiss="modal" @click="reloadPage()">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required,minLength } from '@vuelidate/validators';
import {reactive,computed} from "vue";
import axios from "axios";
export default {
  name: "UpdateLoc",
    props:{locData:Array},
    data() {
        return {
            dtarget:"",
            idmodal:"",
        }
    },
    setup(){
    const state=reactive({
      lname:"",
      lphone:"",
      laddress:""
    });
    const rules=computed(()=>{
      return{
        lname:{required,minLength:minLength(10)},
        lphone:{required,minLength:minLength(10)},
        laddress:{required,minLength:minLength(10)}
      }
    });
    const v$=useVuelidate(rules,state);
    return {state,v$}
    },
    mounted(){
        this.Changedata();

    },
    methods:{
        Changedata(){
        this.state.lname=this.locData.name;
        this.state.lphone=this.locData.phone;
        this.state.laddress=this.locData.address;
        },
        async Edit(){
            this.v$.$validate();
            if(!this.v$.$error){
                let result= await axios.put(`http://localhost:3000/locations/${this.locData.id}`,
                {
                name: this.state.lname,
                phone:this.state.lphone,
                address: this.state.laddress,
                userid:this.locData.userid
                });
                if(result.status==200){
                   
                    alert("Location Updated successfully");
                }
            }
        },
        reloadPage(){
            setTimeout(() => {
                window.location.reload(); //refresh the page
            },500);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
