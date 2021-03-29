import gql from "graphql-tag";
import { required } from "vuelidate/lib/validators";
import cartMixin from "../../../mixins/cartMixin";
import BaseRadio from "../../common/form/BaseRadio/BaseRadio.vue";
import BaseMoney from "../../common/BaseMoney/BaseMoney.vue";
import BaseForm from "../../common/form/BaseForm/BaseForm.vue";
import BaseLabel from "../../common/form/BaseLabel/BaseLabel.vue";
import ServerError from "../../common/form/ServerError/ServerError.vue";
import MONEY_FRAGMENT from "../../Money.gql";
import { locale } from "../../common/shared";

export default {
  components: {
    BaseLabel,
    ServerError,
    BaseForm,
    BaseMoney,
    BaseRadio,
  },
  mixins: [cartMixin],
  data: () => ({
    me: null,
    selectedShippingMethod: null,
    pricetier: null,
  }),
  methods: {
    price(shippingMethod) {
      const shippingRate = this.matchingShippingRate(shippingMethod);
      return this.isFree(shippingRate) ? null : shippingRate.price;
    },
    matchingShippingRate(shippingMethod) {
      return this.matchingZoneRate(shippingMethod).shippingRates.find(
        (shippingRate) => shippingRate.isMatching
      );
    },
    matchingZoneRate(shippingMethod) {
      return shippingMethod.zoneRates.find((zoneRate) =>
        zoneRate.shippingRates.some((shippingRate) => shippingRate.isMatching)
      );
    },
    isFree(shippingRate) {
      const totalPrice = this.me.activeCart.totalPrice.centAmount;
      return totalPrice > shippingRate.freeAbove?.centAmount;
    },
  },
  watch: {
    me(value) {
      this.selectedShippingMethod =
        value?.activeCart?.shippingInfo?.shippingMethod?.id;
      this.pricetier = value?.activeCart?.shippingInfo?.price;
      // eslint-disable-next-line no-console
      console.log(
        "ship info:",
        value?.activeCart?.shippingInfo?.price?.centAmount
      );      
    },
    shippingMethodsByLocation(value) {
      if (!this.selectedShippingMethod) {
        this.selectedShippingMethod =
          value.find((shippingMethod) => shippingMethod.isDefault)?.id ||
          value[0]?.id;
      }
    },
    selectedShippingMethod() {
      console.log("ship info:", "test");
      if (!this.selectedShippingMethod) {
        return;
      }
      this.updateMyCart([
        {
          setShippingMethod: {
            shippingMethod: {
              typeId: "shipping-method",
              id: this.selectedShippingMethod,
            },
          },
        },
      ]).then(() => {
        let lineItemWeight = 0;
        if (
          this.me?.activeCart?.lineItems &&
          this.me?.activeCart?.lineItems.length > 0
        ) {
          this.me.activeCart.lineItems.forEach((element) => {
            let itemWeight;
            itemWeight =
              element.variant.attributesRaw.find(
                (value) => value.name == "weight"
              )?.value ?? 0;
            itemWeight = itemWeight * element.quantity;
            lineItemWeight = lineItemWeight + itemWeight;
          });
        }
        let shippingRateClassification = null;
        if (lineItemWeight >= 500 && lineItemWeight < 1000) {
          shippingRateClassification = "light";
        } else if (lineItemWeight >= 1000 && lineItemWeight <= 2000) {
          shippingRateClassification = "medium";
        } else if (lineItemWeight >= 2000) {
          shippingRateClassification = "heavy";
        }      
        if (shippingRateClassification) {
          this.updateCart([
            {
              setShippingRateInput: {
                shippingRateInput: {
                  Classification: {
                    key: shippingRateClassification,
                  },
                },
              },
            },
          ]).then(()=>{
            this.updateMyCart([{
              recalculate:{
                updateProductData:false
              }
            }])
          });
        } else {          
          this.updateCart([
            {
              setShippingRateInput: {},
            },
          ]).then(()=>{
            this.updateMyCart([{
              recalculate:{
                updateProductData:false
              }
            }])
          });
        }
      })
    },
  },
  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              version
              lineItems {
                id
                quantity
                variant {
                  sku
                  attributesRaw {
                    name
                    value
                    attributeDefinition {
                      type {
                        name
                      }
                      name
                    }
                  }
                }
              }
              shippingInfo {
                price {
                  ...MoneyFields
                }
                shippingMethod {
                  id
                }
              }
              shippingAddress {
                country
                state
              }
              totalPrice {
                centAmount
                currencyCode
              }
            }
          }
        }
        ${MONEY_FRAGMENT}
      `,
    },
    shippingMethodsByLocation: {
      query: gql`
        query checkoutShippingMethods(
          $currency: Currency!
          $country: Country!
          $state: String
          $locale: Locale
        ) {
          shippingMethodsByLocation(
            currency: $currency
            country: $country
            state: $state
          ) {
            id
            name
            localizedDescription(locale: $locale)
            isDefault
            zoneRates {
              shippingRates {
                isMatching
                freeAbove {
                  centAmount
                }
                price {
                  ...MoneyFields
                }
              }
            }
          }
        }
        ${MONEY_FRAGMENT}
      `,
      variables() {
        return {
          currency: this.me.activeCart.totalPrice.currencyCode,
          locale: locale(this),
          ...this.me.activeCart.shippingAddress,
        };
      },
      skip() {
        return !this.cartExists;
      },
    },
  },
  validations: {
    form: {
      shippingMethod: { required },
    },
  },
};
