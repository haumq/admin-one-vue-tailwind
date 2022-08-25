<script setup>
import { computed, ref, onBeforeUnmount, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { useStyleStore } from "@/stores/style";
import { useToastStore } from '@/stores/toast.js'
import {
  mdiEye,
  mdiTrashCan,
  mdiArrowRight,
  mdiChevronRight,
  mdiChevronLeft,
  mdiPriorityLow,
  mdiPriorityHigh,
  mdiSpeakerPlay,
  mdiClockIn
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SkeletonTable from "@/components/SkeletonTable.vue";
import SkeletonHero from "@/components/SkeletonHero.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import ButtonWait from "./ButtonWait.vue";
import ButtonFinish from "./ButtonFinish.vue";
import ButtonHandle from "./ButtonHandle.vue";
import ButtonDropdown from "./ButtonDropdown.vue";
import ButtonPropressing from "./ButtonPropressing.vue";
import CardBox from "@/components/CardBox.vue";

defineProps({
  checkable: Boolean,
});

const styleStore = useStyleStore();
const mainStore = useMainStore();
const toastStore = useToastStore()
const userEmail = computed(() => mainStore.userEmail)

const transferToWait = function (row) {
  let payload = { row: row };
  mainStore.transferToWait(payload);
};
const transferToProcess =  (payload) => mainStore.transferToProcess(payload);
const transferToFisnish =  (payload) => mainStore.transferToFisnish(payload);
const transferToLastQueue =  (payload) => mainStore.transferToLastQueue(payload);
const transferToOldPositionQueue =  (payload) => mainStore.transferToOldPositionQueue(payload);
const removeFromQueue =  (payload) => mainStore.removeFromQueue(payload);

// const transferToWaitListRow = computed(() => mainStore.transferToWaitListRow);
const finish = computed(() => {
  let students = mainStore.students
  if( mainStore.dataTo > 0 && mainStore.dataFrom > 0){
    return students.filter((item, index) => item.Row <= mainStore.dataTo && item.Row >= mainStore.dataFrom && item.TrangThai == 3).length;
  }
  return students.filter(item => item.TrangThai == 3).length;
}
);
const waitList = computed(() => {
  // let students = mainStore.students;
   let students
  if( mainStore.dataTo > 0 && mainStore.dataFrom > 0){
    students = mainStore.students.filter((item) => item.Row <= mainStore.dataTo && item.Row >= mainStore.dataFrom)
  }else{
    students = mainStore.students
  }
  students = students.filter(
    (item) => item.TrangThai == 1 || item.TrangThai == 2
  );
  return students.sort((a, b) => {
    return new Date(a.NgayTao) - new Date(b.NgayTao);
    // return b.NgayTao - a.NgayTao;
  });
});
const currentStudent = computed(() =>
{
  let t = waitList.value.filter(item => (item.TrangThai == 1 || (item.TrangThai == 2 && (item.NguoiXuLy == '' || item.NguoiXuLy == userEmail.value))))
  // console.log(t)
  // console.log(userEmail.value)
  return t.shift()
}
);
const items = computed(() => {
  let t = waitList.value.filter(item => item != currentStudent.value);
  return t;
})

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const isloading = computed(() => mainStore.apiLoading)

const perPage = ref(10);

const currentPage = ref(1);

const prevStep = ref(0);

const nextStep = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * (currentPage.value - 1),
    perPage.value * currentPage.value
  )
);
const nextPage = computed(() =>
  currentPage.value < numPages.value ? currentPage.value + 1 : numPages.value
);
const prevPage = computed(() =>
  currentPage.value > 1 ? currentPage.value - 1 : 1
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value);

// const pagesList = computed(() => {
//   const pagesList = [];

//   for (let i = 0; i < numPages.value; i++) {
//     pagesList.push(i);
//   }

//   return pagesList;
// });

