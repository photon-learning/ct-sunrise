import PayPal from "./PayPal/PayPal.vue";

let Payment = PayPal;
if (process.env.VUE_APP_USE_ADYEN) {
  Payment = require("./Adyen/Adyen.vue").default;
}
export default Payment;
