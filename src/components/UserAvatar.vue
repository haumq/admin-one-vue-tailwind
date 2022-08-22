<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  api: {
    type: String,
    default: 'avataaars'
  }
})

const avatar = computed(
  () => props.avatar ?? `https://avatars.dicebear.com/api/${props.api}/${props.username.replace(/[^a-z0-9]+/i, '-')}.svg`
)

const username = computed(() => props.username)
</script>

<template>
  <div>
    <img
      :src="avatar"
      :alt="username"
      onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_9NHFRLJL-KUm7oeoJqWis4tRLLu8dtuEQ&usqp=CAU'"
      class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
    >
  </div>
</template>
