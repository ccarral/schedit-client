<template>
  <div>
    <div class="row">
      <div class="text-center">
        <div class="dropzone p-3" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive"
             @dragover.prevent
             @drop.prevent="dropFile"
             :class="activeDrop"
        >
          <i class="fa-solid fa-cloud-arrow-up fs-1 text-info text-opacity-50"></i>
          <h5>Arrastrar y suelta archivos para cargar</h5>
          <small>Sus archivos se agregarán automáticamente</small>
          <h6 class="m-3">Ó</h6>
          <div class="m-3">
            <label for="file" class="btn btn-success" :class="{'btn btn-light': activeDropzone}"><i
                class="fa-solid fa-file-arrow-up"></i> Seleccione
              archivos</label>
            <input type="file" class="d-none" v-on:change="loadFiles" id="file" multiple accept=".csv">
          </div>

        </div>
        <div class="text-start text-muted">Solo archivos .csv menor a 3MB</div>
      </div>
    </div>
    <div class="row p-0 my-1">
      <div>
        <ul class="nav flex-column">
          <li class="nav-item" v-for="file in arrayFiles" :key="file">
            <div class="container border border-2 rounded bg-light p-3 my-1 text-start file">
              <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10">
                  <i class="fa-solid fa-file-csv text-success fs-4"></i> {{
                    file.name
                  }}
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2">
                  <i class="fa-solid fa-trash hover-trash"
                  @click.prevent="deleteFile(file)"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {usePoolStore} from "../store/usePools";
import {useFileStore} from "../store/useFile.ts";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "LoadFile",
  data() {
    return {
      activeDropzone: false,
    }
  },
  methods: {
    ...mapActions(useFileStore, ['addAllFiles', 'deleteFile', 'addFile']),
    toggleActive() {
      this.activeDropzone = this.activeDropzone !== true;
    },
    async loadFiles(event) {
      const files = event.target.files;
      for (const file of files) {
          try {
            await this.addFile(file);
          } catch (e) {
            createToast(e.message, {
              type: 'danger',
              position: 'top-center',
              timeout: 4000,
              showIcon: true
            });
          }
      }
    },
    async dropFile(event) {
      const files = event.dataTransfer.files;
      for (const file of files) {
        try{
            await this.addFile(file);
        }catch(e){
            createToast(e.message, {
              type: 'danger',
              position: 'top-center',
              timeout: 4000,
              showIcon: true
            });
            return;
        }
      }
      this.toggleActive()
    },
  },
  computed: {
    // mapeamos los archivos cargados
    ...mapState(useFileStore, ['arrayFiles']),
    activeDrop() {
      return (this.activeDropzone) ? 'bg-success active-dropzone' : '';
    }
  }
}
</script>

<style scoped>

</style>
