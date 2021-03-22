import cartMixin from "../../../mixins/cartMixin";
// import ServerError from '../../common/form/ServerError/index.vue';
// import LoadingButton from '../../common/form/LoadingButton/index.vue';
// import BaseSelect from '../../common/form/BaseSelect/index.vue';
// import BaseForm from '../../common/form/BaseForm/index.vue';

export const createCartVariables = (component) => ({
  currency: component.$store.state.currency,
  country: component.$store.state.country,
  shippingAddress: { country: component.$store.state.country },
  inventoryMode: "TrackOnly",
});
export const updateCartVariables = (component) => {
  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};

  return {
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),      
       ...distributionChannel,
    },
  };
};
export default {
  name:'AddToCartForm',  
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  components: {
    // BaseForm,
    // BaseSelect,
    // LoadingButton,
    // ServerError,
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    setOutOfStock: {
      get: function () {
        return;
      },
      set: function (value) {                
        return this.$emit("listenerChild", value);
      }
    },  
  },  
  methods: {    
    async addLineItem() {
      if (!this.cartExists) {
        await this.createMyCart(createCartVariables(this));
      }
      const authUrl = "https://auth.us-central1.gcp.commercetools.com";
      const hostUrl = "https://api.us-central1.gcp.commercetools.com";
      const projectKey = "photon-learning";
      let access_token = null;
      let availableQuantity = 0;

      try {
        const response = await fetch(
          authUrl + "/oauth/token?grant_type=client_credentials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic UUtFMW5faHZHandNQU13ODhJdjNYeXhLOmJOT1dJeTdINmpaT0hpN3hORTV0ZUtxcjRSa0NPaTBt",
            },
          }
        );
        const myJson = await response.json();
        access_token = myJson.access_token;
      } catch (error) {
        console.log("error get access token");
        console.log(error);
      }

      if (access_token) {
        try {
          const response = await fetch(
            hostUrl +
              "/" +
              projectKey +
              '/inventory?where=sku in ("' +
              this.sku +
              '")',
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
              },
            }
          );
          const myJson = await response.json();          
          availableQuantity = myJson.results[0].availableQuantity??0;
        } catch (error) {
          console.log("error get inventory");
          console.log(error);
        }
      }
      if (availableQuantity < Number(this.quantity)) {       
        return this.setOutOfStock=true;   
      }else{
        return this.updateMyCart(updateCartVariables(this)).then(() => { 
          this.setOutOfStock=false;        
          this.$store.dispatch("openMiniCart");
        });
      }      
    },
  },
};
