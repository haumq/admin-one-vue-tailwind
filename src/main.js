import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import directives from "./directives";
import { useMainStore } from '@/stores/main.js'
import { useStyleStore } from '@/stores/style.js'
import { useLayoutStore } from '@/stores/layout.js'
import { darkModeKey, styleKey } from '@/config.js'
import menu from '@/menu.js'

import './css/main.css'

//
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU",
  authDomain: "ornate-axiom-330401.firebaseapp.com",
  databaseURL: "https://ornate-axiom-330401-default-rtdb.firebaseio.com",
  projectId: "ornate-axiom-330401",
  storageBucket: "ornate-axiom-330401.appspot.com",
  messagingSenderId: "961046440332",
  appId: "1:961046440332:web:d365531092c97bbc424ea9",
  measurementId: "G-CQY5Y97T3K"
};

// Initialize Firebase
const FirebseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebseApp);

/* Init Pinia */
const pinia = createPinia()
/* Init Directives*/
// directives(App);

/* Create Vue app */
createApp(App).use(router).use(pinia).mount('#app')

/* Init Pinia stores */
const mainStore = useMainStore(pinia)
const styleStore = useStyleStore(pinia)
const layoutStore = useLayoutStore(pinia)

/* Axios */
import axios from 'axios'

axios.interceptors.request.use(config => {
    mainStore.apiLoading = true;
    return config;
});
axios.interceptors.response.use(
        response => {
            mainStore.apiLoading = false;
            return Promise.resolve(response);
        },
        error => {
            mainStore.apiLoading = false;
            return Promise.reject(error);
        }
    );

/* Set Menu*/
const menuCustom = layoutStore.isBetaVersion ? menu : menu.filter(item => item.to != '/queue')
layoutStore.setMenu(menuCustom)

/* Fetch sample data */
// mainStore.fetch('clients')
// mainStore.fetch('history')
mainStore.fetchData()

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  styleStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'Phát bằng - Vue 3 Tailwind'

/* Collapse mobile aside menu on route change */
router.beforeEach(() => {
  layoutStore.isAsideMobileExpanded = false
  layoutStore.isAsideLgActive = false
})

router.afterEach(to => {
  /* Set document title from route meta */
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
