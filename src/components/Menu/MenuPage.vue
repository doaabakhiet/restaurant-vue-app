<template>
  <div class="MenuPage">
        <HeaderApp/>
        <section class="pt-2">
            <div class="container">
                <h1 class="textColor">{{Locname}}</h1>
                <small class="text-muted text-success">{{LocAddress}} - </small> 
                <small class="text-muted text-success">{{LocPhone}}</small>
            </div>
        </section>
        <section class="pb-3">
            <div class="container">
                <AddCategory />
            </div>
        </section>

        <!-- <section class="pt-5">
            <div class="container">

                <div>Is user logged in : {{IsuserLoggedIn}}</div>
                <div>LoggedinUserId : {{LoggedinUserId}}</div>
                <div>NumOfCategories : {{NumOfCategories}}</div>
                <div>ListOfCategories : {{ListOfCategories}}</div>
            </div>
        </section> -->
        <section class="pt-5">
            <div class="container">
                <button type="button" class="btn btnColor float-end" @click="deleteAllCat()"><font-awesome-icon icon="fa-solid fa-trash" />&nbsp;Delete All</button>
                <br><br>
                
                <router-link :to="{name:'AddItem',params:{LocationId:locationId}}">
                    <button v-if="IsThereCategory" class="btn btnAddItem float-end"><font-awesome-icon icon="fa-solid fa-plus" />&nbsp;Add New Item</button>
                </router-link> 
            </div>
        </section>
        <section class="pt-5">
            <div class="container">
                <!-- <button type="button" class="btn btn-warning float-end" @click="deleteAll()">Delete All</button> -->
                <div class="alert alert-success" v-if="successMessage.length>0">{{ successMessage }}</div>

                <table class="table caption-top pb-5" v-if="ListOfCategories.length>0">
                    <caption class="textColor">List of Categories {{NumOfCategories}}</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Delete</th>
                        <th>Update</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cat,i) in ListOfCategories" :key="i">
                        <th>{{cat.id}}</th>
                        <th class="textColor">{{cat.name}}</th>
                        <td>
                            <button class="btn text-success" @click="deleteCat(cat.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                        </td>
                        <td>   
                            <UpdateCat :CatData='cat'/>
                        </td>
                        <td>   
                            <router-link :to="{name:'ItemPage',params:{catId:cat.id,locationId:cat.locationId}}">
                                <button class="btn text-success"><font-awesome-icon icon="fa-solid fa-bars" /></button>
                            </router-link>
                        </td>
                    </tr> 
                </tbody>
                </table>
            <div class="alert alertColor" role="alert" v-else >No Location Added Yet.</div>
            </div>
        </section>
        
        <FooterApp/>
  </div>
</template>

