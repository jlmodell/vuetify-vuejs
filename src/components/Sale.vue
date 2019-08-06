<template>
  <v-data-table :headers="headers" :items="customer" :items-per-page="10" class="elevation-3"></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Customers",
          align: "left",
          sortable: true,
          value: "_id.customer"
        },
        {
          text: "ID",
          value: "_id.cid"
        },
        {
          text: "Qty Sold",
          value: "quantity"
        },
        {
          text: "Total Sales",
          value: "sales"
        },
        {
          text: "Total Costs",
          value: "costs"
        },
        {
          text: "Gross Profit $",
          value: "grossProfit"
        },
        {
          text: "Gross Profit Margin",
          value: "grossProfitMargin"
        }
      ]
      // customer: [
      //   {
      //     _id: {
      //       cid: "3188",
      //       customer: "ADVANCED MATERIALS INC"
      //     },
      //     costs: 166.18,
      //     grossProfit: 190.32,
      //     grossProfitMargin: 53.3856,
      //     quantity: 4,
      //     sales: 356.5
      //   }
      // ]
    };
  },
  computed: {
    customer: {
      get: function() {
        return this.$store.getters.customerArray;
      }
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>