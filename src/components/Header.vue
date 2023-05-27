<template>
  <header class="header bg-light ">
    <!-- Navbar Start -->
    <div class="container-fluid">
      <div class="row pt-2 pb-2">
        <div class="d-flex justify-content-between">
          <div class="escudo-uemex">
            <router-link :to="{ name: 'Dashboard', query: $route.query }" data-bs-toggle="tooltip" data-bs-placement="top" title="Inicio">
              <img src="../assets/logo-transparent.png" class="img-fluid" alt="fs" width="200">
            </router-link>
            <router-link v-if="errorExists" :to="{ name: 'Diagnostics', query: $route.query }" class="btn btn-danger float-right mt-2 diagnostics-button">
               Ir a diagnósticos 
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Navbar End -->
  </header>
</template>

<script>
import {mapState} from 'pinia';
import {usePoolDiagnostics} from "../store/usePoolDiagnostics";

export default {
  name: 'Header',
  computed:{
    ...mapState(usePoolDiagnostics, ['diagnostics']),
    errorExists(){
        for (const [_file, diagnostic] of this.diagnostics){
            if(!diagnostic.ok){
                return true;
            }
        }
        return false;
    }
  }
}
</script>

<style>
.diagnostics-button{
    text-align: right;
    float:right;
    margin-left: 10vw;
}
</style>
