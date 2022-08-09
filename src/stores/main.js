import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
    students: []
  }),
  actions: {
    setUser (payload) {
      if (payload.name) {
        this.userName = payload.name
      }
      if (payload.email) {
        this.userEmail = payload.email
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar
      }
    },

    fetch (sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then(r => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data
          }
        })
        .catch(error => {
          alert(error.message)
        })
    },
    fetchData () {
      let urlFetch= 'https://script.google.com/macros/s/AKfycbwR4DSX3Y3-1C7Xis1uzBYuvgo4jn1HZ_f7WwRnd9bBD1GskKaEkm7CiH9mGdzCN13P/exec?key=AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU'
      let u = 'https://api.coindesk.com/v1/bpi/currentprice.json'
      axios
        .get(urlFetch)
        .then(r => {
          if (r.data && r.data.data) {
            this.students = r.data.data
          }
          console.log(r.data)
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }
})
