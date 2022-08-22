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
  mdiClockIn,
  mdiCheckboxMarkedOutline
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

defineProps({
  checkable: Boolean,
});

const styleStore = useStyleStore();
const mainStore = useMainStore();
const toastStore = useToastStore()

const transferToLastQueue = (payload) => mainStore.transferToLastQueue(payload);
const transferToOldPositionQueue = (payload) =>
  mainStore.transferToOldPositionQueue(payload);
const removeFromQueue = (payload) => mainStore.removeFromQueue(payload);
const transferToProcess = (payload) => mainStore.transferToProcess(payload);
const transferToFisnish =  (payload) => mainStore.transferToFisnish(payload);
const transferMultiToProcess = (payload) => mainStore.transferMultiToProcess(payload);
const transferMultiToFinish = (payload) => mainStore.transferMultiToFinish(payload);

// const lenghtData =
const items = computed(() => {
  let students = mainStore.students;
  students = students.filter(
    (item) => item.TrangThai == 1
  );
  return students.sort((a, b) => {
    return new Date(a.NgayTao) - new Date(b.NgayTao);
    // return b.NgayTao - a.NgayTao;
  });
});
const finish = computed(() => {
  let students = mainStore.students;
  return students.filter((item) => item.TrangThai == 3  || item.TrangThai == 2).length;
});
const currentStudent = ref({})
const currentStudentIndex = ref(0)
// const currentStudent = computed(() => {
//   let students = mainStore.students;
//   return students[0];
// });
const setCurrentStudent = (payload, index) => {
  currentStudent.value =  payload
  currentStudentIndex.value = index
  isModalActive.value = !isModalActive.value
}

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const isloading = computed(() => mainStore.apiLoading);

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

