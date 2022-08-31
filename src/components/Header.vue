<template>
  <header class="header bg-light ">
    <!-- Navbar Start -->
    <div class="container-fluid">
      <div class="row pt-2 pb-2">
        <div class="d-flex justify-content-between">
          <div class="escudo-uemex">
            <router-link to="/" data-bs-toggle="tooltip" data-bs-placement="top" title="Inicio">
              <img src="../assets/logo-transparent.png" class="img-fluid" alt="fs" width="200">
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Navbar End -->
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>
