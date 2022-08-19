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
    z-index: 100;
    top: 0;
    left: 0;
  }

  .alert-modal {
    width: 350px;
    background-color: rgb(255, 255, 255);
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


  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: rgb(34 197 94 0.5);
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
  }

  .checkmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 3;
    stroke: rgb(34 197 94);
    stroke-miterlimit: 10;
    margin: 2% auto;
    box-shadow: inset 0px 0px 0px #dcfce7;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 1s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
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
  <!-- <p>Successfull <button id="btn-toggle" type="button">SUCCESSFULL</button></p>
  </p> -->
  <!-- <img src="https://image.thanhnien.vn/w660/Uploaded/2022/pwivoviu/2020_08_24/01_esvt.jpg" alt="" width="500" height="600"> -->

  <div class="alert-background" id="modal-conform" style="display: none;">
    <!-- <div class="alert-background" id="modal-successfull"> -->
    <div class="alert-modal">
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
      <h3 class="alert-main">Conform</h3>
      <p class="alert-des">Are you sure?</p>
      <button id="btn-conform" class="btn-ok">YES, I'M SURE</button>
      <button id="btn-cancel" class="btn-ok">CANCEL</button>

    </div>
  </div>

  <div class="alert-background" id="modal-successfull" style="display: none;">
    <!-- <div class="alert-background" id="modal-successfull"> -->
    <div class="alert-modal">
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
      <h3 class="alert-main">Successfull</h3>
      <p class="alert-des">Data has been Successfull inserted.</p>
      <button id="ok-btn" class="btn-ok">OK</button>

    </div>
  </div>

  <div class="alert-background" id="modal-error" onclick="hideAlertError()" style="display: none;">
    <!-- <div class="alert-background" id="modal-error"> -->
    <div class="alert-modal">
      <svg class="erorrmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="erorrmark__circle" cx="26" cy="26" r="25" fill="none" />
        <line class="erorrmark__xline1" fill="none" x1="14" y1="38" x2="38" y2="14" />
        <line class="erorrmark__xline2" fill="none" x1="38" y1="38" x2="14" y2="14" />
      </svg>
      <h3 class="alert-main">Error!!!</h3>
      <p id="error-message" class="alert-des">Data has been Error inserted.</p>
      <button class="btn-okerror" onclick="hideAlertError()">OK</button>

    </div>
  </div>
  <!-- <div class="alert-background" id="modal-loader" style="display: none;"> -->
  <div class="alert-background" id="modal-loader">
    <div class="alert-modal">

      <!-- Loader -->

      <svg version="1.1" style="width:120px; margin: 20px auto" id="L1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100"
        enable-background="new 0 0 100 100" xml:space="preserve">
        <circle fill="none" stroke="var(--loader-color)" stroke-width="6" stroke-miterlimit="15"
          stroke-dasharray="14.2472,14.2472" cx="50" cy="50" r="47">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50"
            to="360 50 50" repeatCount="indefinite" />
        </circle>
        <circle fill="none" stroke="var(--loader-color)" stroke-width="1" stroke-miterlimit="10"
          stroke-dasharray="10,10" cx="50" cy="50" r="39">
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="5s" from="0 50 50"
            to="-360 50 50" repeatCount="indefinite" />
        </circle>
        <g fill="var(--loader-color)">
          <rect x="30" y="35" width="5" height="30">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite" begin="0.1" />
          </rect>
          <rect x="40" y="35" width="5" height="30">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite" begin="0.2" />
          </rect>
          <rect x="50" y="35" width="5" height="30">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite" begin="0.3" />
          </rect>
          <rect x="60" y="35" width="5" height="30">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite" begin="0.4" />
          </rect>
          <rect x="70" y="35" width="5" height="30">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite" begin="0.5" />
          </rect>
        </g>
      </svg>
      <h3 class="text-gray-900">LOADING...</h3>
      <!-- <p class="alert-des">Data has been Error inserted.</p> -->
      <!-- <button class="btn-okerror" onclick="hideAlertError()">OK</button> -->

    </div>
  </div>

</template>
<script scoped>
const props = defineProps({
  label: {
    type: [String, Number],
    default: null
  },
  icon: {
    type: String,
    default: null
  }
}
</script>

