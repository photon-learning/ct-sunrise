import BasePrice from "../../BasePrice/BasePrice.vue";
import DiscountCodes from "../DiscountCodes/DiscountCodes.vue";
import { subTotal } from "../../shared";

export default {
  components: {
    DiscountCodes,
    BasePrice,
  },
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    subtotal() {
      return subTotal(this.cartLike);
    },
    taxes() {
      const { currencyCode, fractionDigits } = this.cartLike.totalPrice;
      const { taxedPrice } = this.cartLike;
      if (taxedPrice) {
        return {
          value: {
            centAmount:
              taxedPrice.totalGross.centAmount - taxedPrice.totalNet.centAmount,
            currencyCode,
            fractionDigits,
          },
        };
      }
      return null;
    },
    total() {
      const { currencyCode, fractionDigits } = this.cartLike.totalPrice;
      const { taxedPrice } = this.cartLike;
      const { totalPrice } = this.cartLike;
      let shippingprice = 0;
      if (this.cartLike.shippingInfo != null) {
        shippingprice = this.cartLike.shippingInfo.price.centAmount;
      }
      console.log("taxedPrice : ", taxedPrice);
      console.log("totalPrice : ", totalPrice);
      console.log("totalPrice : ", this.cartLike);
      if (taxedPrice) {
        return {
          value: {
            centAmount:
              taxedPrice.totalGross.centAmount - shippingprice,
            currencyCode,
            fractionDigits,
          },
        };
      }
    },
    discountCodesExist() {
      return this.cartLike.discountCodes?.length;
    },
  },
};
