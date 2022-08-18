<template>

</template>

<script setup>
import { useMainStore } from '@/stores/main.js'
import { useToastStore } from '@/stores/toast.js'
import { computed } from 'vue';
import { getDatabase, ref, onValue, onChildChanged } from "firebase/database";
const mainStore = useMainStore()
const toastStore = useToastStore()

const db = getDatabase();
const changeDataList = ref(db, 'changeDataList');
const changeWaitList = ref(db, 'changeWaitList');
const changeProcessingList = ref(db, 'changeProcessingList');
const changeFinishList = ref(db, 'changeFinishList');
// const a = ref('changed')
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//  console.log(data);
// });
onChildChanged(changeDataList, (snapshot) => {
    const data = snapshot.val();
    mainStore.fetchData()
    toastStore.add({ title: 'title', body: 'Data có sự thay đổi dữ liệu!', timeout: 10 });
  });
onChildChanged(changeWaitList, (snapshot) => {
  // console.log("refresh page");
  const data = snapshot.val();
  // let text = 'dòng '+data+' số thứ tự ' + (data - 1) +' thêm vào hàng đợi'
  // const utt = new SpeechSynthesisUtterance(text);
  // speechSynthesis.speak(utt);
  // console.log(text);
  // mainStore.fetchData();
  mainStore.setTransferToWaitList(data);
    const currentStudent = mainStore.students.filter(item => (item.Row === data));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' được thêm vào hàng chờ!', timeout: 5 });
});
onChildChanged(changeProcessingList, (snapshot) => {
    let data = {};
    onValue(changeProcessingList, (val) => {
      data = val.val();
    });
  mainStore.setTransferToProcessList(data.row, data.user);
  if(data.user && data.user != mainStore.userEmail) {
    const currentStudent = mainStore.students.filter(item => (item.Row === data.row));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' đang được xử lý! @'+data.user, timeout: 5 });
  }
});
onChildChanged(changeFinishList, (snapshot) => {
    let data = {};
    onValue(changeFinishList, (val) => {
      data = val.val();
    });
  mainStore.setTransferToFinishList(data.row, data.user);
  if(data.user && data.user != mainStore.userEmail) {
    const currentStudent = mainStore.students.filter(item => (item.Row === data.row));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' hoàn tất nhận bằng! @'+data.user, timeout: 5 });
  }
});
onChildChanged(changeLastQueue, (snapshot) => {
  const data = snapshot.val();
  mainStore.setTransferToLastQueue(data);
    const currentStudent = mainStore.students.filter(item => (item.Row === data));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' qua lượt xử lý, xếp cuối hàng đợi!', timeout: 5 });
});
onChildChanged(changeOldPositionQueue, (snapshot) => {
  const data = snapshot.val();
  mainStore.setTransferToOldPositionQueue(data);
    const currentStudent = mainStore.students.filter(item => (item.Row === data));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' ngưng xử lý, trả về trại thái chờ!', timeout: 5 });
});
onChildChanged(changeRemoveFromQueue, (snapshot) => {
  const data = snapshot.val();
  mainStore.setRemoveFromQueue(data);
    const currentStudent = mainStore.students.filter(item => (item.Row === data));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' bị rút khỏi danh sách chờ!', timeout: 5 });
});
</script>

<style>

</style>
