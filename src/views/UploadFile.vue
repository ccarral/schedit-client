<template>
  <Load :loading="isLoading"/>
  <div v-if="!isLoading">
    <TopBar/>
    <Header/>
    <main class="upload-file">
      <section>
        <div class="container">
          <LoadFile/>
          <div class="row p-4">
            <router-link to="/dashboard" class="btn btn-primary text-white align-middle" :class="nullFile">
            Continuar
            <i class="fa-solid fa-arrow-right-long"></i>
            </router-link>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useFileStore} from "../store/useFile.ts";
import {useWasm} from "../store/useWasm";
import Load from "../components/Load.vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import TopBar from "../components/TopBar.vue";
import LoadFile from "../components/LoadFile.vue";

export default {
  name: 'UploadFile',
  components: {
    LoadFile,
    TopBar,
    Load,
    Header,
    Footer,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  async mounted() {
    await this.wasmInit();
    this.isLoading = !this.wasmReady;
  },
  methods:{
    ...mapActions(useWasm, ['wasmInit']),
  },
  computed: {
    // Mapeamos los archivos cargados
    ...mapState(useFileStore, ['arrayFiles']),
    ...mapState(useWasm, ['wasmReady']),
    nullFile() {
      return this.arrayFiles.length === 0 ? 'disabled' : '';
    }
  }
}
</script>

<style>


</style>
