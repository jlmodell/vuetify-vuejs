<template>
  <v-container>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn absolute dark fab right color="pink" @click="dialog = true">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Set Date Range</v-card-title>

        <div class="content">
          <div class="dateContainer">
            <date-range-picker
              class="datePicker font-weight-black"
              v-model="range"
              :options="options"
              format="YYYY-MM-DD"
            />
          </div>
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
.dateContainer {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 3rem 0;
}
.datePicker {
  padding: 1rem 2rem;
  cursor: pointer;
  background-color: teal;
  border-radius: 2.25rem;
  color: white;
  -webkit-box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.75);
}
</style>
