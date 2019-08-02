<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container grid-list-xl align-center="true">
      <v-layout wrap>
        <v-flex>
          <v-text-field v-model="user.email" label="E-mail" required type="email"></v-text-field>
          <v-text-field v-model="user.password" label="password" required type="password"></v-text-field>
          <v-divider inset></v-divider>
          <v-btn block class="teal lighten-2 white--text" type="submit">Submit</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  methods: {
    async handleSubmit(e) {
      e.preventDefault();

      let url = `https://busse-nestjs-api.herokuapp.com/users/login/`;
      let data = {
        email: this.user.email,
        password: this.user.password
      };
      const res = await axios.post(url, data);
      window.localStorage.setItem("token", res.data.token);
      console.log(res.data);
    }
  },
  data: () => ({
    user: {
      email: "",
      password: ""
    }
  })
};
</script>

