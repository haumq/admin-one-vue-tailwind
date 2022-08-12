import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isAsideMobileExpanded: false,
    isAsideLgActive: false,
    isAsideMinimun: false
  }),

  actions: {
    asideMobileToggle () {
      this.isAsideMobileExpanded = !this.isAsideMobileExpanded
    },
    asideMinimunToggle () {
      this.isAsideMinimun = !this.isAsideMinimun
    },
  }
})
