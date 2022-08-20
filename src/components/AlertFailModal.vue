<style scoped>
  :root {
    --loader-color: #1A56DB;
  }

  .alert-background {
    width: 100vw;
    height: 100vh;
    /* background-color: rgba(75, 85, 99, 0.5); */
    background-color: rgba(255, 255, 255, 0.5);
    position: fixed;
    z-index: 40;
    top: 0;
    left: 0;
  }

  .alert-modal {
    width: 350px;
    /* background-color: rgb(255, 255, 255); */
    position: absolute;
    /* margin: auto; */
    /* margin-top: 10%; */
    top: 20%;
    left: 50%;
    transform: translate(-50%);
    padding: 20px;
    border-radius: 5px;
    /* box-shadow: 1px 1px 3px rgb(255, 255, 255); */
    box-shadow: 1px 1px 20px 15px rgb(75, 85, 99, 0.1);
    text-align: center;
  }

  .alert-des {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: rgb(107, 114, 128);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .alert-main {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: rgb(17, 24, 39);
    font-weight: 500;
    line-height: 1.5rem;
  }

  .btn-ok {
    background-color: rgb(34 197 94);
    border: none;
    color: #fff;
    font-weight: 700;
    line-height: 2.5rem;
    border-radius: 5px;
    width: 90%;
    cursor: pointer;
    margin: 10px;
  }




  .erorrmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: rgb(200 30 30);
    fill: none;
    animation: strokeerror 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
  }

  .erorrmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 3;
    stroke: rgb(34 197 94);
    stroke-miterlimit: 10;
    margin: 2% auto;
    box-shadow: inset 0px 0px 0px #dcfce7;
    animation: fillerror .4s ease-in-out .4s forwards, scaleerror .3s ease-in-out .9s both
  }

  .erorrmark__xline1 {
    stroke-dasharray: 430;
    stroke-dashoffset: 800;
    stroke: rgb(200 30 30);
    stroke-width: 3;
    stroke-miterlimit: 10;
    animation: x .1s linear 0.8s forwards;
  }

  .erorrmark__xline2 {
    stroke-dasharray: 430;
    stroke-dashoffset: 800;
    stroke: rgb(200 30 30);
    stroke-width: 3;
    stroke-miterlimit: 10;
    animation: x .1s linear 1s forwards;
    /* animation-delay: 0.4s; */
  }

  .btn-okerror {
    background-color: rgb(200 30 30);
    border: none;
    color: #fff;
    font-weight: 700;
    line-height: 2.5rem;
    border-radius: 5px;
    width: 90%;
    cursor: pointer;
    margin: 10px;
  }


  @keyframes stroke {
    100% {
      stroke-dashoffset: 0
    }
  }

  @keyframes scale {

    0%,
    100% {
      transform: none
    }

    50% {
      transform: scale3d(1.1, 1.1, 1)
    }
  }

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #dcfce7
    }
  }





  @keyframes x {
    from {
      stroke-dasharray: 430;
    }

    to {
      stroke-dasharray: 400;
    }
  }

  @keyframes strokeerror {
    100% {
      stroke-dashoffset: 0
    }
  }

  @keyframes scaleerror {

    0%,
    100% {
      transform: none
    }

    50% {
      transform: scale3d(1.1, 1.1, 1)
    }
  }

  @keyframes fillerror {
    100% {
      box-shadow: inset 0px 0px 0px 30px rgb(253 232 232)
    }

    /* @media screen and (min-width:720px) {
      .alert-modal {
        width: 350px;
        background-color: #000
      } */
    }
</style>
<template>

  <div class="w-screen h-screen fixed top-0 left-0 bg-gray-50 bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-90 z-40" id="modal-successfull">
    <!-- <div class="alert-background" id="modal-successfull"> -->
    <div class="alert-modal bg-white dark:bg-gray-900 dark:bg-opacity-60">
      <svg class="erorrmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="erorrmark__circle" cx="26" cy="26" r="25" fill="none" />
        <line class="erorrmark__xline1" fill="none" x1="14" y1="38" x2="38" y2="14" />
        <line class="erorrmark__xline2" fill="none" x1="38" y1="38" x2="14" y2="14" />
      </svg>
      <h3 class="alert-main dark:text-white">Error!</h3>
      <p class="alert-des dark:text-gray-400">{{ props.message }} </p>
      <button class="btn-okerror">OK</button>

    </div>
  </div>





</template>
<script setup>
const props = defineProps({
  title: {
    type: [String, Number],
    default: null
  },
  message: {
    type: String,
    default: 'Data has been Fail!'
  }
})
</script>

