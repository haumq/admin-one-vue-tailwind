import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    transferToWaitListRow: null,
    searchKey: '',

    urlApi: 'https://script.google.com/macros/s/AKfycbwR4DSX3Y3-1C7Xis1uzBYuvgo4jn1HZ_f7WwRnd9bBD1GskKaEkm7CiH9mGdzCN13P/exec',
    keyApi: '?key=AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU',
    apiLoading: false,
    apiSpiner: false,
    apiSuccessful: false,
    apiFail: false,

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
    setSearchKey(payload){
      this.searchKey = payload
    },
    setSearchKeyEmpty(){
      this.searchKey = ''
    },
    callNameStudentSound (payload) {
      // alert("test");
      //  let text = ``
        const utt = new SpeechSynthesisUtterance(payload);
        // utt.lang='vi';
        // utt.pitch = 0.7;  // a little lower
        utt.pitch = 1.2;  // a little lower
        // utt.rate = 1.4;   // a little faster
        utt.rate = 0.7;   // a little faster
        utt.volume = 0.8; // a little quieter
        speechSynthesis.speak(utt);
        // console.log(text);
    },
    setTransferToWaitList(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = 1;
    },
    setTransferToProcessList(payload, user){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = 2;
      this.students[payload - 2].NguoiXuLy = user;
    },
    setTransferToFinishList(payload, user){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = 3;
      this.students[payload - 2].NguoiXuLy = user;
      this.students[payload - 2].ThoiGianNhanBang = new Date();
    },
    setTransferToLastQueue(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = 1;
      this.students[payload - 2].NguoiXuLy = '';
      this.students[payload - 2].NgayTao = new Date();
    },
    setTransferToOldPositionQueue(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = 1;
      this.students[payload - 2].NguoiXuLy = '';
    },
    setRemoveFromQueue(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = '';
      this.students[payload - 2].NguoiXuLy = '';
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
      // let urlFetch= 'https://script.google.com/macros/s/AKfycbwR4DSX3Y3-1C7Xis1uzBYuvgo4jn1HZ_f7WwRnd9bBD1GskKaEkm7CiH9mGdzCN13P/exec?key=AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU'
      // let u = 'https://api.coindesk.com/v1/bpi/currentprice.json'
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
      let url = this.urlApi + this.keyApi + '&post=transfertowaitlist'
      // console.log(url)
      let data = {
        row: payload
      }
      axios
        .post(url, data, {headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },})
        .then(r => {
          // if (r.data && r.data.data) {
          //   this.students[r.data.data[0].STT - 1] = r.data.data[0]
          //   // console.log(r.data.data)
          // }
          // console.log(r.data.data[0].STT)
          // console.log(this.students[payload.row-2])
          // this.students[payload.row-2] = r.data.data[0];
          // this.students[payload.row-2].TrangThai = 1;
          // this.students[payload.row-2].NgayTao = new Date();
          // console.log(this.students[1])
          // this.students
          if(r.data && r.data.data){
            // console.log(payload)
            this.setTransferToWaitList(payload);
            this.apiSuccessful = true;
          }

        })
        .catch(error => {
          this.apiFail = true;
          console.log(error.message)
        })
    },
    transferToProcess(payload) {
      let url = this.urlApi + this.keyApi + '&post=transfertoprocessing'
      let data = {
        row: payload,
        user: this.userEmail
      }
      axios
        .post(url, data, {headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },})
        .then(r => {
          // this.students[payload.row-2].TrangThai = 1;
          if(r.data && r.data.data){
            // console.log(payload)
            this.setTransferToProcessList(payload, this.userEmail);
            this.apiSuccessful = true;
          }
        })
        .catch(error => {
          this.apiFail = true;
          console.log(error.message)
        })
    },
    transferToFisnish(payload) {
      let url = this.urlApi + this.keyApi + '&post=transfertofinish'
      let data = {
        row: payload,
        user: this.userEmail
      }
      axios
      .post(url, data, {headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },})
      .then(r => {
          // console.log("finish")
          // this.students[payload.row-2].TrangThai = 1;
          if(r.data && r.data.data){
            // console.log(r)
            this.setTransferToFinishList(payload, this.userEmail);
            this.apiSuccessful = true;
          }
        })
        .catch(error => {
          this.apiFail = true;
          console.log(error.message)
        })
    },
    transferToLastQueue(payload) {
      let url = this.urlApi + this.keyApi + '&post=transfertoLastqueue'
      let data = {
        row: payload,
        user: this.userEmail
      }
      axios
      .post(url, data, {headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },})
      .then(r => {
          // console.log("finish")
          // this.students[payload.row-2].TrangThai = 1;
          if(r.data && r.data.data){
            // console.log(r)
            this.setTransferToLastQueue(payload, this.userEmail);
            this.apiSuccessful = true;
          }
        })
        .catch(error => {
          this.apiFail = true;
          console.log(error.message)
        })
    },
    transferToOldPositionQueue(payload) {
      let url = this.urlApi + this.keyApi + '&post=transfertooldpositionqueue'
      let data = {
        row: payload,
        user: this.userEmail
      }
      axios
      .post(url, data, {headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },})
      .then(r => {
          // console.log("finish")
          // this.students[payload.row-2].TrangThai = 1;
          if(r.data && r.data.data){
            // console.log(r)
            this.setTransferToOldPositionQueue(payload);
            this.apiSuccessful = true;
          }
        })
        .catch(error => {
          this.apiFail = true;
          console.log(error.message)
        })
    },
    removeFromQueue(payload) {
      let url = this.urlApi + this.keyApi + '&post=removefromqueue'
      let data = {
        row: payload,
        user: this.userEmail
      }
      axios
      .post(url, data, {headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },})
      .then(r => {
          // console.log("finish")
          // this.students[payload.row-2].TrangThai = 1;
          if(r.data && r.data.data){
            // console.log(r)
            this.setRemoveFromQueue(payload);
            this.apiSuccessful = true;
          }
        })
        .catch(error => {
          this.apiFail = true;
          console.log(error.message)
        })
    },
  }
})
