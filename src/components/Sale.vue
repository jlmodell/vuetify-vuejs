<template>
  <v-container>
    <v-card>{{customer.name}}</v-card>
  </v-container>
</template>

<script>
export default {
  name: "sale",
  props: ["customer"]
};
</script>