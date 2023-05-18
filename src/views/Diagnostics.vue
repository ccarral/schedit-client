<template>
  <div class="diagnostics-container">
    <div v-for="[path, diagnostic] of diagnostics" :key="path" class="diagnostic">
        <strong>file: {{path}}</strong>
        <br>
        <strong>Error: {{diagnostic.msg}}</strong>
        <br>
        <strong>Linea: {{diagnostic.line}}</strong>
        <br>
        <div>
          line contents: {{ diagnostic.line_content }}
        </div>
        <br>
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
  background: lightblue;
}
</style>
