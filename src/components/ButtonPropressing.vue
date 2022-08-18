<script setup>
import { computed } from 'vue'

</script>

<template>
  <button type="button" class="btn-processing pulse focus:outline-none text-white bg-green-500 hover:bg-green-600 dark:bg-green-900 font-medium rounded-lg text-sm px-2.5 py-2 mr-2 mb-2">
    <span class="loading text-left">Đang xử lý </span>
</button>
</template>
<style scoped>


.loading:after {
  content: "...";
  overflow: hidden;
  display: inline-block;
  letter-spacing: 2px;
  vertical-align: bottom;
  animation: ellipsis-dot 2s infinite .3s;
  animation-fill-mode: forwards;
  width: 1.25em;
}

@keyframes ellipsis-dot {
  25% {
    content: "";
  }
  50% {
    content: ".";
  }
  75% {
    content: "..";
  }
  100% {
    content: "...";
  }
}
/* rgb(5,150,105) */
.pulse {
  cursor: pointer;
  box-shadow: 0 0 0 rgba(5,150,105, 0.4);
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(5,150,105, 0.4);
  }
  70% {
      -webkit-box-shadow: 0 0 0 10px rgba(5,150,105, 0);
  }
  100% {
      -webkit-box-shadow: 0 0 0 0 rgba(5,150,105, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(5,150,105, 0.4);
    box-shadow: 0 0 0 0 rgba(5,150,105, 0.4);
  }
  70% {
      -moz-box-shadow: 0 0 0 20px rgba(5,150,105, 0);
      box-shadow: 0 0 0 20px rgba(5,150,105, 0);
  }
  100% {
      -moz-box-shadow: 0 0 0 0 rgba(5,150,105, 0);
      box-shadow: 0 0 0 0 rgba(5,150,105, 0);
  }
}


</style>
