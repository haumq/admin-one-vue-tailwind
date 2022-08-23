import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* User */
    userName: 'User Name',
    userEmail: 'user@uef.edu.vn',
    userAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_9NHFRLJL-KUm7oeoJqWis4tRLLu8dtuEQ&usqp=CAU',
    isAuthenticated: false,
    Area: 0,
    dataFrom: 0,
    dataTo: 0,
    transferToWaitListRow: null,
    searchKey: '',


    urlApi: 'https://script.google.com/macros/s/AKfycbwR4DSX3Y3-1C7Xis1uzBYuvgo4jn1HZ_f7WwRnd9bBD1GskKaEkm7CiH9mGdzCN13P/exec',
    keyApi: '?key=AIzaSyAEzVpmZDCzC2e5Iz6gJaF-EGLoWc-xfXU',
    apiLoading: false,
    apiSpiner: false,
    apiSuccessful: false,
    messageSuccessful: '',
    apiFail: false,
    messagefail: '',

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,
    isKeyQueueViewRegistered: false,
    isKeyWaitViewRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
    students: [],

  }),
  actions: {
    setDataWithUser (payload) {
      if (payload.SoQuay) {
        this.Area = payload.SoQuay
      }
      if (payload.Tu) {
        this.dataFrom = payload.Tu
      }
      if (payload.Den) {
        this.dataTo = payload.Den
      }
    },
    setUser (payload) {
      if (payload.displayName) {
        this.userName = payload.displayName
      }
      if (payload.email) {
        this.userEmail = payload.email
      }
      if (payload.photoURL) {
        this.userAvatar = payload.photoURL
      }
    },
    setSearchKey(payload){
      this.menu = payload
    },
    setSearchKeyEmpty(){
      this.searchKey = ''
    },
    setApiSuccessful(){
      this.apiSuccessful = true;
      setTimeout(() => {
        this.apiSuccessful = false;
      }, 2000);
    },
    setMessageSuccessful(payload){
      this.messageSuccessful = payload;
    },
    setApiFail(){
      this.apiFail = true;
      setTimeout(() => {
        this.apiFail = false;
      }, 3000);
    },
    setMessageFail(payload){
      this.messageFail = payload;
    },
    setApiSpinerShow(){
      this.apiSpiner = true;
    },
    setApiSpinerHide(){
      this.apiSpiner = false;
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
    setTransferToProcessList(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = 2;
      this.students[payload - 2].NguoiXuLy = this.userEmail;
      this.students[payload - 2].ThoiGianNhanBang = new Date();
    },
    setTransferToFinishList(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].TrangThai = 3;
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
    setTransfermultitoprocess(payload){
      for(let i = 0; payload.lenght; i++){
        this.students[i - 2].TrangThai = 2;
        this.students[i - 2].NguoiXuLy = this.userEmail;
        this.students[i - 2].ThoiGianNhanBang = new Date();
      }
    },
    setTransfermultitofinish(payload){
      for(let i = 0; payload.lenght; i++){
        this.students[i - 2].TrangThai = 3;
      }
    },
    setTransferToArmyFinish(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].NhanGDQP = 1;
      this.students[payload - 2].ThoiGianNhanGDQP = new Date();
    },
    setTransferToArmyNotReceived(payload){
      // this.transferToWaitListRow = payload;
      this.students[payload - 2].NhanGDQP = 0;
      this.students[payload - 2].ThoiGianNhanGDQP = new Date();
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
          // this.apiLoading = true
          if (r.data && r.data.data) {
            this.students = r.data.data
            // this.apiLoading = false
          }
          // console.log(r.data)
        })
        .catch(error => {
          console.log(error.message)
          this.setApiFail()
        })
    },
    getDataWithUser () {
      axios
        .get(this.urlApi + this.keyApi + `&getdatawithuser=${this.userEmail}`)
        .then(r => {

          if (r.data && r.data.data) {
            // this.students = r.data.data
            this.setDataWithUser(r.data.data[0])
            // console.log(r.data.data[0])
          }
          // console.log(r.data)
        })
        .catch(error => {
          console.log(error.message)
          this.setApiFail()
        })
    },
    transferToWait(payload) {
      this.setApiSpinerShow()
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
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }

        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferToProcess(payload) {
      this.setApiSpinerShow()
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
            this.setTransferToProcessList(payload);
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferToFisnish(payload) {
      this.setApiSpinerShow()
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
            this.setTransferToFinishList(payload);
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferToLastQueue(payload) {
      this.setApiSpinerShow()
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
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferToOldPositionQueue(payload) {
      this.setApiSpinerShow()
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
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    removeFromQueue(payload) {
      this.setApiSpinerShow()
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
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferMultiToProcess(payload) {
      this.setApiSpinerShow()
      let url = this.urlApi + this.keyApi + '&post=transfermultitoprocess'
      let data = {
        rows: payload,
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
            this.setTransfermultitofinish(payload);
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferMultiToFinish(payload) {
      this.setApiSpinerShow()
      let url = this.urlApi + this.keyApi + '&post=transfermultitofinish'
      let data = {
        rows: payload,
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
            this.setTransfermultitofinish(payload);
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferToArmyNotReceived(payload) {
      this.setApiSpinerShow()
      let url = this.urlApi + this.keyApi + '&post=transfertoarmynotreceived'
      let data = {
        row: payload,
      }
      axios
      .post(url, data, {headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },})
      .then(r => {
          if(r.data && r.data.data){
            // console.log(r)
            this.setTransferToArmyNotReceived(payload);
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
    transferToArmyFinish(payload) {
      this.setApiSpinerShow()
      let url = this.urlApi + this.keyApi + '&post=transfertoarmyfinish'
      let data = {
        row: payload,
      }
      axios
      .post(url, data, {headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },})
      .then(r => {
          if(r.data && r.data.data){
            // console.log(r)
            this.setTransferToArmyFinish(payload);
            this.setApiSpinerHide()
            this.setApiSuccessful()
          }
        })
        .catch(error => {
          this.setApiSpinerHide()
          this.setApiFail()
          console.log(error.message)
        })
    },
  }
})
