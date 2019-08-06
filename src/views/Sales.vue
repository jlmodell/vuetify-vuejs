<template>
  <v-container>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn absolute dark fab bottom middle color="pink" @click="dialog = true">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Set Date Range</v-card-title>

        <div class="content">
          <date-range-picker
            class="headline"
            v-model="range"
            :options="options"
            format="YYYY-MM-DD"
          />
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Sale />
  </v-container>
</template>

<script>
import Sale from "@/components/Sale";

const year = new Date().getFullYear();
const month = new Date().getMonth();

export default {
  name: "sales",
  components: { Sale },
  method: {},
  watch: {
    range: async function(range) {
      const [start, end] = await range;
      await this.$store.dispatch("start", start);
      await this.$store.dispatch("end", end);
      await this.$store.dispatch("customers");
      await this.$store.state.customers.forEach(x => {
        this.$store.dispatch("customer", x.name.split("|")[1]);
      });
    }
  },
  data() {
    return {
      dialog: false,
      range: [],
      options: {
        autoApply: true,
        minDate: new Date("2012-01-02"),
        maxDate: new Date(year, month, 0),
        startDate: this.$store.getters.start,
        endDate: this.$store.getters.end
      }
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
