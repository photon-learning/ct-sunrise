import gql from 'graphql-tag';
import BASIC_CART_QUERY from './BasicCart.gql';
import CART_FRAGMENT from '../components/Cart.gql';
import ORDER_FRAGMENT from '../components/Order.gql';
import MONEY_FRAGMENT from '../components/Money.gql';
import ADDRESS_FRAGMENT from '../components/Address.gql';
import { locale } from '../components/common/shared';

function cartExists(vm) {
  return vm.me?.activeCart;
}

export default {
  computed: {
    cartExists() {
      return cartExists(this);
    },

    cartNotEmpty() {
      return this.me?.activeCart?.lineItems.length > 0;
    },

    totalItems() {
      if (cartExists(this)) {
        return this.me.activeCart.lineItems.reduce((acc, li) => acc + li.quantity, 0);
      }
      return 0;
    },

    sortedLineItems() {
      if (cartExists(this)) {
        return [...this.me.activeCart.lineItems].reverse();
      }
      return [];
    },
  },

  methods: {
    updateOrder(actions,id,version) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateOrder($id: String!, $version: Long!, $actions: [OrderUpdateAction!]!) {
            updateOrder(id: $id,version:$version ,actions: $actions) {
              id
              version
            }
          }`,
          variables: {
          actions,id: id,version:version}
      });
    },
    updateMyCart(actions) {
      // Issue with under-fetching on mutations https://github.com/apollographql/apollo-client/issues/3267
      // required any queried field to be fetched in order to update all components using carts, e.g. mini-cart
      return this.$apollo.mutate({
        mutation: gql`
          mutation updateMyCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              ...CartFields
            }
          }
          ${CART_FRAGMENT}
          ${MONEY_FRAGMENT}
          ${ADDRESS_FRAGMENT}`,
        variables: {
          actions,
          id: this.me.activeCart?.id,
          version: this.me.activeCart?.version,
          locale: locale(this),
        },
      }).then(
        (result) => {
          if (!result?.data?.updateMyCart?.lineItems?.length) {
            return this.$apollo.mutate({
              mutation: gql`
                mutation deleteMyCart($id: String!, $version: Long!) {
                  deleteMyCart(id: $id, version: $version) {
                    id
                  }
                }`,
              variables: {
                id: result.data.updateMyCart.id,
                version: result.data.updateMyCart.version,
              },
            }).then(
              () => window.location.reload(),
            );
          }
          return result;
        },
      );
    },

    createMyCart(draft) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation ($draft: MyCartDraft!) {
            createMyCart(draft: $draft) {
              id
              version
            }
          }`,
        variables: { draft },
        update: (store, { data: { createMyCart } }) => {
          const data = store.readQuery({ query: BASIC_CART_QUERY });
          data.me.activeCart = createMyCart;
          store.writeQuery({ query: BASIC_CART_QUERY, data });
        },
      });
    },

    createMyPayment(paymentvalue) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation ($draft: MyPaymentDraft!) {
            createPayment(draft: $paymentvalue ) {
              id
              version
              amountPlanned {
                type
                currencyCode
                centAmount
                fractionDigits
              }
              paymentMethodInfo {
                paymentInterface
                method
                name
              }
              paymentStatus
              transactions
            }
          }`,
        variables: { paymentvalue },
      }).then((result) => {console.log("result",result)});
    },

    createMyOrder() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation ($id: String!, $version: Long!, $locale: Locale!) {
            createMyOrderFromCart(draft: { id: $id, version: $version }) {
              ...OrderFields
            }
          }
          ${ORDER_FRAGMENT}
          ${MONEY_FRAGMENT}
          ${ADDRESS_FRAGMENT}`,
        variables: {
          id: this.me.activeCart?.id,
          version: this.me.activeCart?.version,
          locale: locale(this),
        },
        update: (store) => {
          const data = store.readQuery({ query: BASIC_CART_QUERY });
          data.me.activeCart = null;
          store.writeQuery({ query: BASIC_CART_QUERY, data });
          // invalidate cached order pages
          Object.keys(store.data.toObject())
            .filter((key) => key.startsWith('Order'))
            .forEach(
              (key) => store.data.delete(key),
            );
        },
      });
    },
  },

  apollo: {
    me: BASIC_CART_QUERY,
  },
};
