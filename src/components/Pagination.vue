<template>
  <div class="paginate" v-show="validateResults">
    <nav aria-label="Page navigation example" class="p-1">
      <ul class="pagination justify-content-end">

        <li class="page-item" :class="disabledPaginationBack">
          <div @click="decCurrentResultIdx" class="page-link" ><i class="fa-solid fa-angle-left"></i></div>
        </li>
        <li class="page-item" v-for="index in currentIndexWindow" :key="index"
            :class="{'active': index == currentResultIdx}">
          <a class="page-link" href="#" @click="setCurrentResultIdx(index)">{{ index+1 }}</a></li>
        <li class="page-item" :class="disabledPaginationNext">
          <div @click="incCurrentResultIdx" class="page-link"><i class="fa-solid fa-angle-right"></i></div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import {mapActions, mapState} from "pinia";
import {useScheduleView} from "../store/useScheduleView";
import {useEngineResults} from "../store/useEngineResults";

export default {
  name: "Pagination",
  props: {
    resultsArrayLen: Number
  },
  computed: {
    ...mapState(useScheduleView, ["currentResultIdx"]),
    // si no tiene resultados no se muestra la paginacion
    validateResults() {
      return this.resultsArrayLen === 0 ? false : true;
    },
    // habilita y desabilita las felchas de la paginacion con direccion atras
    disabledPaginationBack() {
      return this.currentResultIdx === 0 ? 'disabled' : '';
    },
    // habilita y desabilita las felchas de la paginacion con direccion adelante
    disabledPaginationNext() {
      return this.currentResultIdx === this.resultsArrayLen - 1 ? 'disabled' : '';
    },
    // Muestra solo cierto número de resultados en la paginación
    currentIndexWindow(){
        let width = 5;
        let engineResults = useEngineResults();
        const radius = Math.floor(width / 2);
        if(width > engineResults.length){
            // Muestra todos los resultados
            let arr = new Array(engineResults.length);
            for(let i = 0; i < engineResults.length; i++){
                arr[i] = i;
            }
            return arr;
        }else{
            let arr = new Array();
            // Encuentra el centro de la ventana
            const center = this.currentResultIdx;
            let begin = 0;
            if(center - radius > 0){
                begin = center - radius;
            }
            for(let i = begin; i < center + radius && i < engineResults.length; i++){
                arr.push(i);
            }
            console.log(arr);
            return arr;
        }
        
    }
  },
  methods: {
    ...mapActions(useScheduleView, ["setCurrentResultIdx", "incCurrentResultIdx", "decCurrentResultIdx"]),
  }
}
</script>
<style scoped>
.number-highlight {
  font-weight: 900;
  background-color: #D2D5D9;
}
</style>
