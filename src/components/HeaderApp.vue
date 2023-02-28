
<template>
  <div class="HeaderApp">
    <nav class="navbar">
    <span class="navbar-toggle pb-5" id="js-navbar-toggle">
        <font-awesome-icon icon="fa-solid fa-bars" />
    </span>
    <router-link class="logo" to="/">Best Restaurant</router-link>
    <ul class="main-nav pt-3" id="js-menu">
      <li>
        <router-link class="nav-links" to="/" exact>Home</router-link>
      </li>
      <!-- <li>
        <router-link class="nav-links" to="/profile">Profile</router-link>
      </li> -->
      <li>
        <a href="#" class="nav-links">About Us</a>
      </li>
      <li>
        <a href="#" class="nav-links">Contact Us</a>
      </li>
      <li>
      <router-link class="nav-links" to="/profile" title="Profile"><font-awesome-icon icon="fa-solid fa-user" />&nbsp;{{name}}</router-link>
      </li>
      <li>
        <a href="#" class="nav-links" @click="logout" title="Logout"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /></a>
      </li>
    </ul>
  </nav>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: "HeaderApp",
  props: {
    msg: String,
  },
  data(){
    return{
        name:""
    }
  },
  mounted(){
      let userData=localStorage.getItem("user-info");
      if(userData){
      this.name=JSON.parse(userData).name;
      }
      let mainNav = document.getElementById("js-menu");
      let navBarToggle = document.getElementById("js-navbar-toggle");

      navBarToggle.addEventListener("click", function() {
        mainNav.classList.toggle("active");
      });

  },
  methods:{
    ...mapActions(['redirectTo']),
    logout(){
        localStorage.clear();
        this.redirectTo({val:'SignupView'});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
  font-size: 18px;
  background-image: linear-gradient(260deg, #0c6113 0%, #cf6e8b 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
}

.main-nav {
  list-style-type: none;
  display: none;
}

.nav-links,
.logo {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
}

.main-nav li {
  text-align: center;
  margin: 15px auto;
}

.logo {
  display: inline-block;
  font-size: 22px;
  margin-top: 10px;
  margin-left: 20px;
}

.navbar-toggle {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
}

.active {
  display: block;
}

@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }

  .main-nav {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .main-nav li {
    margin: 0;
  }

  .nav-links {
    margin-left: 40px;
  }

  .logo {
    margin-top: 0;
  }

  .navbar-toggle {
    display: none;
  }

  .logo:hover,
  .nav-links:hover {
    color: rgba(255, 255, 255, 1);
  }
}


</style>
