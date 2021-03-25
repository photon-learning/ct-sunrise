

export default {
  data: () => ({
    paymentMethod: "paypal",
  }),
  mounted() {
    console.log("asacc",this.paymentMethod);
    Promise.resolve(this.$loadScript("https://www.paypal.com/sdk/js?client-id=sb&currency=USD")).then((value) => {
    //mounted() {
      console.log("asacc",value.paypal);

        console.log('notification mounted');
    });

    // this.$emit("card-paid");
  },
};
