<script setup>
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/main.js'
import FirebaseChangedData from '../src/components/FirebaseChangedData.vue'
import Toast from '@/components/Toast.vue'

useMainStore().setUser({
  name: 'Hậu MQ',
  email: 'haumq@uef.edu.vn',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_9NHFRLJL-KUm7oeoJqWis4tRLLu8dtuEQ&usqp=CAU'
})
</script>

<template>
  <RouterView />
  <FirebaseChangedData />

</template>
