<template>
  <div>
    <nav>
      <h1>DealHub</h1>
      <router-link to="/">Products</router-link>
      <router-link to="/cart">Cart ({{ cartStore.items.length }})</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cart.js'
const cartStore = useCartStore()
</script>
