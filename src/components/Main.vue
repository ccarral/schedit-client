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
import {useFileDrawer} from "../store/useFileDrawer";
import {useWasm} from "../store/useWasm";
import {usePoolDiagnostics} from "../store/usePoolDiagnostics";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "Main",
  components: {
    TableSchedule,
    Pagination,
  },
  methods:{
  ...mapActions(useWasm, ['wasmInit']),
  ...mapActions(useFileDrawer, ['fetchUrlFiles']),
  ...mapActions(usePoolStore, ['getPoolsFromFile']),
  },
  computed: {
    ...mapState(useEngineResults, ['engineResults', 'engineRan']),
    ...mapState(useScheduleView, ['scheduleView', 'currentResultIdx']),
    ...mapState(usePoolStore, ['selectedGroupsAsScheduleView']),
    ...mapState(useFileDrawer, ['files']),
    ...mapState(usePoolDiagnostics, ['diagnostics']),
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
  watch:{
    diagnostics(oldVal, _newVal){
        for(const [path, diagnostic] of oldVal){
            if(!diagnostic.ok){
                createToast(`Error en plantilla ${path}`,
                {
                    type: 'danger',
                    timeout: 5000,
                })
            }
        }
    }
  },
  async mounted(){
    await this.wasmInit();
    await this.fetchUrlFiles();
    this.getPoolsFromFile();
  }
};
</script>