const pagesList = computed(() => {
  const pagesList = [];
  // let prevStep = 0;
  // let nextStep = 0;

  // for (let i = 0; i < numPages.value; i++) {
  //   pagesList.push(i)
  // }

  if (numPages.value <= 7) {
    for (let i = 1; i <= numPages.value; i++) {
      pagesList.push(i);
    }
  } else {
    currentPage.value > 3
      ? (prevStep.value = 2)
      : (prevStep.value = currentPage.value - 1);
    currentPage.value < numPages.value - 2
      ? (nextStep.value = 2)
      : (nextStep.value = numPages.value - currentPage.value);
    // prevStep.value < 0 ? prevStep.value = 0 : prevStep.value = prevStep.value;
    // nextStep.value < 0 ? nextStep.value = 0 : nextStep.value = nextStep.value;
    nextStep.value =
      prevStep.value < 2
        ? nextStep.value + (2 - prevStep.value)
        : nextStep.value;
    prevStep.value =
      nextStep.value < 2
        ? prevStep.value + (2 - nextStep.value)
        : prevStep.value;
    // if(currentPage < 4 && numPages.value > 7) {
    //   nextStep.value = currentPage
    // }
    // console.log(prevStep.value);
    // console.log(nextStep.value);

    for (let i = prevStep.value; i > 0; i--) {
      pagesList.push(currentPage.value - i);
    }
    pagesList.push(currentPage.value);

    for (let i = 0; i < nextStep.value; i++) {
      pagesList.push(currentPage.value + i + 1);
    }
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};
const textSound = computed(() => mainStore.Area > 0 ? `đến quầy số ${mainStore.Area}, để nhận bằng`: 'đến quầy hồ sơ!' );

const keyEnterHook = e => {
    if (e.key === 'Enter') {
      // e.preventDefault()
        // console.log(currentStudent.value.TrangThai)
      if(currentStudent.value.TrangThai === 1){
        transferToProcess(currentStudent.value.Row)
        // alert("Enter");
      }
    } else if (e.key === ' ' || e.key === 'Spacebar' || (e.ctrlKey && e.key === "s")) {
      e.preventDefault()
      if(currentStudent.value.TrangThai === 2){
        transferToFisnish(currentStudent.value.Row)
        // console.log("Enter")
        // alert("Enter");
      }
      // console.log("Escape")
    } else if (e.keyCode === 120) {
      e.preventDefault()
      if(currentStudent.value){
      const text = `Mời bạn ${currentStudent.value.HoTen}, ${textSound}`
      callNameStudentSound(text)
      }
    } else if (e.keyCode === 8) {
      e.preventDefault()
      if(currentStudent.value){
          transferToOldPositionQueue(currentStudent.value.Row)
      }
    } else if (e.keyCode === 39) {
      e.preventDefault()
      if(currentStudent.value){
          transferToLastQueue(currentStudent.value.Row)
      }
    } else if (e.shiftKey && e.keyCode === 46) {
      e.preventDefault()
      if(currentStudent.value){
          removeFromQueue(currentStudent.value.Row)
      }
    }
  }
  const callNameStudentSound = payload => {
    // alert("test");
    //  let text = ``
      const utt = new SpeechSynthesisUtterance(payload);
      // utt.lang='vi';
      // utt.pitch = 0.7;  // a little lower
      utt.pitch = 1.2;  // a little lower
      // utt.rate = 1.4;   // a little faster
      utt.rate = 0.5;   // a little faster
      utt.volume = 0.8; // a little quieter
      speechSynthesis.speak(utt);
      // console.log(text);
  }

  onMounted(() => {
    if (!mainStore.isKeyQueueViewRegistered) {
      // console.log("onMounted keyEnterHook")
      window.addEventListener('keydown', keyEnterHook)
      mainStore.isKeyQueueViewRegistered = true
    } else {
      // console.error('Duplicate field focus event')
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', keyEnterHook)
    mainStore.isKeyQueueViewRegistered = false
  })

</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" large-title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <section
    class="flex flex-col lg:flex-row p-2 mb-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 " v-if="currentStudent">
    <div class="px-2 lg:w-2/3" >
      <h4 class="mb-5 text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center drop-shadow-lg"  >
        {{ currentStudent.HoTen }}
      </h4>
      <h5 class="mb-5 text-xl md:text-3xl lg:text-5xl font-bold text-gray-700 dark:text-gray-200 text-center drop-shadow-lg">
        {{ currentStudent.SoVaoSo }}
      </h5>

      <div class="flex flex-col md:flex-row mt-5 mb-5">
        <div class="md:w-1/2">
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            MSSV: {{ currentStudent.MSSV }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Ngày sinh: {{
              new Date(currentStudent.NgaySinh).toLocaleDateString() == "Invalid Date"
                ? currentStudent.NgaySinh
                : new Date(currentStudent.NgaySinh).toLocaleDateString("vi", { dateStyle: 'short' })
          }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Ngành: {{ currentStudent.Nganh }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Xếp Loại: {{ currentStudent.XepLoai }}
          </p>

          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Điện thoại: {{ currentStudent.DienThoai.toLocaleString('vi', {minimumIntegerDigits: 10, useGrouping:false}) }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Email: {{ currentStudent.Email }}
          </p>
        </div>
        <div>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Số hiệu bằng: {{ currentStudent.SoHieuBang }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            GDQP: {{ currentStudent.GDQP }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Thiếu HS, HP: {{ currentStudent.ThieuHSHP }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Khảo sát: {{ currentStudent.KhaoSat }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Lễ phục: {{ currentStudent.LePhuc }}
          </p>
          <p class=" md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
            Thời gian: {{  new Date(currentStudent.NgayTao).toLocaleString() == "Invalid Date"
                ? currentStudent.NgayTao
                : new Date(currentStudent.NgayTao).toLocaleString("vi")}}
          </p>
        </div>
      </div>

      <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
    </div>

      <div class="lg:w-1/3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div class="relative">
          <img class="rounded-t-lg w-full" src="/public/image-2.jpg"  alt="" />
          <span class="sticker absolute text-9xl text-white font-bold left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 drop-shadow-lg">
            <!-- {{ currentStudent.STT }} -->
            {{ finish + 1 }}
          </span>
        </div>
        <div class="p-5">
          <BaseButtons type="justify-center lg:justify-around mb-5" no-wrap >
           <ButtonHandle v-if="currentStudent.TrangThai == 1" @click="transferToProcess(currentStudent.Row)" />
           <ButtonPropressing v-else-if="currentStudent.TrangThai == 2" @click="transferToFisnish(currentStudent.Row)" />
           <ButtonFinish v-else-if="currentStudent.TrangThai == 3" />
           <span v-else>Khác</span>
         </BaseButtons>

            <h5 class="mb-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology
            </h5>
            <BaseButtons type="justify-center mb-5" no-wrap >
            <BaseButton
              color="success"
              :icon="mdiSpeakerPlay"
              small
              @click="callNameStudentSound(`Mời bạn ${currentStudent.value.HoTen}, ${textSound}`)"
            />

            <BaseButton
              color="warning"
              :icon="mdiClockIn"
              small
              v-if="currentStudent.TrangThai === 2"
              @click="transferToOldPositionQueue(currentStudent.Row)"
            />
            <BaseButton
              color="warning"
              :icon="mdiClockIn"
              small
              disabled
              v-if="currentStudent.TrangThai != 2"
            />
            <BaseButton
              color="info"
              :icon="mdiPriorityLow"
              small
               @click="transferToLastQueue(currentStudent.Row)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
               @click="removeFromQueue(currentStudent.Row)"
            />
            </BaseButtons>



        </div>
      </div>
  </section>
  <SkeletonHero v-if="isloading && !currentStudent" />
  <!-- <SkeletonHero  /> -->
  <CardBox empty v-if="!isloading && !currentStudent" />
  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span v-for="checkedRow in checkedRows" :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700">
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <!-- <th /> -->
        <th>STT</th>
        <th>MSSV</th>
        <th>TÊN <span class="hidden lg:inline"> - NGÀY SINH - NGÀNH</span></th>
        <th class="lg:hidden">NGÀY SINH</th>
        <th class="lg:hidden">NGÀNH</th>
        <th class="whitespace-nowrap">SỐ VÀO SỔ</th>
        <th>GDQP</th>
        <th class="whitespace-nowrap">THIẾU HS, HP</th>
        <th>KHẢO SÁT</th>
        <th>LỄ PHỤC</th>
        <th>TRẠNG THÁI</th>
        <!-- <th /> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in itemsPaginated" :key="student">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, student)" />
        <!-- <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="client.HoTen" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td> -->
        <td data-label="STT">
          <!-- {{ student.STT }} -->
          {{ index + 2 + finish + (currentPage - 1) * perPage }}
        </td>
        <td data-label="MSSV">
          {{ student.MSSV }}
        </td>
        <td data-label="Tên" class="lg:whitespace-nowrap">
          <p class="font-bold">{{ student.HoTen }}</p>
          <small class="hidden lg:block">{{
              new Date(student.NgaySinh).toLocaleDateString() == "Invalid Date"
                ? student.NgaySinh
                : new Date(student.NgaySinh).toLocaleDateString("vi", { dateStyle: 'short' })
          }}</small>
          <small class="hidden lg:block">{{ student.Nganh }}</small>
        </td>
        <td data-label="Ngày Sinh" class="lg:hidden">
          {{
              new Date(student.NgaySinh).toLocaleDateString() == "Invalid Date"
                ? student.NgaySinh
                : new Date(student.NgaySinh).toLocaleDateString()
          }}
        </td>
        <td data-label="Ngành" class="lg:hidden">
          {{ student.Nganh }}
        </td>
        <td data-label="Số Vào Sổ">
          {{ student.SoVaoSo }}
        </td>
        <td data-label="GDQP">
          {{ student.GDQP }}
        </td>
        <td data-label="Thiếu HS, HP">
          {{ student.ThieuHSHP }}
        </td>
        <td data-label="Khảo sát">
          {{ student.KhaoSat }}
        </td>
        <td data-label="Lễ Phục">
          {{ student.LePhuc }}
        </td>
        <!-- <td data-label="Progress" class="lg:w-32">
          <progress
            class="flex w-2/5 self-center lg:w-full"
            max="100"
            :value="student.progress"
          >
            {{ student.progress }}
          </progress>
        </td> -->
        <!-- <td data-label="NgayTao" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="student.NgayTao">{{ student.NgayTao }}</small>
        </td> -->
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-end" no-wrap>
            <span v-if="student.TrangThai == 1">

            <BaseButton
              color="info"
              :icon="mdiPriorityLow"
              small
              @click="transferToLastQueue(currentStudent.Row)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="removeFromQueue(student.Row)"
            />
            </span>

            <!-- <ButtonHandle v-if="student.TrangThai == 1" /> -->

            <ButtonPropressing v-else-if="student.TrangThai == 2" />
            <!-- <ButtonFinish v-else-if="student.TrangThai == 3" /> -->
            <span v-else>Khác</span>
            <!-- <ButtonTransferToWait v-else @click="transferToWait(student.STT)" /> -->
          </BaseButtons>
        </td>
      </tr>
    </tbody>
    <SkeletonTable :buttonSkeleton="'queue'" v-if="isloading && numPages <= 0" />
  </table>

  <CardBox empty v-if="!isloading && numPages <= 0" />
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 select-none">
    <BaseLevel>
      <BaseButtons>
        <BaseButton v-if="numPages > 0" :disabled="currentPage === 1" :icon="mdiChevronLeft" small
          :outline="styleStore.darkMode" @click="currentPage = prevPage" />
        <BaseButton v-if="currentPage > 3" :active="currentPage == 1" :label="1" small :outline="styleStore.darkMode"
          @click="currentPage = 1" />
        <span v-if="currentPage > 4">...</span>
        <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page" small
          :outline="styleStore.darkMode" @click="currentPage = page" />
        <span v-if="currentPage < numPages - 3">...</span>
        <BaseButton v-if="currentPage < numPages - 2" :active="currentPage == numPages" :label="numPages" small
          :outline="styleStore.darkMode" @click="currentPage = numPages" />
        <BaseButton v-if="numPages > 0" :disabled="currentPage === numPages" :icon="mdiChevronRight" small
          :outline="styleStore.darkMode" @click="currentPage = nextPage" />
      </BaseButtons>
      <small v-if="numPages > 0">Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
    <!-- <Pagination /> -->
  </div>
</template>
<style scoped>

</style>
