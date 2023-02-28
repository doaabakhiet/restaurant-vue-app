<template>
<div class="UpdateItem">
    <HeaderApp/>
    <section class="pt-3">
      <div class="container">
        <h1 class="text-danger">Update Item</h1>
            <form @click.prevent>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <h6 class="text-warning">{{ErrorMessage}}</h6>
                    <label class="form-label textColor" for="form3Example1c">Your Name</label>
                    <span class="error-feedback text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
                    <input type="text" v-model="name" id="form3Example1c" class="form-control" />
                </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <label class="form-label textColor" for="form3Example1c">price</label>
                    <span class="error-feedback text-danger" v-if="v$.price.$error">{{v$.price.$errors[0].$message}}</span>
                    <input type="number" v-model="price" id="form3Example1c" class="form-control" />
                </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0">
                    <label class="form-label textColor" for="form3Example1c">description</label>
                    <span class="error-feedback text-danger" v-if="v$.description.$error">{{v$.description.$errors[0].$message}}</span>
                    <textarea type="text" v-model="description" id="form3Example1c" class="form-control" ></textarea>
                </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.qty.$error}">
                    <label class="form-label textColor" for="form3Example1c">qty</label>
                    <span class="error-feedback text-danger" v-if="v$.qty.$error">{{v$.qty.$errors[0].$message}}</span>
                    <input type="number" v-model="qty" id="form3Example1c" class="form-control" />
                </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-4">
                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.PickedCategory.$error}">
                <label for="Select">Select Category For The Item</label><br>
                <span class="error-feedback text-danger" v-if="v$.PickedCategory.$error">{{v$.PickedCategory.$errors[0].$message}}</span>
                <select class="form-select textColor" v-model="PickedCategory" id="Select" >
                <option v-for="(cat,i) in ListOfCategories" :key="i" :value='cat.id'>{{cat.name}}</option>
                </select>
                 </div>
                </div>
<!-- {{ListOfItems}} -->
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button"  @click="UpdateNewItem" class="btn btnColor btn-lg">Update</button>
                  </div>
            </form>
        </div>
    </section>
   <FooterApp/>
</div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue';
import { mapMutations,mapState } from 'vuex';
import axios from "axios";
import useValidate from '@vuelidate/core';
import {required,minLength,between }from '@vuelidate/validators';
import FooterApp from '@/components/FooterApp.vue';

export default {
    name: "UpdateItem",
    props: {
        msg: String,
    },
    data() {
        return {
            itemId: this.$route.params.itemId,
            locationId: this.$route.params.locationId,
            v$: useValidate(),
            name: "",
            price: 0,
            description: "",
            qty: 0,
            ErrorMessage: "",
            PickedCategory: "",
            ListOfItems: []
        };
    },
    validations() {
        return {
            name: { required, minLength: minLength(5) },
            price: { required, between: between(1, 1000) },
            description: { required, minLength: minLength(10) },
            qty: { required },
            PickedCategory: { required }
        };
    },
    computed: {
        ...mapState(["ListOfCategories"]),
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) {
            this.userId = JSON.parse(user).id;
            console.log(this.itemId, this.userId);
            this.CanUserAccessItem({
                userid: this.userId,
                locationId: this.locationId,
                itemId: this.itemId,
                redirectToPage: "home"
            });
        }
        console.log(this.userId, this.locationId, this.itemId);
        this.displayCategories({ userid: this.userId, locationId: this.locationId });
        this.DisplayItems(this.userId, this.locationId, this.itemId);
    },
    methods: {
        ...mapMutations(["CanUserAccessItem", "displayCategories"]),
        async UpdateNewItem() {
            this.v$.$validate();
            if (!this.v$.$error) {
                let result = await axios.put(`http://localhost:3000/items/${this.itemId}`, {
                    name: this.name,
                    description: this.description,
                    price: parseFloat(this.price).toFixed(2),
                    qty: parseInt(this.qty),
                    userid: this.userId,
                    catId: this.PickedCategory,
                    locId: this.locationId,
                    id: this.itemId
                });
                if (result.status == 200) {
                    console.log("success");
                    alert("Category Updated successfully");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else {
                    alert("Failed");
                }
            }
            else {
                console.log("Failed");
            }
        },
        async DisplayItems(userid, locationId, itemId) {
            let result = await axios.get(`http://localhost:3000/items?userid=${userid}&locId=${locationId}&id=${itemId}`);
            if (result.status == 200) {
                this.ListOfItems = result.data;
                this.name = this.ListOfItems[0].name;
                this.price = this.ListOfItems[0].price;
                this.description = this.ListOfItems[0].description;
                this.qty = this.ListOfItems[0].qty;
                this.PickedCategory = this.ListOfItems[0].catId;
            }
        }
    },
    components: { HeaderApp, FooterApp }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-group-error select,.form-group-error input{
    color:red;
    border-color: red;
}
</style>
  