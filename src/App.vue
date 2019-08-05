<template>
  <v-app>
    <SiteNavbar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <SiteFooter />
  </v-app>
</template>

<script>
import SiteNavbar from "@/components/Navbar.vue";
import SiteFooter from "@/components/Footer.vue";

export default {
  name: "App",
  components: { SiteNavbar, SiteFooter },
  data() {
    return {};
  }
};
</script>
