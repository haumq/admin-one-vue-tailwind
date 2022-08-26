<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiCertificate,
  mdiAccountDetails,
  mdiAccountCheck,
  mdiClipboardText,
  mdiClipboardCheck,
  mdiMedal,
  mdiFolderRemove,
  mdiSeal

} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import SkelekonChart from '@/components/SkelekonChart.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import SectionBannerStarOnGitHub from '@/components/SectionBannerStarOnGitHub.vue'
import numeral from 'numeral'

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})

const mainStore = useMainStore()

const clientBarItems = computed(() => mainStore.clients.slice(0, 4))
const totalStudent = computed(() => mainStore.students.length)
const totalStudentWait = computed(() => mainStore.students.filter(item => item.TrangThai === 1).length)
const totalStudentProcessing = computed(() => mainStore.students.filter(item => item.TrangThai === 2).length)
const totalStudentFinish = computed(() => mainStore.students.filter(item => item.TrangThai === 3).length)
const totalSurvey = computed(() => mainStore.students.filter(item => item.KhaoSat === 'Đã khảo sát').length)
const percentageTotalSurvey = computed(() => numeral(mainStore.students.filter(item => item.KhaoSat === 'Đã khảo sát').length/totalStudent.value).format('0.00%'))
const percentageNotSurvey = computed(() => numeral(mainStore.students.filter(item => item.KhaoSat === 'Chưa khảo sát').length/totalStudent.value).format('0.00%'))
const notSurvey = computed(() => mainStore.students.filter(item => item.KhaoSat === 'Chưa khảo sát').length)
const notEnoughList = computed(() => mainStore.students.filter(item => item.ThieuHSHP != '' || item.ThieuHSHP != 0).length)
const percentageNotEnoughList = computed(() => numeral(notEnoughList.value/totalStudent.value).format('0.00%'))
const totalArmyList = computed(() => mainStore.students.filter(item => item.GDQP != '').length)
const receiveArmyList = computed(() => mainStore.students.filter(item => item.GDQP != '' && item.NhanGDQP == 1).length)
const percentageReceiveArmyList = computed(() => numeral(receiveArmyList.value/totalArmyList.value).format('0.00%'))
const percentageFinish = computed(() => numeral((totalStudentFinish.value/totalStudent.value)).format('0.00%') )
const percentageWait = computed(() => numeral((totalStudentWait.value/totalStudent.value)).format('0.00%') )
const percentageProcess = computed(() => numeral((totalStudentProcessing.value/totalStudent.value)).format('0.00%') )

const transactionBarItems = computed(() => mainStore.history)
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Thống kê"
        main
      >
        <!-- <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        /> -->
      </SectionTitleLineWithButton>
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6" v-if="!totalStudent"  >
        <CardBox v-for="item in 9">
          <SkelekonChart />
        </CardBox>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6"  v-else>
        <CardBoxWidget
          trend="Overflow"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="totalStudent"
          label="Tổng sinh viên"
        />
         <CardBoxWidget
          :trend="percentageWait"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountDetails"
          :number="totalStudentWait"
          label="Hàng đợi"
        />
        <CardBoxWidget
          :trend="percentageProcess"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountCheck"
          :number="totalStudentProcessing"
          label="Đã xuất bằng, chờ xác nhận lại"
        />
        <CardBoxWidget
          :trend="percentageFinish"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiCertificate"
          :number="totalStudentFinish"
          label="Đã nhận bằng"
        />
         <CardBoxWidget
          :trend="percentageTotalSurvey"
          trend-type="up"
          color="text-yellow-500"
          :icon="mdiClipboardCheck"
          :number="totalSurvey"
          label="Đã khảo sát"
        />
         <CardBoxWidget
          :trend="percentageNotSurvey"
          trend-type="alert"
          color="text-yellow-500"
          :icon="mdiClipboardText"
          :number="notSurvey"
          label="Chưa khảo sát"
        />
        <CardBoxWidget
          :trend="percentageNotEnoughList"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiFolderRemove"
          :number="notEnoughList"
          label="Thiếu HS, HP"
        />
         <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiMedal"
          :number="totalArmyList"
          label="Chứng chỉ GDQP"
        />
         <CardBoxWidget
          :trend="percentageReceiveArmyList"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiSeal"
          :number="receiveArmyList"
          label="SV đã nhận CC GDQP"
        />


      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction,index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>
      <!-- <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6" v-if="totalStudent">


      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction,index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div> -->

      <!-- <SectionBannerStarOnGitHub /> -->

      <!-- <SectionTitleLineWithButton
        :icon="mdiChartPie"
        title="Trends overview"
      /> -->

      <!-- <CardBox
        title="Performance"
        :icon="mdiFinance"
        :header-icon="mdiReload"
        class="mb-6"
        @header-icon-click="fillChartData"
      >
        <div v-if="chartData">
          <line-chart
            :data="chartData"
            class="h-96"
          />
        </div>
      </CardBox> -->

      <!-- <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        title="Clients"
      /> -->

      <!-- <NotificationBar
        color="info"
        :icon="mdiMonitorCellphone"
      >
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar> -->

      <!-- <CardBox
        :icon="mdiMonitorCellphone"
        title="Responsive table"
        has-table
      >
        <TableSampleClients />
      </CardBox> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
