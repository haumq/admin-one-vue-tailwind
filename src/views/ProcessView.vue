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
import TableStudentProcess from "@/components/TableStudentProcess.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useMainStore } from '@/stores/main.js'
const mainStore = useMainStore()

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <!-- <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
      </SectionTitleLineWithButton> -->

      <CardBox class="mb-6" has-table>
        <TableStudentProcess />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
