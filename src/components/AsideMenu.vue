<script setup>
import { mdiLogout, mdiClose, mdiBeta, mdiAlpha } from '@mdi/js'
import { computed, ref } from 'vue'
import { useLayoutStore } from '@/stores/layout.js'
import { useStyleStore } from '@/stores/style.js'
import AsideMenuList from '@/components/AsideMenuList.vue'
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from '@/components/OverlayLayer.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import { mdiEye, mdiTrashCan, mdiArrowRight, mdiChevronRight, mdiChevronLeft } from "@mdi/js";

defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['menu-click'])

const layoutStore = useLayoutStore()

const styleStore = useStyleStore()

const betaVersionTogggle = () => layoutStore.betaVersionTogggle()

const isModalActive = ref(false)

const logoutItem = computed(() => ({
  label: 'Version',
  icon: layoutStore.isBetaVersion ? mdiBeta : mdiAlpha,
  color: 'info'
}))

const logoutItemClick = () => {
  //
}

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

</script>

<template>
  <aside id="aside" class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden"
    :class="[layoutStore.isAsideMobileExpanded ? 'left-0' : '-left-60 lg:left-0', layoutStore.isAsideLgActive ? '' : 'lg:hidden xl:flex']">
    <div :class="styleStore.asideStyle" class="lg:rounded-xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
      <div :class="styleStore.asideBrandStyle"
        class="flex flex-row h-14 items-center justify-between dark:bg-slate-900">
        <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
          <b class="font-black">One</b>
        </div>
        <button class="hidden lg:inline-block xl:hidden p-3" @click.prevent="layoutStore.isAsideLgActive = false">
          <BaseIcon :path="mdiClose" />
        </button>
      </div>
      <div :class="styleStore.darkMode ? 'aside-scrollbars-[slate]' : styleStore.asideScrollbarsStyle"
        class="flex-1 overflow-y-auto overflow-x-hidden">
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuItem :item="logoutItem" @click="isModalActive = !isModalActive" />
      </ul>
    </div>
  </aside>

  <section>
    <OverlayLayer v-show="isModalActive" @click="isModalActive = !isModalActive">
      <div
        class="w-full max-w-sm z-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

        <div class="flex flex-col items-center pb-10 mt-10">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Đồng ý chuyển sang phiên bản {{ layoutStore.isBetaVersion ? 'Alpha' : 'Beta' }}?</h5>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <button
            @click="betaVersionTogggle"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
            <button
            @click="isModalActive = !isModalActive"
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Hủy</button>
          </div>
        </div>
      </div>
    </OverlayLayer>
  </section>
</template>
