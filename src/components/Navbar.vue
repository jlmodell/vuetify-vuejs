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
      <v-btn large to="/" class="teal white--text hidden-xs-only">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn large to="/sales" class="teal white--text hidden-xs-only">
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <v-btn large class="teal white--text hidden-xs-only" v-if="loggedIn" @click="logout">Logout</v-btn>
      <v-btn large to="/login" class="teal white--text hidden-xs-only" v-if="!loggedIn">Login</v-btn>
    </v-app-bar>

    <v-navigation-drawer width="300px" absolute temporary v-model="drawer">
      <v-list-item v-for="item in items" :key="item.title" :to="item.path">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-spacer></v-spacer>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content justify-center>
          <date-range-picker
            v-model="range"
            v-if="loggedIn"
            :options="options"
            format="YYYY-MM-DD"
          />
        </v-list-item-content>
      </v-list-item>
      <v-spacer></v-spacer>

      <template>
        <div class="pa-2">
          <v-btn block large class="teal white--text" v-if="loggedIn" @click="logout">Logout</v-btn>
          <Login v-if="!loggedIn" />
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Login from "@/components/Login.vue";

const year = new Date().getFullYear();
const month = new Date().getMonth();

export default {
  name: "sitenavbar",
  components: { Login },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer;
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    }
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "mdi-home", path: "/" },
        { title: "Sales Analysis", icon: "mdi-home", path: "/sales" }
      ],
      range: [],
      options: {
        autoApply: true,
        minDate: new Date("2012-01-02"),
        maxDate: new Date(year, month - 1, 0),
        startDate: this.$store.getters.start,
        endDate: this.$store.getters.end
      }
    };
  },
  watch: {
    range: async function(range) {
      const [start, end] = await range;
      await this.$store.dispatch("start", start);
      await this.$store.dispatch("end", end);
    }
  }
};
</script>