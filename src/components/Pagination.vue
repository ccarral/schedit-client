<template>
  <div class="paginate" v-show="validateResults">
    <nav aria-label="Page navigation example" class="p-1">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="disabledPaginationBack">
          <div @click="decCurrentResultIdx" class="page-link" ><i class="fa-solid fa-angle-left"></i></div>
        </li>
        <li class="page-item" v-for="index in currentIndexWindow" :key="index"
            :class="{'active': index % 3 == highlightIndex}">
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
       if(this.resultsArrayLen < 3){
           let win = new Array(this.resultsArrayLen);
           for(let i = 0; i< this.resultsArrayLen; i++){
               win[i] = i;
           }
           return win;
       }else{
           if(this.currentResultIdx <= 1){
             return [0, 1, 2];
           }else if(this.currentResultIdx >= this.resultsArrayLen - 3){
             let n = this.resultsArrayLen;
             return [n - 3, n - 2, n - 1];
           }else{
             let i = this.currentResultIdx;
             return [i - 1, i, i + 1];
           }

       }
    },
    highlightIndex(){
       if(this.currentResultIdx <= 1){
         return this.currentResultIdx;
       }else{
         return this.currentResultIdx % 3;
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
