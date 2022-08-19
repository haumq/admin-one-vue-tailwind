import { defineStore } from 'pinia'
import menu from '@/menu.js'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isAsideMobileExpanded: false,
    isAsideLgActive: false,
    isAsideMinimun: false,
    isBetaVersion: window.localStorage.getItem("isBetaVersion") || false,
    /* Menu */
    menu: [],
  }),

  actions: {
    asideMobileToggle () {
      this.isAsideMobileExpanded = !this.isAsideMobileExpanded
    },
    asideMinimunToggle () {
      this.isAsideMinimun = !this.isAsideMinimun
    },
    betaVersionTogggle () {
      this.isBetaVersion = !this.isBetaVersion
      // window.localStorage.setItem('isBetaVersion', this.isBetaVersion)
      // localStorage.isBetaVersion = this.isBetaVersion
      // console.log(window.localStorage.getItem("isBetaVersion"))
      this.isBetaVersion ? window.localStorage.setItem('isBetaVersion', true) : window.localStorage.removeItem('isBetaVersion')
      const menuCustom = this.isBetaVersion ? menu : menu.filter(item => item.to != '/queue')
      this.setMenu(menuCustom)
    },
    setMenu(payload){
      this.menu = payload
    },

  }
})
