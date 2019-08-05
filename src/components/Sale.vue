<template>
  <v-container>
    <v-card>{{info._id.customer}}</v-card>
  </v-container>
</template>

<script>
// import axios from "axios";

// const cid = this.customer.name.split("|")[1];

export default {
  name: "sale",
  props: {
    customer: {
      type: Object
    }
  },
  computed: {
    info: {
      info() {
        const cid = this.customer.name.split("|")[1];
        return this.$store.getters.customer(cid);
      }
    }
    // info() {
    //   return this.$state.getters.customer(cid);
    // }
  },
  methods: {
    // async getInfo() {
    //   const authStr = `Bearer ${this.$store.state.token}`;
    //   const cid = this.customer.name.split("|")[1];
    //   try {
    //     const res = await axios.get(
    //       `${this.$store.state.api.url}sales/summary/cust/${cid}/${this.$store.state.start}/${this.$store.state.end}`,
    //       {
    //         headers: {
    //           Authorization: authStr
    //         }
    //       }
    //     );
    //     if (res.status === 200) {
    //       this.info = await res.data[0];
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  },
  data() {
    return {
      // info: []
    };
  }
  // async mounted() {
  //   this.$store.dispatch("customer", this.customer);
  // }
};
</script>