<template>
  <v-container>
    <v-card>{{info ? info._id.customer : "..." }} - GPM: {{info ? `${info.grossProfitMargin}%` : "..."}}</v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "sale",
  props: {
    customer: {
      type: Object
    }
  },
  data() {
    return {
      info: []
    };
  },
  async mounted() {
    const authStr = `Bearer ${this.$store.state.token}`;
    const cid = this.customer.name.split("|")[1];

    try {
      const res = await axios.get(
        `${this.$store.state.api.url}sales/summary/cust/${cid}/${this.$store.state.start}/${this.$store.state.end}`,
        {
          headers: {
            Authorization: authStr
          }
        }
      );

      if (res.status === 200) {
        this.info = await res.data[0];
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>