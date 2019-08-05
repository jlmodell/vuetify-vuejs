<template>
  <v-form @submit.prevent="login">
    <v-container grid-list-xl align-center="true">
      <v-layout wrap>
        <v-flex>
          <v-text-field v-model="email" label="E-mail" required type="email"></v-text-field>
          <v-text-field v-model="password" label="password" required type="password"></v-text-field>
          <v-btn block class="teal lighten-2 white--text" type="submit">Submit</v-btn>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "login",
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      this.$router.push({ name: "home" });
    }
  },
  data() {
    return {
      email: "",
      password: ""
    };
  }
};
</script>

