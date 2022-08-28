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
const changeLastQueue = ref(db, 'changeLastQueue');
const changeOldPositionQueue = ref(db, 'changeOldPositionQueue');
const changeRemoveFromQueue = ref(db, 'changeRemoveFromQueue');
const changeArmyFinish = ref(db, 'changeArmyFinish');
const changeArmyNotReceived = ref(db, 'changeArmyNotReceived');
const changeEditColumnNotEnough = ref(db, 'changeEditColumnNotEnough');
const changeEditColumnVestments = ref(db, 'changeEditColumnVestments');
const changeSurvey = ref(db, 'changeSurvey');

// const a = ref('changed')
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//  console.log(data);
// });
onChildChanged(changeDataList, (snapshot) => {
    const data = snapshot.val();
    mainStore.fetchData()
    toastStore.add({ title: 'title', body: 'Data dữ liệu có sự thay đổi, đã cập nhật!', timeout: 10 });
  });
onChildChanged(changeWaitList, (snapshot) => {
  // console.log("refresh page");
  const data = snapshot.val();
  // let text = 'dòng '+data+' số thứ tự ' + (data - 1) +' thêm vào hàng đợi'
  // const utt = new SpeechSynthesisUtterance(text);
  // speechSynthesis.speak(utt);
  // console.log(text);
  // mainStore.fetchData();
    const currentStudent = mainStore.students.filter(item => (item.Row === data));
    if(data && currentStudent.TrangThai != 1) {
    mainStore.setTransferToWaitList(data);
    // mainStore.setApiSuccessful()
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' được thêm vào hàng chờ!', timeout: 5 });
    }
});
onChildChanged(changeProcessingList, (snapshot) => {
    let data;
    onValue(changeProcessingList, (val) => {
      data = val.val();
    });
  mainStore.setTransferToProcessList(data.row, data.user);
  // if(data.user && data.user != mainStore.userEmail) {
    const currentStudent = mainStore.students.filter(item => (item.Row === data.row));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' đang được xử lý! @'+data.user, timeout: 5 });
  // }
});
onChildChanged(changeFinishList, (snapshot) => {
    let data;
    onValue(changeFinishList, (val) => {
      data = val.val();
    });
  mainStore.setTransferToFinishList(data.row, data.user);
  // if(data.user && data.user != mainStore.userEmail) {
    const currentStudent = mainStore.students.filter(item => (item.Row === data.row));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' hoàn tất nhận bằng! @'+data.user, timeout: 5 });
  // }
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
onChildChanged(changeArmyFinish, (snapshot) => {
  const data = snapshot.val();
  mainStore.setTransferToArmyFinish(data);
    const currentStudent = mainStore.students.filter(item => (item.Row === data));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' đã nhận chứng chỉ GDQP!', timeout: 5 });
});
onChildChanged(changeArmyNotReceived, (snapshot) => {
  const data = snapshot.val();
  mainStore.setTransferToArmyNotReceived(data);
    const currentStudent = mainStore.students.filter(item => (item.Row === data));
    toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' KHÔNG nhận chứng chỉ GDQP!', timeout: 5 });
});
onChildChanged(changeEditColumnNotEnough, (snapshot) => {
    let data;
    onValue(changeEditColumnNotEnough, (val) => {
      data = val.val();
    });
  mainStore.setEditColumnNotEnough(data.row, data.data);
  // if(data.user && data.user != mainStore.userEmail) {
    const currentStudent = mainStore.students.filter(item => (item.Row === data.row));
    if(data.data == ''){
      toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' đã bổ sung đủ hồ sơ, học phí!', timeout: 5 });
    }else{
      toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' đã được cập nhật!', timeout: 5 });
    }
  // }
});
onChildChanged(changeSurvey, (snapshot) => {
  mainStore.fetchData()
      toastStore.add({ title: 'title', body: '+1 sinh viên gửi khảo sát thành công', timeout: 3 });
});
onChildChanged(changeEditColumnVestments, (snapshot) => {
  let data;
    onValue(changeEditColumnVestments, (val) => {
      data = val.val();
    });
    const currentStudent = mainStore.students.filter(item => (item.Row === data.row));
    mainStore.setEditColumnVestments(data.row, data.data)
    if(data.data == 1){
      toastStore.add({ title: 'title', body: 'Sinh viên '+ currentStudent[0].HoTen +' đã trả lễ phục!', timeout: 5 });
    }else{
      toastStore.add({ title: 'title', body: 'Cập nhật lại mục lễ phục của sinh viên '+ currentStudent[0].HoTen +'!', timeout: 5 });
    }
});
</script>

<style>

</style>
