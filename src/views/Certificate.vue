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
import TableArmyCertificate from "@/components/TableArmyCertificate.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useMainStore } from "@/stores/main.js";
import { onBeforeMount, ref } from "vue";
const mainStore = useMainStore();

const modalOneActive = ref(false);

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox class="mb-6" has-table>
        <TableArmyCertificate />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
