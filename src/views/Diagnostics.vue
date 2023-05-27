<template>
  <div class="container-fluid ">
    <div class="card-header py-3"> 
        <router-link :to="{ name: 'Dashboard', query: $route.query }" data-bs-toggle="tooltip" data-bs-placement="top" title="Inicio" style="display:inline">
          <img src="../assets/logo-transparent.png" class="img-fluid" alt="fs" width="200">
        </router-link>
        <h4>Diagnostico de Errores </h4>
    </div>
      <div class="container py-3">
        <div class="diagnostics-container">
          <div v-for="[path, diagnostic] of diagnostics" :key="path" class="diagnostic" :class="{'diagnostics-ok': diagnostic.ok,'diagnostics-error': !diagnostic.ok}">
            <div class="row">
              <div class="card-body">
                  <strong>Plantilla: {{path}}</strong>
                <br>
                <strong>Error: {{diagnostic.msg}}</strong>
                <br>
                <strong>Linea: {{diagnostic.line}}</strong>
                <br>
                <div>
                  <strong>Contenido: {{ diagnostic.line_content }}</strong>
                </div>
                <br>
              </div>
            </div>
              
          </div>
      </div>
      </div>
</div>
</template>

<script>
import {usePoolDiagnostics} from "../store/usePoolDiagnostics";
import {useWasm} from "../store/useWasm";
import {useFileDrawer} from "../store/useFileDrawer";
import {mapState, mapActions} from 'pinia';
export default {
  name: 'Diagnostics',
  computed: {
    ...mapState(usePoolDiagnostics, ['diagnostics']),
  },
  methods:{
  ...mapActions(useWasm, ['wasmInit']),
  ...mapActions(useFileDrawer, ['fetchUrlFiles']),
  },
  async mounted(){
    await this.wasmInit();
    this.fetchUrlFiles();
  }
}
</script>

<style>
.diagnostics-container{
  
}
.diagnostics-ok{
  background: rgb(173, 230, 180);
}
.diagnostics-error{
  background: rgb(230, 173, 173);
}
</style>

