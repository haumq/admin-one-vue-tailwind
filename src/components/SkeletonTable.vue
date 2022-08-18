<template :buttonSkeleton="buttonSkeleton">
      <!-- <thead role="status"
    class="mt-6 space-y-4 w-full rounded divide-y divide-gray-100 shadow-lg animate-pulse dark:divide-gray-700 md:hidden" >
      <tr >
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th class="lg:hidden"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th class="lg:hidden"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
        <th><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></th>
      </tr>
    </thead > -->
      <tbody role="status"
    class="mt-6 space-y-4 w-full rounded divide-y divide-gray-100 shadow-lg animate-pulse dark:divide-gray-700">
       <tr v-for="i in total" :key="i">
        <td data-label="STT"><div class="h-5 w-4 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div></td>
        <td data-label="MSSV"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></td>
        <td data-label="Tên"><div>
        <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-52 mb-2.5"></div>
        <div class="hidden lg:block h-4 w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="hidden lg:block h-4 w-36 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      </div></td>
        <td data-label="Ngày Sinh" class="lg:hidden"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></td>
        <td data-label="Ngành" class="lg:hidden"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></td>
        <td data-label="Số Vào Sổ"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div></td>
        <td data-label="GDQP"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div></td>
        <td data-label="Thiếu HS, HP"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-24"></div></td>
        <td data-label="Khảo sát"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></td>
        <td data-label="Lễ Phục"><div class="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-20"></div></td>
        <td v-if="i == 1"><div class="h-8 lg:mx-auto bg-gray-300 rounded-lg dark:bg-gray-700 w-24"></div></td>
        <td class="flex flex-row justify-end" v-else-if="buttonSkeleton == 'queue'">
        <!-- <div > -->
            <div class="h-8 w-8 m-1.5 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div class="h-8 w-8 m-1.5 bg-gray-300 rounded-md dark:bg-gray-700"></div>
        <!-- </div>           -->
        </td>
        <td v-else><div class="h-8 lg:mx-auto bg-gray-300 rounded-lg dark:bg-gray-700 w-24"></div></td>
        <!-- <th /> -->
        </tr>
      </tbody>
</template>
<script setup>
  import { computed, ref } from "vue";
  const props = defineProps({
  buttonSkeleton: {
    type: String,
    default: 'search'
  }
  })

  const total = ref(10)
</script>
