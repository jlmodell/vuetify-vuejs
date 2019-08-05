<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card class="mx-auto" color="indigo lighten-2" dark>
          <div class="header headline mb-2">
            <h1 class="text-center">Current Dates:</h1>
          </div>
          <div class="content">
            <div class="start">
              <h2 class="text-center">Start:</h2>
              <v-card-text>
                <p class="headline mb-4">{{new Date(start).toISOString()}}</p>
              </v-card-text>
            </div>
            <div class="end">
              <h2 class="text-center">End:</h2>
              <v-card-text>
                <p class="headline mb-4">{{new Date(end).toISOString()}}</p>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-flex>
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

<style>
.content {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.header {
  padding: 2.5rem 0;
}
.start {
  padding: 0 5rem 1rem 5rem;
}
.end {
  padding: 0 5rem 1rem 5rem;
}
</style>
