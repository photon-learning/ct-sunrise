<script src="./PayPal.js"></script>
<template>
  <div class="payment-method" style="position: relative;">
    <div style="margin: 10px 0; width: 100%; align: center; display: flex; justify-content: center;">
        <PayPal
            :amount="getprice"
            :currency="getcurrency"
            :client="credentials"
            env="sandbox"
            v-on:payment-authorized="paymentAuthorized"
            v-on:payment-completed="paymentCompleted"
            v-on:payment-cancelled="paymentCancelled">
        </PayPal>
    </div>
  </div>
</template>