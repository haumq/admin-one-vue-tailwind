<script setup>
import FormControl from '@/components/FormControl.vue'
import { useMainStore } from "@/stores/main";
import { computed, ref, watch, reactive } from "vue";
import { storeToRefs } from 'pinia'

const mainStore = useMainStore();
const { searchKey } = storeToRefs(mainStore)

// watch(searchKey, () => {
//   mainStore.setSearchKey(searchKey)
// , { deep: true }})

</script>

<template>
  <FormControl
    ref="root"
    v-model="searchKey"
    placeholder="Search (F2 hoặc Ctrl+k)"
    ctrl-k-focus
    transparent
    borderless
  />
</template>
