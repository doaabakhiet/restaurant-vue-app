<template>
    <div class="ItemPage ">
        <HeaderApp/>
        <section class="pt-5">
            <div class="container">
                <button type="button" class="btn btnAddItem float-end" @click="deleteAllItems()">Delete All</button>
            </div>
        </section>
        <section class="pt-5 pb-5">
            <div class="container pb-5">
                <!-- <button type="button" class="btn btn-warning float-end" @click="deleteAll()">Delete All</button> -->
                <div class="alert alert-success" v-if="successMessage.length>0">{{ successMessage }}</div>


            <table class="table caption-top pb-5" v-if="listOfItems.length>0">
                    <caption class="textColor">List of Items </caption>
              <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in listOfItems" :key="i">
                        <th>{{item.id}}</th>
                        <th>{{item.name}}</th>
                        <td>{{item.price}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.qty}}</td>
                        <td>
                            <button class="btn btn-light text-success" @click="deleteItem(item.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                        </td>
                    <td>   
                        <router-link :to="{name:'UpdateItem',params:{itemId:item.id,locationId:item.locId}}">
                            <button class="btn btn-light text-success"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
                        </router-link>
                    </td>
                </tr> 
              </tbody>
            </table>
            <!-- Button trigger modal -->


            <div class="alert alertColor" v-else >No Items Added Yet.</div>
            </div>
        </section>
        <FooterApp/>
    </div>
  </template>
  
  <script>
import HeaderApp from '@/components/HeaderApp.vue';
import axios from "axios";
import FooterApp from '@/components/FooterApp.vue';
  export default {
    name: "ItemPage ",
    components: { HeaderApp, FooterApp },
    data(){
        return{
            userId:"",
            locationId:this.$route.params.locationId,
            catId:this.$route.params.catId,
            listOfItems:[],
            allItemId:[],
            successMessage:""
        }
    },
    async mounted(){
        let user=localStorage.getItem("user-info");
        if(user){
            this.userId=JSON.parse(user).id;
            let result = await axios.get(`http://localhost:3000/items?userid=${this.userId}&catId=${this.catId}&locId=${this.locationId}`);
            if (result.status == 200) {
                this.listOfItems = result.data;
                console.log(this.listOfItems);
                for(var i=0;i<=result.data.length-1;i++){
                    this.allItemId.push(result.data[i].id);
                }console.log(this.allItemId)
            }
        }
    },
    methods:{
        async deleteItem(id){
            let result = await axios.delete(`http://localhost:3000/items/${id}`);
            if (result.status == 200) {
              this.successMessage="The Item Deleted Successfully...";
            }
            setTimeout(() => {
                window.location.reload(); //refresh the page
            },3000);
        },
        async deleteAllItems(){
            let successDelete=[];
            for(var i=0;i<=this.allItemId.length-1;i++){
                  let result = await axios.delete(`http://localhost:3000/items/${this.allItemId[i]}`);
                  if (result.status == 200) {
                    successDelete.push(true);
                  }else{
                    successDelete.push(false);
                  }
                }
                if(successDelete){
                    this.successMessage="All Items Deleted Successfully...";
                      setTimeout(() => {
                        window.location.reload(); //refresh the page
                      },5000);
                  }else{
                    this.successMessage="Something Goes wrong ,Try again";
                  }
        }
    }
};
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  
  </style>
  