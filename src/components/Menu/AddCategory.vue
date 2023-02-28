<template>
  <div class="CategoryModal">
    <br><br>
    <!-- Button trigger modal -->
<button type="button" class="btn btnColor float-start" data-bs-toggle="modal" data-bs-target="#AddCategory">
  <font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add Category
</button>
<!--  
<router-link :to="{name:'AddItem',params:{LocationId:locationId}}">
    <button v-if="IsThereCategory" class="btn btnColor float-end"><font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add New Item</button>
</router-link>  -->
 <!-- <button type="button" v-if="IsThereCategory" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#AddCategory">
  Add New Item
</button> -->
<!-- Modal -->
<div class="modal fade" id="AddCategory" tabindex="-1"  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title textColor" id="AddCategoryLabel"><font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add New Category</h5>
        <button type="button" class="close btnAddItem" data-bs-dismiss="modal" aria-label="Close"  @click="reloadPage()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <form class="mx-1 mx-md-4" @click.prevent>

                  <!-- <div class="d-flex flex-row align-items-center mb-4"> -->
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <h6 class="text-warning">{{ErrorMessage}}</h6>
                      <label class="form-label textColor" for="form3Example1c">Your Name</label>
                      <span class="error-feedback text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
                      <input type="text" v-model="name" id="form3Example1c" class="form-control" />
                    </div>
                  <!-- </div> -->

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 pt-4">
                    <button type="button"  @click="AddNewCategory" class="btn btnColor btn-lg"><font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add</button>
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
import useValidate from '@vuelidate/core';
import {required,minLength }from '@vuelidate/validators';
import { mapActions,mapState} from 'vuex';
import axios from "axios";
export default {
  name: "AddCategory",
  // props:{IsThereCategory:Boolean},
  data(){
    return{
      userid:"",
      username:"",
      v$: useValidate(),
      name:' ',
      locationId:this.$route.params.locationId,
      ListOfCategories:[],
      ErrorMessage:"",
      a:this.LoggedinUserId
    }
  },
  validations(){
    return{
      name:{required, minLength :minLength (5)},
    };
  },
  mounted(){
        let userData=localStorage.getItem("user-info");
        if(userData){
          this.userid=JSON.parse(userData).userid;
          this.username=JSON.parse(userData).name;
        }else{
            this.redirectTo({val:'SignUp'});
        }
        this.ListOfUserCategories();
        console.log(this.IsThereCategory);
  },
  computed:{
      ...mapState(['LoggedinUserId']),
  },
  methods:{
   ...mapActions(['redirectTo']),
   async ListOfUserCategories(){
    let UserData=localStorage.getItem("user-info");
        if(UserData){
            this.a=JSON.parse(UserData).id;
            let result = await axios.get(`http://localhost:3000/categories?userid=${this.a}&locationId=${this.locationId}`);
            if (result.status == 200) {
              this.ListOfCategories=result.data;
            }
        }
   },
  async AddNewCategory(){
      this.v$.$validate();
      if(!this.v$.$error){
        let FilterCategoryName=this.ListOfCategories.filter(
          (v)=>v.name.toLocaleLowerCase() ==this.name.toLocaleLowerCase()
        );
        if(FilterCategoryName.length>0){
          console.log("s");
          this.ErrorMessage="This Category Added Before ,Try Again...!"
        }else{
          this.ErrorMessage="";
          console.log("f");
          let result= await axios.post("http://localhost:3000/categories",
              {
                name: this.name,
                userid:this.LoggedinUserId,
                locationId: this.locationId,
              });
          if(result.status==201){
            console.log("success");
            alert("Category Added successfully");

            setTimeout(() => {
              this.name="";
              this.v$.name.$errors[0].$message="";            
            }, 2000);
          }
          else{
            alert("Failed")
          }
        }
      }else{
          console.log("Failed")
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
