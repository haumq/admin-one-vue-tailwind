<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { useStyleStore } from "@/stores/style";
import {
  mdiEye,
  mdiTrashCan,
  mdiArrowRight,
  mdiChevronRight,
  mdiChevronLeft,
  mdiPriorityLow,
  mdiPriorityHigh,
  mdiSpeakerPlay,
  mdiClockIn,
  mdiCheckboxMarkedOutline,
  mdiLeadPencil,
  mdiVolumeHigh
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import ButtonWait from "./ButtonWait.vue";
import ButtonFinish from "./ButtonFinish.vue";
import ButtonTransferToWait from "./ButtonTransferToWait.vue";
import ButtonPropressing from "./ButtonPropressing.vue";
import CardBox from "@/components/CardBox.vue";
import SkeletonTable from "@/components/SkeletonTable.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import FormControl from "@/components/FormControl.vue";



defineProps({
  checkable: Boolean,

});

const styleStore = useStyleStore();

const mainStore = useMainStore();

const searchKey = computed(() => mainStore.searchKey)
console.log(searchKey.value)

const transferToWait = (payload) => mainStore.transferToWait(payload);
const transferToLastQueue = (payload) => mainStore.transferToLastQueue(payload);
const removeFromQueue = (payload) => mainStore.removeFromQueue(payload);
const transferToOldPositionQueue = (payload) => mainStore.transferToOldPositionQueue(payload);
const editColumnVestments = (row, value) => mainStore.editColumnVestments(row, value);
const editColumnNotEnough = (row, value) => {
  mainStore.editColumnNotEnough(row, value);
  isEditModalActive.value = !isEditModalActive.value;
  // console.log(isEditModalActive.value)
}

// const transferToWaitListRow = computed(() => mainStore.transferToWaitListRow);
const items = computed(() => {
  let students = mainStore.students.filter(item => item.HoTen.toString().toLocaleLowerCase().includes(searchKey.value.toString().toLocaleLowerCase()) ||
    item.MSSV.toString().toLocaleLowerCase().includes(searchKey.value.toString().toLocaleLowerCase())
  )
  // if(transferToWaitListRow.value) {
  //  students[transferToWaitListRow.value -2].TrangThai = 1;
  // }
  return students;
}
);
const currentStudent = ref({})
const currentStudentIndex = ref(0)

const setCurrentStudent = (payload, index) => {
  currentStudent.value = payload
  currentStudentIndex.value = index
  isModalActive.value = !isModalActive.value
}
const setCurrentStudentEdit = (payload, index) => {
  currentStudent.value = payload
  currentStudentIndex.value = index
  isEditModalActive.value = !isEditModalActive.value
}
const textSound = computed(() => mainStore.Area > 0 ? `đến quầy số ${mainStore.Area}` : 'đến quầy hồ sơ!');

const editedNotEnoungh = computed(() => currentStudent.value.ThieuHSHP)

const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const isEditModalActive = ref(false);

const isloading = computed(() => mainStore.apiLoading)

const perPage = ref(10);

const currentPage = ref(1)

const prevStep = ref(0)

const nextStep = ref(0)

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * (currentPage.value - 1),
    perPage.value * (currentPage.value)
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
    currentPage.value > 3 ? prevStep.value = 2 : prevStep.value = (currentPage.value - 1);
    currentPage.value < numPages.value - 2 ? nextStep.value = 2 : nextStep.value = (numPages.value - currentPage.value);
    // prevStep.value < 0 ? prevStep.value = 0 : prevStep.value = prevStep.value;
    // nextStep.value < 0 ? nextStep.value = 0 : nextStep.value = nextStep.value;
    (nextStep.value = prevStep.value < 2 ? nextStep.value + (2 - prevStep.value) : nextStep.value)
    prevStep.value = nextStep.value < 2 ? prevStep.value + (2 - nextStep.value) : prevStep.value
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

  return pagesList
})


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


