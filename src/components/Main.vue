<template>
  <main class="main">
    <section>
      <div class="container-fluid pt-3 rounded-3 bg-light shadow-lg">
        <TableSchedule :scheduleView="currentScheduleView"/>
        <div class="container">
          <Pagination :resultsArrayLen="engineResults.length"/>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TableSchedule from "./TableSchedule.vue";
import Pagination from "./Pagination.vue";
import {mapState, mapActions} from 'pinia';
import {useEngineResults} from "../store/useEngineResults";
import {useScheduleView} from "../store/useScheduleView";
import {usePoolStore} from "../store/usePools";
import {useFileDrawer} from "../store/useService";

export default {
  name: "Main",
  components: {
    TableSchedule,
    Pagination,
  },
  methods:{
  ...mapActions(useFileDrawer, ['fetchUrlFiles'])
  },
  computed: {
    ...mapState(useEngineResults, ['engineResults', 'engineRan']),
    ...mapState(useScheduleView, ['scheduleView', 'currentResultIdx']),
    ...mapState(usePoolStore, ['selectedGroupsAsScheduleView']),
    ...mapState(useFileDrawer, ['files']),
    currentScheduleView() {
      // retornamos un objeto para enviar el grid y el número de horario de los resultados
      if (this.engineRan) {
        return {
          nameSchedule: 'Horario ' + (this.currentResultIdx + 1),
          schedule: this.scheduleView
        }
      } else {
        return {
          nameSchedule: 'Previsualización',
          schedule: this.selectedGroupsAsScheduleView
        }
      }
    }
  },
  mounted(){
    this.fetchUrlFiles();
  }
};
</script>
