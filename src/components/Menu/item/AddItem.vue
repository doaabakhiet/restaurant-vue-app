<template>
  <div class="AddItem">
    <HeaderApp/>
    <section class="pt-2">
        <div class="container">
            <h1 class="textColor">{{Locname}}</h1>
            <small class="text-muted">{{LocAddress}} - </small> 
            <small class="text-muted">{{LocPhone}}</small>
        </div>
    </section>
    <section class="pt-3">
      <div class="container">
        <h1 class="text-success">Add New Item</h1>
            <form @click.prevent>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <h6 class="text-warning">{{ErrorMessage}}</h6>
                    <label class="form-label textColor" for="form3Example1c">Your Name</label>
                    <span class="error-feedback textColor" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
                    <input type="text" v-model="name" id="form3Example1c" class="form-control" />
                </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <label class="form-label textColor" for="form3Example1c">price</label>
                    <span class="error-feedback textColor" v-if="v$.price.$error">{{v$.price.$errors[0].$message}}</span>
                    <input type="number" v-model="price" id="form3Example1c" class="form-control" />
                </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <label class="form-label textColor" for="form3Example1c">description</label>
                    <span class="error-feedback textColor" v-if="v$.description.$error">{{v$.description.$errors[0].$message}}</span>
                    <textarea type="text" v-model="description" id="form3Example1c" class="form-control" ></textarea>
                </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <label class="form-label textColor" for="form3Example1c">qty</label>
                    <span class="error-feedback textColor" v-if="v$.qty.$error">{{v$.qty.$errors[0].$message}}</span>
                    <input type="number" v-model="qty" id="form3Example1c" class="form-control" />
                </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.PickedCategory.$error}">
                <label for="Select" class="textColor">Select Category For The Item</label><br>
                <span class="error-feedback textColor" v-if="v$.PickedCategory.$error">{{v$.PickedCategory.$errors[0].$message}}</span>
                <select class="form-select" v-model="PickedCategory" id="Select" >
                <option v-for="(cat,i) in ListOfCategories" :key="i" :value='cat.id'>{{cat.name}}</option>
                </select>
                 </div>
                </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button"  @click="AddNewItem" class="btn btnColor btn-lg">Add</button>
                  </div>
            </form>
        </div>
     </section>
     <FooterApp/>
  </div>
</template>
<script>

import { mapMutations,mapState } from 'vuex';
import axios from "axios";
import HeaderApp from '@/components/HeaderApp.vue';
import useValidate from '@vuelidate/core';
import {required,minLength,between }from '@vuelidate/validators';
import FooterApp from '@/components/FooterApp.vue';

export default {
    name: "AddItem",
    components: { HeaderApp, FooterApp },
    data(){
        return{
            userId:"",
            locationId:this.$route.params.LocationId,
            listOfLocation:[],
            Locname:"",
            LocAddress:"",
            LocPhone:"",
            v$: useValidate(),
            name:"",
            price:0.00,
            description:"",
            qty:0,
            ErrorMessage:"",
            PickedCategory:""
        }
    },
    validations(){
        return{
        name:{required, minLength :minLength (5)},
        price:{required,between:between(1,1000)},
        description:{required, minLength :minLength (10)},
        qty:{required},
        PickedCategory:{required}
        };
    },
    async mounted(){
        let user=localStorage.getItem("user-info");
        if(user){
            this.userId=JSON.parse(user).id;
            this.CanUserAccessLocation({
                userid:this.userId,locationId:this.locationId,redirectToPage:"home"
            });
        }
        let result = await axios.get(`http://localhost:3000/locations?userid=${this.userId}&id=${this.locationId}`);
        if (result.status == 200) {
            this.listOfLocation = result.data;
            console.log(this.listOfLocation,this.locationId,this.userId);
            this.Locname=this.listOfLocation[0].name;
            this.LocAddress=this.listOfLocation[0].address;
            this.LocPhone=this.listOfLocation[0].phone;
        }

        this.displayCategories({userid:this.userId,locationId:this.locationId});
    },
    computed:{
        ...mapState(['ListOfCategories']),
    },
    methods:{
        ...mapMutations(['CanUserAccessLocation','displayCategories']),
        async AddNewItem(){
            this.v$.$validate();
            if(!this.v$.$error){
                let result= await axios.post("http://localhost:3000/items",
                {
                name: this.name,
                description:this.description,
                price: parseFloat(this.price).toFixed(2),
                qty: parseInt(this.qty),
                userid:this.userId,
                catId: this.PickedCategory,
                locId:this.locationId
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
            }}
            else{
                console.log("Failed")
            }
            
        }
    }
}
</script>

<style scoped lang="scss">
.form-group-error select{
    color:red;
    border-color: red;
}
// .AddItem{
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }
</style>