<script setup>
import { useLayoutStore } from '@/stores/layout.js'
import { useStyleStore } from '@/stores/style.js'
import { watchEffect, computed } from 'vue'
import { storeToRefs } from 'pinia'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import Toast from '@/components/Toast.vue'

const styleStore = useStyleStore()

const layoutStore = useLayoutStore()

// const { isBetaVersion } = storeToRefs(layoutStore)
// console.log(isBetaVersion.value )

const overlayClick = () => {
  layoutStore.isAsideLgActive = false
}
// const menuCustom = isBetaVersion.value ? menu : menu.filter(item => item.to != '/queue')

</script>

<template>
  <div :class="{ 'dark': styleStore.darkMode, 'overflow-hidden lg:overflow-visible': layoutStore.isAsideMobileExpanded }">
    <div
      :class="{ 'ml-60 lg:ml-0': layoutStore.isAsideMobileExpanded }"
      class="pt-14 xl:pl-60 w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100 min-h-screen"
    >
      <NavBar />
      <AsideMenu :menu="layoutStore.menu" />
      <slot />
      <!-- <FooterBar /> -->
      <OverlayLayer
        v-show="layoutStore.isAsideLgActive"
        z-index="z-30"
        @overlay-click="overlayClick"
      />
      <Toast />
    </div>
  </div>
</template>
