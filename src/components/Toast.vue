<template>
  <section
    class="
      fixed
      bottom-1
      z-40
      w-max
      left-1/2
      -translate-x-2/4
      md:top-16 md:bottom-auto md:left-auto md:translate-x-0 md:right-10
    "
  >
    <Transition name="slide-fade">
      <div
        v-if="show"
        id="toast-success"
        class="
          flex
          items-center
          p-4
          mb-4
          w-full
          max-w-xs
          text-gray-500
          bg-white
          bg-opacity-95
          rounded-lg
          shadow-lg
          dark:text-gray-400 dark:bg-gray-800 dark:bg-opacity-95
        "
        role="alert"
      >
        <div
          class="
            inline-flex
            flex-shrink-0
            justify-center
            items-center
            w-8
            h-8
            text-green-500
            bg-green-100
            rounded-lg
            dark:bg-green-800 dark:text-green-200
          "
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Item moved successfully Item moved successfully  2.</div>
        <button
          type="button"
          class="
            ml-auto
            -mx-1.5
            -my-1.5
            bg-white
            text-gray-400
            hover:text-gray-900
            rounded-lg
            focus:ring-2 focus:ring-gray-300
            p-1.5
            hover:bg-gray-100
            inline-flex
            h-8
            w-8
            dark:text-gray-500
            dark:hover:text-white
            dark:bg-gray-800
            dark:hover:bg-gray-700
          "
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div
        v-if="show"
        id="toast-success"
        class="
          flex
          items-center
          p-4
          mb-4
          w-full
          max-w-xs
          text-gray-500
          bg-white
          rounded-lg
          shadow
          dark:text-gray-400 dark:bg-gray-800
        "
        role="alert"
      >
        <div
          class="
            inline-flex
            flex-shrink-0
            justify-center
            items-center
            w-8
            h-8
            text-green-500
            bg-green-100
            rounded-lg
            dark:bg-green-800 dark:text-green-200
          "
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Item moved successfully.</div>
        <button
          type="button"
          class="
            ml-auto
            -mx-1.5
            -my-1.5
            bg-white
            text-gray-400
            hover:text-gray-900
            rounded-lg
            focus:ring-2 focus:ring-gray-300
            p-1.5
            hover:bg-gray-100
            inline-flex
            h-8
            w-8
            dark:text-gray-500
            dark:hover:text-white
            dark:bg-gray-800
            dark:hover:bg-gray-700
          "
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </Transition>
    <button @click="show = !show">Toggle</button>
    <button @click="this.add({ title: 'title', body: 'this is a toast', timeout: 1 })">Toggle 2</button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
const show = ref(false);
const add = function (params) {
  for (let key in this.defaults) {
    if (params[key] === undefined) {
      params[key] = this.defaults[key];
    }
  }

  params.created = Date.now();
  params.id = Math.random();
  params.expire = setTimeout(() => {
    this.remove(params.id);
  }, params.timeout * 1000);

  this.content.unshift(params);
};

const remove = function (id) {
  this.content.splice(this.index(id), 1);
};
const index = function (id) {
  for (let key in this.content) {
    if (id === this.content[key].id) {
      return key;
    }
  }
};

const type = function (type) {
  switch (type) {
    case "error":
      return "is-danger";
    case "success":
      return "is-success";
    case "info":
      return "is-info";
  }
};

const defaults = {
  title: "undefined title",
  body: "undefined body",
  timeout: 5,
};
const content = [];
const a = { title: "title", body: "body", type: "info", timeout: 3 };

//   created () {
//     this.add({ title: 'title', body: 'this is a toast', timeout: 1 })
//     this.add({ title: 'error title', type: 'error', body: 'this is an error', timeout: 2 })
//     this.add({ title: 'succcess title', type: 'success', body: 'this is a success', timeout: 3 })
//     this.add({ title: 'info title', type: 'info', body: 'this is information', timeout: 4 })
//   }
</script>

<style scoped>
.toast {
  position: fixed;
  /* top: 3.5rem;
    right: 2rem; */
  z-index: 99999;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;

}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(100px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>