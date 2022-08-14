<template>
  
</template>

<script setup>
import { useMainStore } from '@/stores/main.js'
import { getDatabase, ref, onValue, onChildChanged } from "firebase/database";
const mainStore = useMainStore()

const db = getDatabase();
const starCountRef = ref(db, 'changeWaitList');
// const a = ref('changed')
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//  console.log(data);
// });
onChildChanged(starCountRef, (snapshot) => {
  // console.log("refresh page");
  const data = snapshot.val();
  let text = 'dòng '+data+' số thứ tự ' + (data - 1) +' thêm vào hàng đợi' 
  // const utt = new SpeechSynthesisUtterance(text);
  // speechSynthesis.speak(utt);
  console.log(text);
  // mainStore.fetchData();
  mainStore.setTransferToWaitList(data);
});
</script>

<style>

</style>