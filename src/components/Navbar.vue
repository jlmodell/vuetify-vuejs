<template>
  <nav>
    <v-app-bar app dark class="indigo">
      <v-btn depressed large class="indigo white--text" @click.native="handleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span>Busse</span>
        <span class="font-weight-light">Hospital Disposables</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn large to="/" class="teal white--text">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn large class="teal white--text" v-if="auth">Logout</v-btn>
      <v-btn large to="/login" class="teal white--text" v-else>Login</v-btn>
    </v-app-bar>

    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block large class="teal white--text" v-if="auth">Logout</v-btn>
          <v-btn block large to="/login" class="teal white--text" v-else>Login</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "sitenavbar",
  props: ["auth"],
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer;
      console.log(this.drawer);
    }
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-home" },
        { title: "Sales Analysis", icon: "mdi-home" }
      ]
    };
  }
};
</script>