<script>
import HeaderApp from '../HeaderApp.vue';
import AddCategory from './AddCategory.vue';
import { mapActions,mapState,mapMutations } from 'vuex';
import axios from "axios";
import UpdateCat from './UpdateCat.vue';
import FooterApp from '../FooterApp.vue';
export default {
    name: "MenuPage",
    props: {
        msg: String,
    },
    data(){
        return{
            userId:"",
            locationId:this.$route.params.locationId,
            IsThereCategory:true,
            listOfLocation:[],
            Locname:"",
            LocAddress:"",
            LocPhone:"",
            successMessage:"",
            allItemsIds:[],
            allCatId:[],
            locationId:this.$route.params.locationId,
        }
    },
    components: { HeaderApp, AddCategory, UpdateCat, FooterApp},
    async mounted(){
        let user=localStorage.getItem("user-info");
        if(user){
            this.userId=JSON.parse(user).id;
           
            this.IsLoggedInUser();
            this.displayCategories({userid:this.userId,locationId:this.locationId});
            this.CanUserAccessLocation({userid:this.userId,locationId:this.locationId,redirectToPage:"home"});
        }
        console.log(this.ListOfCategories,77)
        if(this.ListOfCategories.length==0){
            this.IsThereCategory=false
        }
        
        let result = await axios.get(`http://localhost:3000/locations?userid=${this.userId}&id=${this.locationId}`);
        if (result.status == 200) {
            this.listOfLocation = result.data;
            this.Locname=this.listOfLocation[0].name;
            this.LocAddress=this.listOfLocation[0].address;
            this.LocPhone=this.listOfLocation[0].phone;
        }
        let resultcat = await axios.get(`http://localhost:3000/categories?userid=${this.userId}`);
        if (resultcat.status == 200) {
            for(var i=0;i<=resultcat.data.length-1;i++){
            this.allCatId.push(resultcat.data[i].id);
            }
        }
    },
    computed:{
        ...mapState(['IsuserLoggedIn','NumOfCategories','ListOfCategories','LoggedinUserId']),
    },
    methods:{
        ...mapActions(['redirectTo']),
        ...mapMutations(['IsLoggedInUser','displayCategories','CanUserAccessLocation']),
        async deleteCat(id){
             console.log(id);
            alert("You Will Delete All Of It's Items ....");
            this.allItemsIds=[];
            let resultitems = await axios.get(`http://localhost:3000/items?catId=${id}`);
            if (resultitems.status == 200) {
                for(var i=0;i<=resultitems.data.length-1;i++){
                this.allItemsIds.push(resultitems.data[i].id);
                }
            }
            let successDelete=[];
              for(var i=0;i<=this.allItemsIds.length-1;i++){
                  let result = await axios.delete(`http://localhost:3000/items/${this.allItemsIds[i]}`);
                  if (result.status == 200) {
                    successDelete.push(true);
                  }
                  else{
                    successDelete.push(false);
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
            console.log(this.allItemsIds)
                // let resultitemss = await axios.delete(`http://localhost:3000/items/1`);
                // if ( resultitemss.status==200) {
                //     // this.redirectTo({val:'home'})
                //     this.successMessage="The Category And All Of It's Items Deleted Successfully..."
                //     setTimeout(() => {
                //     window.location.reload(); //refresh the page
                //     },3000);
                    
                // }
            //}
        },
    async deleteAllCat(){
        let userData = localStorage.getItem("user-info");
        if (userData) {
              
              console.log(this.userId);
              let successDelete=[];
              for(var i=0;i<=this.allCatId.length-1;i++){
                  let result = await axios.delete(`http://localhost:3000/categories/${this.allCatId[i]}`);
                  if (result.status == 200) {
                    successDelete.push(true);

                  }
                  if(successDelete){
                    this.successMessage="All Categories Deleted Successfully...";
                      setTimeout(() => {
                        window.location.reload(); //refresh the page
                      },5000);
                  }else{
                    this.successMessage="Something Goes wrong ,Try again";
                  }
                     

            }
            this.allItemsIds=[];
            let resultitems = await axios.get(`http://localhost:3000/items`);
            if (resultitems.status == 200) {
                for(var i=0;i<=resultitems.data.length-1;i++){
                this.allItemsIds.push(resultitems.data[i].id);
                }
                for(var i=0;i<=this.allItemsIds.length-1;i++){
                let result = await axios.delete(`http://localhost:3000/items/${this.allItemsIds[i]}`);
                if (result.status == 200) {
                    successDelete.push(true);
                }
                else{
                    successDelete.push(false);
                }
                }
            }
        }
    }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// sets

$gl-ms         : "screen and (max-width: 23.5em)"; // up to 360px
$gl-xs         : "screen and (max-width: 35.5em)"; // up to 568px
$gl-sm         : "screen and (max-width: 48em)";   // max 768px
$gl-md         : "screen and (max-width: 64em)";   // max 1024px
$gl-lg         : "screen and (max-width: 80em)";   // max 1280px

// table style




@media #{$gl-xs}              {
  
  table					              { display:block;
	  > *,tr,td,th              { display:block }
    
    thead                     { display:none }
    tbody tr                  { height:auto; padding:8px 0;
      td                      { padding-left:45%; margin-bottom:12px;
        &:last-child          { margin-bottom:0 }
        &:before              { 
          position:absolute;
          font-weight:700;
          width:40%;
          left:10px;
          top:0
        }
        
        &:nth-child(1):before { content:"#";}
        &:nth-child(2):before { content:"name";}
        &:nth-child(3):before { content:"Delete";}
        &:nth-child(4):before { content:"Update";}
        &:nth-child(5):before { content:"Menu";}
      }        
    }
  }
}  	




</style>
