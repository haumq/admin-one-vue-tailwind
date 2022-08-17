import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    transferToWaitListRow: null,

    urlApi: 'https://script.google.com/macros/s/AKfycbwR4DSX3Y3-1C7Xis1uzBYuvgo4jn1HZ_f7WwRnd9bBD1GskKaEkm7CiH9mGdzCN13P/exec',
    keyApi: '?key=AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU',
    apiLoading: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,
    isKeyEnterRegistered: false,

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
    setTransferToWaitList(payload){
      this.transferToWaitListRow = payload;
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
        .get(this.urlApi + this.keyApi)
        .then(r => {
          if (r.data && r.data.data) {
            this.students = r.data.data
          }
          console.log(r.data)
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    transferToWait(payload) {
      // let urlFetch= 'https://script.google.com/macros/s/AKfycbwR4DSX3Y3-1C7Xis1uzBYuvgo4jn1HZ_f7WwRnd9bBD1GskKaEkm7CiH9mGdzCN13P/exec?key=AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU&post=transfertowaitlist'
      // let u = 'https://api.coindesk.com/v1/bpi/currentprice.json'
      let url = this.urlApi + this.keyApi + '&post=transfertowaitlist'
      console.log(url)
      
      axios
        .post(url, payload, {headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },})
        .then(r => {    
          // if (r.data && r.data.data) {
          //   this.students[r.data.data[0].STT - 1] = r.data.data[0]
          //   // console.log(r.data.data)
          // }      
          console.log(r.data.data[0].STT)
          console.log(this.students[payload.row-2])
          // this.students[payload.row-2] = r.data.data[0];
          this.students[payload.row-2].TrangThai = 1;
          // this.students[payload.row-2].NgayTao = new Date();
          // console.log(this.students[1])
          // this.students
 
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }
})
