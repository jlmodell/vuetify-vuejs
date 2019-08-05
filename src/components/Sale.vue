<template>
  <v-container>
    <v-card v-for="customer in customers" :key="customer">
      {{customer}}      
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "sale",
  props: ["customers"]
};
</script>