<script setup>
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/main.js'
import FirebaseChangedData from '../src/components/FirebaseChangedData.vue'
import Toast from '@/components/Toast.vue'

useMainStore().setUser({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
})
</script>

<template>
  <RouterView />
  <FirebaseChangedData />

</template>
