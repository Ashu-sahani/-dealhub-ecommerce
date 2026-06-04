<template>
  <div>
    <h2>Cart</h2>
    <ul>
      <li v-for="(item,i) in cartStore.items" :key="i">{{ item.name }} - ${{ item.price }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart.js'
const cartStore = useCartStore()
</script>
