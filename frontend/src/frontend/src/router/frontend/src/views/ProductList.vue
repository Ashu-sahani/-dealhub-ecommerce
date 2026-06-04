<template>
  <div class="product-page">
    <input v-model="search" placeholder="Search..." @input="fetchProducts" />
    <div class="grid">
      <div v-for="product in products" :key="product.id" class="card">
        <h3>{{ product.name }}</h3>
        <p>${{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCartStore } from '../stores/cart.js'

const products = ref([])
const search = ref('')
const cartStore = useCartStore()

const fetchProducts = async () => {
  const res = await axios.get('/api/products', { params: { search: search.value } })
  products.value = res.data.products
}

const addToCart = (p) => cartStore.addItem(p)

onMounted(fetchProducts)
</script>
