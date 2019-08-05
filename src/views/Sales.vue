<template>
  <v-container>
    <v-layout>
      <v-flex>Start: {{start}}</v-flex>
      <v-flex>End: {{end}}</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "sales",
  computed: {
    start: {
      get: function() {
        return this.$store.getters.start;
      }
    },
    end: {
      get: function() {
        return this.$store.getters.end;
      }
    }
  },
  data() {
    return {};
  }
};
</script>

