import gql from 'graphql-tag';
import productMixin from '../../../mixins/productMixin';
import ProductGallery from '../ProductGallery/ProductGallery.vue';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
import DetailsSection from '../DetailsSection/DetailsSection.vue';
import AddToCartForm from '../AddToCartForm/AddToCartForm.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import VariantSelector from '../VariantSelector/VariantSelector.vue';
import { locale } from '../../common/shared';
import AddToCartFormJS from '../AddToCartForm/AddToCartForm'

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  components: {
    DetailsSection,
    ProductGallery,
    SocialMediaLinks,
    AddToCartForm,
    BasePrice,
    VariantSelector,
    AddToCartFormJS
  },
  mixins: [productMixin],
  data: () => ({
    product: null,
    isOutOfStock:false,
    availableQuantity:0
  }),  
  computed: {
    matchingVariant() {
      return this.currentProduct.variant || {};
    },
  },
  async mounted() {
    this.availableQuantity == await this.countAvailableQuantity();
  },
  methods: {
    listenerChild(value) {      
      this.isOutOfStock = value;
    },
    async countAvailableQuantity() {
      if (localStorage.skuselect != '') {
        this.sku = localStorage.skuselect;
        localStorage.skuselect = '';
        localStorage.skustart = '';
      }
      // if (!this.cartExists) {
      //   await this.createMyCart(createCartVariables(this));
      // }
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
          return this.availableQuantity = availableQuantity
        } catch (error) {
          console.log("error get inventory");
          console.log(error);
        }
      }
      // if (availableQuantity < Number(this.quantity)) {       
      //   return this.setOutOfStock=true;   
      // }else{
      //   return this.updateMyCart(updateCartVariables(this)).then(() => { 
      //     this.setOutOfStock=false;        
      //     this.$store.dispatch("openMiniCart");
      //   });
      // }      
    }
  },
  apollo: {
    product: {
      query: gql`
        query Product($locale: Locale!, $sku: String!, $currency: Currency!, $country: Country!,$channelId: String) {
          product(sku: $sku) {
            id
            masterData {
              current {
                name(locale: $locale)
                description(locale: $locale)
                slug(locale: $locale)
                variant(sku: $sku) {
                  price(currency: $currency,country:$country,channelId:$channelId) {
                    value {
                      ...printPrice
                    }
                    discounted {
                      value {
                       ...printPrice
                      }
                    }
                  }
                }
              }
            }
          }
        }
        fragment printPrice on BaseMoney {
          centAmount
          fractionDigits
          currencyCode
        }`,
      variables() {
        return {
          locale: locale(this),
          currency: this.$store.state.currency,
          sku: this.sku,
          country: this.$store.state.country,
          channelId: this.$store.state?.channel?.id,
        };
      },
    },
  },
};
