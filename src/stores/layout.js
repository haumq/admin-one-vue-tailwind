import { defineStore } from 'pinia'
import menu from '@/menu.js'
import router from '../router'
import { useToastStore } from './toast'


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
      this.setMenu()
      const toastStore = useToastStore()
      toastStore.add({ title: 'title', body: `Đã chuyển sang phiên bản ${this.isBetaVersion ? 'Beta' : 'Alpha'}`, timeout: 4 });
      this.isBetaVersion ? router.push({ name: 'queue' }) : router.push({ name: 'wait' })
    },
    setMenu(){
      const menuCustom = this.isBetaVersion ? menu.filter(item => item.to != '/wait') : menu.filter(item => item.to != '/queue')
      // this.setMenu(menuCustom)
      this.menu = menuCustom
      
    },

  }
})
