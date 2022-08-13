<script setup>
import {
  mdiMonitorCellphone,
  mdiAccountMultiple,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSearchStudent from "@/components/TableSearchStudent.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useMainStore } from '@/stores/main.js'
import { onBeforeMount } from 'vue'
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
   

onBeforeMount(() => {  
  // mainStore.fetchData();
  
})

/* Init Pinia stores */
// const setTransferToWaitList = mainStore.setTransferToWaitList();


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
      </SectionTitleLineWithButton> -->

      <CardBox
        class="mb-6"

        has-table
      >
        <TableSearchStudent />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
