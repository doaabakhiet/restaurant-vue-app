<template>
  <div class="hello">
    <section class="pt-3">
        <div class="container">
          <button type="button" class="btn btnColor float-end" @click="deleteAll()"><font-awesome-icon icon="fa-solid fa-trash" />&nbsp;Delete All</button>
        </div>
    </section>
    <section class="pt-3 pb-5">
        <div class="container pb-5">
          
          <div class="alert alert-success" v-if="successMessage.length>0">{{ successMessage }}</div>
          <table class="table caption-top pb-5" v-if="listOfLocation.length>0">
            <caption class="textColor">List of Locations {{listOfLocation.length}}</caption>
              <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Delete</th>
                    <th>Update</th>
                    <th>Menu</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(loc,i) in listOfLocation" :key="i">
                    <td>{{loc.id}}</td>
                    <th class="textColor">{{loc.name}}</th>
                    <td>{{loc.phone}}</td>
                    <td>{{loc.address}}</td>
                    <td>
                      <!-- <router-link :to="{name:'DeleteLocation',params:{LocationId:loc.id}}">
                          <button class="btn btn-danger">Delete</button>
                      </router-link> -->
                      <button class="btn btn-light text-success" @click="dloc(loc.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                    </td>
                    <td>   
                        <UpdateLoc :locData='loc'/>
                    </td>
                    <td>   
                      <router-link :to="{name:'MenuPage',params:{locationId:loc.id}}">
                          <button class="btn btn-light text-success"><font-awesome-icon icon="fa-solid fa-bars" /></button>
                      </router-link>
                    </td>
                </tr> 
              </tbody>
            </table>

            <div class="alert alertColor" role="alert" v-else >No Location Added Yet.</div>
        </div>

    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

import UpdateLoc from './UpdateLoc.vue';
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    data() {
        return {
            listOfLocation: {},
            allLoctationId:[],
            successMessage:"",
            userId:"",
            successDelete:[]
        };
    },
    components:{ UpdateLoc, UpdateLoc },
    async mounted() {
        let userData = localStorage.getItem("user-info");
        if (userData) {
            this.userId = JSON.parse(userData).id;
            let result = await axios.get(`http://localhost:3000/locations?userid=${this.userId}`);
            if (result.status == 200) {
                this.listOfLocation = result.data;
                for(var i=0;i<=result.data.length-1;i++){
                this.allLoctationId.push(result.data[i].id);
                
                
                }
            }
        }
    },
    methods:{
      ...mapActions(['redirectTo']),
      async dloc(id){
          let result = await axios.delete(`http://localhost:3000/locations/${id}`);
          if (result.status == 200) {
              // this.redirectTo({val:'home'})
              this.successMessage="The Location Deleted Successfully..."

              
          }

          //delete categories
            let allCatIds=[];
            let resultcat = await axios.get(`http://localhost:3000/categories?locationId=${id}`);
            if (resultcat.status == 200) {
              console.log(resultcat.data);
                for(var i=0;i<=resultcat.data.length-1;i++){
                  allCatIds.push(resultcat.data[i].id);
                }
                for(var i=0;i<=allCatIds.length-1;i++){
                let result = await axios.delete(`http://localhost:3000/categories/${allCatIds[i]}`);
                }
            }
          //delete items
            let allItemsIds=[];
            let resultitems = await axios.get(`http://localhost:3000/items?locationId=${id}`);
            if (resultitems.status == 200) {
                for(var i=0;i<=resultitems.data.length-1;i++){
                  allItemsIds.push(resultitems.data[i].id);
                }
                for(var i=0;i<=allItemsIds.length-1;i++){
                let result = await axios.delete(`http://localhost:3000/items/${allItemsIds[i]}`);
                }
            }
            setTimeout(() => {
                window.location.reload(); //refresh the page
            },1000);

      },
      async deleteAll(){
        let userData = localStorage.getItem("user-info");
        if (userData) {
              
              console.log(this.userId);
              let successDelete=[];
              for(var i=0;i<=this.allLoctationId.length-1;i++){
                  let result = await axios.delete(`http://localhost:3000/locations/${this.allLoctationId[i]}`);
                  if (result.status == 200) {
                    successDelete.push(true);
                  }
                  else{
                    successDelete.push(false);
                  }
                  if(successDelete){
                    this.successMessage="All Location Deleted Successfully...";
                      setTimeout(() => {
                        window.location.reload(); //refresh the page
                      },5000);
                  }else{
                    this.successMessage="Something Goes wrong ,Try again";
                  }
            }
        }
      },


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
        &:nth-child(3):before { content:"Phone";}
        &:nth-child(4):before { content:"Address";}
        &:nth-child(5):before { content:"Delete";}
        &:nth-child(6):before { content:"Update";}
        &:nth-child(7):before { content:"Menu";}
      }        
    }
  }
}  	




// body style

body               { 
  background:#9BC86A; 
  font:400 14px 'Calibri','Arial';
  padding:20px;
}

blockquote {
  color:white;
  text-align:center;
}
</style>
