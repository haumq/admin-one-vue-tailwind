<script setup>
import {
  mdiMonitorCellphone,
  mdiAccountMultiple,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiClose,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableStudentQueue from "@/components/TableStudentQueue.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useMainStore } from "@/stores/main.js";
import { onBeforeMount, ref } from "vue";
// import { getDatabase, ref, onValue, onChildChanged } from "firebase/database";
const mainStore = useMainStore();

const modalOneActive = ref(false);

// const db = getDatabase();
// const starCountRef = ref(db, 'changeWaitList');
// onChildChanged(starCountRef, (snapshot) => {
//   // console.log("refresh page");
//   const data = snapshot.val();
//   let text = 'dòng '+data+' số thứ tự ' + (data - 1) +' thêm vào hàng đợi'
//   // const utt = new SpeechSynthesisUtterance(text);
//   // speechSynthesis.speak(utt);
//   console.log(text);
//   // mainStore.fetchData();
//   mainStore.setTransferToWaitList(data);
// });
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
      </SectionTitleLineWithButton> -->

      <CardBox class="mb-6" has-table>
        <TableStudentQueue />
      </CardBox>
    </SectionMain>

    <!-- <CardBoxModal
      v-model="modalOneActive"
      title="Please confirm action"
      button-label="Confirm"
      has-cancel
    >
      <p>This is sample modal</p>
    </CardBoxModal>
    <SectionMain>
      <div class="space-y-12">
        <button
          @click="modalOneActive = true"
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Purple to blue
          </span>
        </button>
      </div>
    </SectionMain> -->
  </LayoutAuthenticated>
</template>
