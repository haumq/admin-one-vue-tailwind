import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    show: false,
    toastList: [],
    defaults :{
      title: "undefined title",
      body: "undefined body",
      timeout: 5,
    },

  }),

  actions: {
    add (params) {
      for (let key in this.defaults) {
        if (params[key] === undefined) {
          params[key] = this.defaults[key];
        }
      }

      params.created = Date.now();
      params.id = Math.random();

      if(this.toastList.length > 0){
        params.timeout += this.toastList.length*1
      }
      params.expire = setTimeout(() => {
          this.remove(params.id);
      }, params.timeout * 1000);
      this.toastList.push(params)
    },
    remove (id) {
      this.toastList.splice(this.index(id), 1);
    },
    index (id) {
      for (let key in this.toastList) {
        if (id === this.toastList[key].id) {
          return key;
        }
      }
    },
    type (type) {
      switch (type) {
        case "error":
          return "is-danger";
        case "success":
          return "is-success";
        case "info":
          return "is-info";
      }
    }
  }
})
