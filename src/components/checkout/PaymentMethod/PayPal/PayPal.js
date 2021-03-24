import PayPal from 'vue-paypal-checkout';
import cartMixin from "../../../../mixins/cartMixin";
import payments from "../../../../api/payments";
 
export default {
  props: { amount: Object },
  mixins: [cartMixin],
  data() {
    return {
    credentials: {
        sandbox: 'AWzQwUv-KRxdxppN0kbP2EEuoC4w1U7iLBP8zvseIU8aY0Ln_0jeso1mpzCqJemPf3e8eKeFvv9k2MW8',
        // production: '<production client id>'
        },
      paypal: {
        sandbox: 'AWzQwUv-KRxdxppN0kbP2EEuoC4w1U7iLBP8zvseIU8aY0Ln_0jeso1mpzCqJemPf3e8eKeFvv9k2MW8',
        // production: '<production client id>'
      }
    }
  },
  computed:{
    getprice() {
      let lengthstring = String(this.amount.centAmount).length - this.amount.fractionDigits;
      let gtrealvalue = String(this.amount.centAmount).substr(0,lengthstring);
      console.log("gt",gtrealvalue);
      
      return gtrealvalue+"."+String(this.amount.centAmount).substr(3);
    },
    getcurrency() {
      return this.amount.currencyCode;
    }
  },
  methods: {
    paymentAuthorized(event) {
       // Your response
       console.log(`>>>>>>>>>paymentAuthorized`);
       console.log(JSON.stringify(event));
       console.log(`<<<<<<<<<paymentAuthorized`); 
    },
    paymentCompleted(event) {
      payments
            .createItem({
              amountPlanned : {
                currencyCode : this.amount.currencyCode,
                centAmount : this.amount.centAmount
              },
              paymentMethodInfo: {
                paymentInterface : "PAYPAL",
                method : "PAYPAL",
                name : {
                  "en" : "PAYPAL"
                }},
                transactions : [ {
                  timestamp : event.create_time,
                  type : "Charge",
                  amount : {
                    currencyCode : event.transactions[0].amount.currency,
                    centAmount : event.transactions[0].amount.total
                  },
                  state : "Success"
                } ]
            })
            .then((payment) => {
              if (payment.satusCode) {
                return Promise.reject();
              }
              this.$store.dispatch("setPayment", payment);
              return payment;
            });
      let result = event;
      //this.createMyPayment(paymentvalue);
       // Your response
       console.log(`>>>>>>>>>paymentCompleted`);
       console.log(result);
       //console.log(paymentvalue);
       console.log(`<<<<<<<<<paymentCompleted`); 
    },
    paymentCancelled(event) {
       // Your response
       console.log(`>>>>>>>>>paymentCancelled`); 
       console.log(JSON.stringify(event));
       console.log(`<<<<<<<<<paymentCancelled`); 
    }
  },
  components: {
    PayPal
  }
}
