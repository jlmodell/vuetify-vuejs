<template>
  <v-container>
    <v-banner
      :sticky="sticky"
      :single-line="singleLine"
      :icon="icon"
      :color="color"
      :icon-color="iconColor"
      :elevation="elevation"
    >
      {{new Date(start).toISOString().substring(0,10)}} - {{new Date(end).toISOString().substring(0,10)}}
      <template
        v-slot:actions
      >
        <v-btn text color="deep-purple accent-4" @click="$emit">Change Dates</v-btn>
      </template>
    </v-banner>
    <template v-for="customer in customers">
      <Sale :customer="customer" :key="customer.index" />
    </template>
  </v-container>
</template>

<script>
import Sale from "@/components/Sale";

export default {
  name: "sales",
  components: { Sale },
  async mounted() {
    await this.$store.dispatch("customers");
    await this.$store.state.customers.forEach(x => {
      this.$store.dispatch("customer", x.name.split("|")[1]);
    });
  },
  method: {},
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
    },
    customers: {
      get: function() {
        return this.$store.getters.customers;
      }
    }
  },
  data() {
    return {
      sticky: true,
      singleLine: true,
      icon: "mdi-calendar",
      color: undefined,
      iconColor: "indigo",
      elevation: 3
      // customers: ["Cardinal", "Henry Schein", "Owens & Minor"]
    };
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
