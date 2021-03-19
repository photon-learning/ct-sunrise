import cartMixin from '../../../mixins/cartMixin';
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
  const distributionChannel = component.$store.state.channel ? {
    distributionChannel: {
      typeId: 'channel',
      id: component.$store.state.channel.id,
    },
  } : {};

  return ({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
    },
  });
};
export default {
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
  },
  methods: {
    async addLineItem() {
      if (!this.cartExists) {
        await this.createMyCart(createCartVariables(this));
      }
      return this.updateMyCart(
        updateCartVariables(this),
      ).then(() => this.$store.dispatch('openMiniCart'));
    },
  },
};