const callNameStudentSound = payload => {
  // alert("test");
  //  let text = ``
  const utt = new SpeechSynthesisUtterance(payload);
  // utt.lang='vi';
  // utt.pitch = 0.7;  // a little lower
  utt.pitch = 1.4;  // a little lower
  // utt.rate = 1.4;   // a little faster
  utt.rate = 0.5;   // a little faster
  utt.volume = 1; // a little quieter
  speechSynthesis.speak(utt);
  // console.log(text);
}


</script>

<template>
  <!-- <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" large-title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal> -->

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
      <tr v-for="student in itemsPaginated" :key="student.Row" @dblclick="setCurrentStudent(student, index)">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, student)" />
        <!-- <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="client.HoTen" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td> -->
        <td data-label="STT">
          {{ student.STT }}
        </td>
        <td data-label="MSSV">
          {{ student.MSSV }}
        </td>
        <td data-label="Tên" class="lg:whitespace-nowrap">
          <p class="font-bold">{{ student.HoTen }}</p>
          <!-- <small class="hidden lg:block">{{ new Date(student.NgaySinh).constructor.toString().indexOf("Date") > -1 ? new Date(student.NgaySinh).toLocaleDateString() : student.NgaySinh  }}</small> -->
          <small class="hidden lg:block">{{ new Date(student.NgaySinh).toLocaleDateString() == 'Invalid Date' ?
            student.NgaySinh : new Date(student.NgaySinh).toLocaleDateString()
            }}</small>
          <small class="hidden lg:block">{{ student.Nganh }}</small>
        </td>
        <td data-label="Ngày Sinh" class="lg:hidden">
          {{ new Date(student.NgaySinh).toLocaleDateString() == 'Invalid Date' ? student.NgaySinh : new
          Date(student.NgaySinh).toLocaleDateString()
          }}
        </td>
        <td data-label="Ngành" class="lg:hidden">
          {{ student.Nganh }}
        </td>
        <td data-label="Số Vào Sổ">
          {{ student.SoVaoSo }}
           <p v-if="student.SongBangSongNganh" class="hidden lg:inline-block"> <small>Song bằng/ song ngành: </small><br/>{{ student.SongBangSongNganh }}</p>
        </td>
        <td data-label="SBSN:" class="lg:hidden" v-if="student.SongBangSongNganh">
          {{ student.SongBangSongNganh }}

        </td>
        <td data-label="GDQP">
          {{ student.GDQP }}
        </td>
        <td data-label="Thiếu HS, HP">
          {{ student.ThieuHSHP }}
          <BaseButton class="hidden lg:inline-block" color="warning" :icon="mdiLeadPencil" small v-if="student.ThieuHSHP != ''"
              @click="setCurrentStudentEdit(student, index)" />
        </td>
        <td data-label="Khảo sát">
          {{ student.KhaoSat }}
        </td>
        <td data-label="Lễ Phục">
            <button v-if="student.LePhuc == 'Có mượn'" @click="editColumnVestments(student.Row, 1)" type="button" class="focus:outline-none text-white bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-700 dark:hover:bg-yellow-600 rounded-md text-sm px-1.5 py-1">{{ student.LePhuc }}</button>
            <button v-else-if="student.LePhuc == 'Đã trả'" @click.ctrl ="editColumnVestments(student.Row, 0)" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 rounded-md text-sm px-1.5 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{{ student.LePhuc }}</button>
            <!-- <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 rounded-md text-sm px-1.5 py-1">Yellow</button> -->
            <span v-else >{{ student.LePhuc }}</span>
        </td>
        <td data-label="Xếp loại" class="lg:hidden">
          {{ student.XepLoai }}
        </td>
        <td data-label="Số hiệu bằng" class="lg:hidden">
          {{ student.SoHieuBang }}
        </td>
         <td data-label="Song bằng, song ngành" class="lg:hidden" v-if="student.SongBangSongNganh" >
          {{ student.SongBangSongNganh }}
        </td>
        <td data-label="Điện thoại" class="lg:hidden">
          {{ student.DienThoai }}
        </td>
        <td data-label="Email" class="lg:hidden">
          {{ student.Email }}
        </td>
        <td data-label="Thời gian chờ" class="lg:hidden" v-if="student.NgayTao">
          {{ new Date(student.NgayTao).toLocaleString("vi") == 'Invalid Date' ? student.NgayTao : new
          Date(student.NgayTao).toLocaleString("vi")
          }}
        </td>
        <td data-label="Người xử lý" class="lg:hidden" v-if="student.NguoiXuLy">
          {{ student.NguoiXuLy }}
        </td>
        <td data-label="Thời gian nhận bằng" class="lg:hidden" v-if="student.ThoiGianNhanBang">
          {{ new Date(student.ThoiGianNhanBang).toLocaleString("vi") == 'Invalid Date' ? student.ThoiGianNhanBang : new
          Date(student.ThoiGianNhanBang).toLocaleString("vi")
          }}
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
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <ButtonWait v-if="student.TrangThai == 1" />
            <!-- <ButtonPropressing v-else-if="student.TrangThai == 2" /> -->
            <ButtonFinish v-else-if="student.TrangThai == 3" />
            <p v-else-if="student.TrangThai == 2">
              Đã xuất bằng,<br />
              chờ xác nhận
            </p>
            <ButtonTransferToWait v-else @click="transferToWait(student.Row)" />
            <BaseButton color="warning" :icon="mdiLeadPencil" small v-if="student.ThieuHSHP != ''"
              @click="setCurrentStudentEdit(student, index)" class="lg:hidden" />
            <span class="lg:hidden">
             <BaseButton color="success" :icon="mdiVolumeHigh" small @click.stop="
                callNameStudentSound(
                  `Xin mời bạn:  ${student.HoTen}, ${textSound}`
                )
              " />
              <BaseButton color="warning" :icon="mdiClockIn" small v-if="student.TrangThai === 2"
                @click="transferToOldPositionQueue(student.Row)" />
              <BaseButton color="warning" :icon="mdiPriorityLow" small
                v-if="student.TrangThai == 1 || student.TrangThai == 2"
                @click="transferToLastQueue(student.Row)" />
              <BaseButton color="danger" :icon="mdiTrashCan" small
                v-if="student.TrangThai == 1 || student.TrangThai == 2"
                @click="removeFromQueue(student.Row)" />
          </span>

          </BaseButtons>
        </td>
      </tr>
    </tbody>
    <SkeletonTable v-if="isloading && numPages <= 0" />
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

  <section>
    <!-- <button @click="isModalActive = !isModalActive">Test Button</button> -->
    <OverlayLayer v-if="isModalActive" @click.stop="isModalActive = !isModalActive">
      <!-- <div
        class="w-full max-w-5xl z-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      > -->
      <section
        class="flex flex-col overflow-y-scroll lg:flex-row p-2 mb-4 w-full max-w-5xl  z-10 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        v-if="currentStudent" @click="isModalActive = true">
        <div class="px-2 lg:w-2/3">
          <h4 class="mb-5 text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center drop-shadow-lg">
            {{ currentStudent.HoTen }}
          </h4>
          <h5
            class="mb-5 text-xl md:text-3xl lg:text-5xl font-bold text-gray-700 dark:text-gray-200 text-center drop-shadow-lg">
            {{ currentStudent.SoVaoSo }}
          </h5>

          <div class="flex flex-col md:flex-row mt-5 mb-5">
            <div class="md:w-1/2">
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                STT: {{ currentStudent.STT }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                MSSV: {{ currentStudent.MSSV }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Ngày sinh:
                {{
                new Date(currentStudent.NgaySinh).toLocaleDateString() ==
                "Invalid Date"
                ? currentStudent.NgaySinh
                : new Date(currentStudent.NgaySinh).toLocaleDateString(
                "vi",
                { dateStyle: "short" }
                )
                }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Ngành: {{ currentStudent.Nganh }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Xếp Loại: {{ currentStudent.XepLoai }}
              </p>

              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Điện thoại:
                {{
                currentStudent.DienThoai.toLocaleString("vi", {
                minimumIntegerDigits: 10,
                useGrouping: false,
                })
                }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Email: {{ currentStudent.Email }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Xếp loại: {{ currentStudent.XepLoai }}
              </p>
            </div>
            <div>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Số hiệu bằng: {{ currentStudent.SoHieuBang }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                GDQP: {{ currentStudent.GDQP }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Thiếu HS, HP: {{ currentStudent.ThieuHSHP }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Khảo sát: {{ currentStudent.KhaoSat }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Lễ phục: {{ currentStudent.LePhuc }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Thời gian:
                {{
                new Date(currentStudent.NgayTao).toLocaleString() ==
                "Invalid Date"
                ? currentStudent.NgayTao
                : new Date(currentStudent.NgayTao).toLocaleString("vi")
                }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Người xử lý: {{ currentStudent.NguoiXuLy }}
              </p>
              <p class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400">
                Nhận bằng:
                {{
                new Date(currentStudent.ThoiGianNhanBang).toLocaleString() ==
                "Invalid Date"
                ? currentStudent.ThoiGianNhanBang
                : new Date(currentStudent.ThoiGianNhanBang).toLocaleString("vi")
                }}
              </p>
            </div>
          </div>

          <div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
        </div>

        <div
          class="hidden lg:block lg:w-1/3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div class="relative">
            <img class="rounded-t-lg w-full" src="/public/image-2.jpg" alt="" />
            <span
              class="sticker absolute text-9xl text-white font-bold left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 drop-shadow-lg">
              <!-- {{ currentStudent.STT }} -->
              {{ currentStudent.STT }}
            </span>
          </div>
          <div class="p-5">
            <BaseButtons type="justify-center lg:justify-around mb-5" no-wrap>
              <!-- <ButtonPropressing
                  @click="transferToFisnish(currentStudent.Row)"
                /> -->
              <!-- <BaseButton
                color="success"
                :icon="mdiCheckboxMarkedOutline"
                @click="transferToWait(student.Row)"
                label="Lấy bằng"
              /> -->
              <ButtonTransferToWait v-if="!currentStudent.TrangThai" @click="transferToWait(currentStudent.Row)" />
            </BaseButtons>

            <h5 class="mb-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tra thông tin sinh viên
            </h5>
            <BaseButtons type="justify-center mb-5" no-wrap>
              <BaseButton color="success" :icon="mdiVolumeHigh" small @click.stop="
                callNameStudentSound(
                  `Xin mời bạn:  ${currentStudent.HoTen}, ${textSound}`
                )
              " />
              <!-- <BaseButton
                  color="warning"
                  :icon="mdiPriorityLow"
                  small
                  @click="transferToProcess(currentStudent.Row)"
                /> -->

              <BaseButton color="warning" :icon="mdiClockIn" small v-if="currentStudent.TrangThai === 2"
                @click="transferToOldPositionQueue(currentStudent.Row)" />
              <BaseButton color="warning" :icon="mdiPriorityLow" small
                v-if="currentStudent.TrangThai == 1 || currentStudent.TrangThai == 2"
                @click="transferToLastQueue(currentStudent.Row)" />
              <BaseButton color="danger" :icon="mdiTrashCan" small
                v-if="currentStudent.TrangThai == 1 || currentStudent.TrangThai == 2"
                @click="removeFromQueue(currentStudent.Row)" />
            </BaseButtons>
          </div>
        </div>
      </section>
      <!-- </div> -->
    </OverlayLayer>
  </section>
  <OverlayLayer v-if="isEditModalActive" @click.stop="isEditModalActive = false">
    <section
      class="flex flex-col lg:flex-row p-2 mb-4 w-full lg:max-w-2xl  z-10 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      v-if="currentStudent" @click.stop="isEditModalActive = true">
      <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
          <label for="comment" class="sr-only">Your comment</label>
          <textarea id="comment" rows="4"
            class="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            v-model="currentStudent.ThieuHSHP"
            required>
            </textarea>
        </div>
        <div class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
          <span class="italic text-sm text-gray-400">Nếu bổ sung đủ vui lòng xóa trống</span>
          <div class="flex pl-0 space-x-1 sm:pl-2">
            <button type="button"
              @click.stop="editColumnNotEnough(currentStudent.Row, currentStudent.ThieuHSHP)"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              <span class="mr-2">Cập nhật</span>
              <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  </OverlayLayer>
</template>