const pagesList = computed(() => {
  const pagesList = [];

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
    nextStep.value =
      prevStep.value < 2
        ? nextStep.value + (2 - prevStep.value)
        : nextStep.value;
    prevStep.value =
      nextStep.value < 2
        ? prevStep.value + (2 - nextStep.value)
        : prevStep.value;

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

const rowsList = computed(() => {
  const rowsList = [];
  items.value.slice(0, perPage.value).map((item) => {
    rowsList.push(item.Row);
  });
  return rowsList;
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

const keyHandleWaitViewHook = (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    if (rowsList.value && rowsList.value.length > 0) {
      transferMultiToProcess(rowsList.value);
    }
  }
};

onMounted(() => {
  if (!mainStore.isKeyWaitViewRegistered) {
    // console.log("onMounted keyEnterHook")
    window.addEventListener("keydown", keyHandleWaitViewHook);
    mainStore.isKeyWaitViewRegistered = true;
  } else {
    // console.error('Duplicate field focus event')
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keyHandleWaitViewHook);
  mainStore.isKeyWaitViewRegistered = false;
});
</script>

<template>
  <!-- <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal> -->

  <CardBoxModal v-model="isModalDangerActive" large-title="Thông báo" button="danger" has-cancel>
    <p>Vui lòng sử dụng tổ hợp <kbd
        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
        >Ctrl</kbd
      >
      +
      Click chuột để hoàn tất
    </p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
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
      <tr v-for="(student, index) in itemsPaginated" :key="student.Row" @dblclick="setCurrentStudent(student, index)">
        <TableCheckboxCell
          v-if="checkable"
          @="checked($event, student)"
        />
        <!-- <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="client.HoTen" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td> -->
        <td data-label="STT">
          {{ index + 1 + finish + (currentPage - 1) * perPage }}
        </td>
        <td data-label="MSSV">
          {{ student.MSSV }}
        </td>
        <td data-label="Tên" class="lg:whitespace-nowrap">
          <p class="font-bold">{{ student.HoTen }}</p>
          <small class="hidden lg:block">{{
            new Date(student.NgaySinh).toLocaleDateString() == "Invalid Date"
              ? student.NgaySinh
              : new Date(student.NgaySinh).toLocaleDateString()
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
                :icon="mdiEye"
                small
                @click="setCurrentStudent(student, index)"
              />
              <BaseButton
                color="danger"
                :icon="mdiCheckboxMarkedOutline"
                small
                @click="transferToProcess(student.Row)"
              />
              <!-- <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="removeFromQueue(student.Row)"
              /> -->
            </span>
            <!-- <ButtonPropressing v-else-if="student.TrangThai == 2" />
            <span v-else>Khác</span> -->
          </BaseButtons>
        </td>
      </tr>
    </tbody>
    <SkeletonTable :buttonSkeleton="'wait'" v-if="isloading && numPages <= 0" />
  </table>
  <CardBox empty v-if="!isloading && numPages <= 0" />
  <div
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800 select-none"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-if="numPages > 0"
          :disabled="currentPage === 1"
          :icon="mdiChevronLeft"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = prevPage"
        />
        <BaseButton
          v-if="currentPage > 3"
          :active="currentPage == 1"
          :label="1"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = 1"
        />
        <span v-if="currentPage > 4">...</span>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = page"
        />
        <span v-if="currentPage < numPages - 3">...</span>
        <BaseButton
          v-if="currentPage < numPages - 2"
          :active="currentPage == numPages"
          :label="numPages"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = numPages"
        />
        <BaseButton
          v-if="numPages > 0"
          :disabled="currentPage === numPages"
          :icon="mdiChevronRight"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = nextPage"
        />
      </BaseButtons>
      <small v-if="numPages > 0"
        >Page {{ currentPageHuman }} of {{ numPages }}</small
      >
    </BaseLevel>
    <!-- <Pagination /> -->
  </div>
  <div
    class="p-3 lg:px-6 flex justify-end items-center border-t border-gray-100 dark:border-slate-800 select-none"
    v-if="numPages > 0 && rowsList.length > 0"
  >
    <small class="mr-10">
      <span>Phím tắt: </span>
      <kbd
        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
        >Ctrl</kbd
      >
      +
      <kbd
        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
        >S</kbd
      ><span> hoặc </span>
      <kbd
        class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
        >Ctrl</kbd
      ><span> + Click: </span>
    </small>
    <button
      @dblclick="isModalDangerActive = !isModalDangerActive"
      @click.ctrl="transferMultiToProcess(rowsList)"
      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
      >
        {{
          `Xác nhận ${rowsList.length} SV trong trang 1 ở DS trên đã nhận bằng`
        }}
      </span>
    </button>
  </div>

  <section>
    <!-- <button @click="isModalActive = !isModalActive">Test Button</button> -->
    <OverlayLayer v-if="isModalActive" @click.stop="isModalActive = !isModalActive">
      <!-- <div
        class="w-full max-w-5xl z-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      > -->
        <section
          class="flex flex-col lg:flex-row p-2 mb-4 w-full max-w-5xl z-10 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
          v-if="currentStudent"
          @click="isModalActive = true"
        >
          <div class="px-2 lg:w-2/3">
            <h4
              class="mb-5 text-3xl md:text-5xl font-bold text-gray-900 dark:text-white text-center drop-shadow-lg"
            >
              {{ currentStudent.HoTen }}
            </h4>
            <h5
              class="mb-5 text-xl md:text-3xl lg:text-5xl font-bold text-gray-700 dark:text-gray-200 text-center drop-shadow-lg"
            >
              {{ currentStudent.SoVaoSo }}
            </h5>

            <div class="flex flex-col md:flex-row mt-5 mb-5">
              <div class="md:w-1/2">
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  MSSV: {{ currentStudent.MSSV }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
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
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Ngành: {{ currentStudent.Nganh }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Xếp Loại: {{ currentStudent.XepLoai }}
                </p>

                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Điện thoại:
                  {{
                    currentStudent.DienThoai.toLocaleString("vi", {
                      minimumIntegerDigits: 10,
                      useGrouping: false,
                    })
                  }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Email: {{ currentStudent.Email }}
                </p>
              </div>
              <div>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Số hiệu bằng: {{ currentStudent.SoHieuBang }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  GDQP: {{ currentStudent.GDQP }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Thiếu HS, HP: {{ currentStudent.ThieuHSHP }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Khảo sát: {{ currentStudent.KhaoSat }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Lễ phục: {{ currentStudent.LePhuc }}
                </p>
                <p
                  class="md:mb-3 text-base text-gray-500 md:text-lg dark:text-gray-400"
                >
                  Thời gian:
                  {{
                    new Date(currentStudent.NgayTao).toLocaleString() ==
                    "Invalid Date"
                      ? currentStudent.NgayTao
                      : new Date(currentStudent.NgayTao).toLocaleString("vi")
                  }}
                </p>
              </div>
            </div>

            <div
              class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
            ></div>
          </div>

          <div
            class="lg:w-1/3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="relative">
              <img
                class="rounded-t-lg w-full"
                src="/public/image-2.jpg"
                alt=""
              />
              <span
                class="sticker absolute text-9xl text-white font-bold left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 drop-shadow-lg"
              >
                <!-- {{ currentStudent.STT }} -->
                {{ currentStudentIndex + 1 + finish + (currentPage - 1) * perPage }}
              </span>
            </div>
            <div class="p-5">
              <BaseButtons type="justify-center lg:justify-around mb-5" no-wrap>
                <!-- <ButtonPropressing
                  @click="transferToFisnish(currentStudent.Row)"
                /> -->
                  <BaseButton
                color="success"
                :icon="mdiCheckboxMarkedOutline"
                @click="transferToProcess(student.Row)"
                label="Lấy bằng"
              />
              </BaseButtons>

              <h5
                class="mb-5 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                Noteworthy technology
              </h5>
              <BaseButtons type="justify-center mb-5" no-wrap>
                <BaseButton
                  color="success"
                  :icon="mdiSpeakerPlay"
                  small
                  @click.stop="
                    callNameStudentSound(
                      `Xin mời bạn:  ${currentStudent.HoTen}, đến quầy hồ sơ!`
                    )
                  "
                />
                <BaseButton
                  color="warning"
                  :icon="mdiPriorityLow"
                  small
                  @click="transferToProcess(currentStudent.Row)"
                />

                <BaseButton
                  color="warning"
                  :icon="mdiClockIn"
                  small
                  v-if="currentStudent.TrangThai === 2"
                  @click="transferToOldPositionQueue(currentStudent.Row)"
                />
                <!-- <BaseButton
                  color="warning"
                  :icon="mdiPriorityLow"
                  small
                  @click="transferToLastQueue(currentStudent.Row)"
                /> -->
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
      <!-- </div> -->
    </OverlayLayer>
  </section>
</template>
