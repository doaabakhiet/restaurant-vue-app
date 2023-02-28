<template>
  <div class="Profile">
    <HeaderApp/>
    <section>
      <div class="container">
            <ProfileApp/>
        </div>
     </section>
     <FooterApp/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ProfileApp from "@/components/ProfileApp.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import FooterApp from "@/components/FooterApp.vue";
export default {
  name: "ProfileView",
    components: {
    ProfileApp,
    HeaderApp,
    FooterApp
}
  };
</script>