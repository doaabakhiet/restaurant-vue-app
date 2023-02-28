<template>
      <!-- Button trigger modal -->
      <div style="display:none">
      {{dtarget="#m"+CatData.id}}
      {{idmodal="m"+CatData.id}}
      </div>
<button type="button" class="btn text-success" data-bs-toggle="modal" :data-bs-target=dtarget>
  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
</button>

<!-- Modal -->
<div class="modal fade" :id=idmodal data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel"><font-awesome-icon icon="fa-solid fa-pen-to-square" />&nbsp;Edit Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reloadPage()"></button>
      </div>
      <div class="modal-body">
        <form class="mx-1 mx-md-4" @click.prevent>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label textColor" for="form3Example1c">Category Name</label>
                      <input type="text" v-model.trim="state.cname" id="form3Example1c" class="form-control textColor" />
                      <span class="error-feedback textColor" v-if="v$.cname.$error">{{v$.cname.$errors[0].$message}}</span>
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
    props:['CatData'],
    data() {
        return {
            dtarget:"",
            idmodal:"",
        }
    },
    setup(){
    const state=reactive({
      cname:"",
    });
    const rules=computed(()=>{
      return{
        cname:{required,minLength:minLength(5)},
      }
    });
    const v$=useVuelidate(rules,state);
    return {state,v$}
    },
    mounted(){
        this.Changedata();
        console.log(this.CatData)
    },
    methods:{
        Changedata(){
        this.state.cname=this.CatData.name;
        },
        async Edit(){
            this.v$.$validate();
            if(!this.v$.$error){
                let result= await axios.put(`http://localhost:3000/categories/${this.CatData.id}`,
                {
                    name: this.state.cname,
                    userid: this.CatData.userid,
                    id: this.CatData.id,
                    locationId: this.CatData.locationId
                });
                if(result.status==200){
                   
                    alert("Category Updated successfully");
                }
            }
        },
        reloadPage(){
            setTimeout(() => {
                window.location.reload(); //refresh the page
            },1000);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
