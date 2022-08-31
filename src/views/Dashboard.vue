<template>
  <div class="grid-container">
    <TopBar/>
    <Header/>
    <Sidebar/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import Header from "../components/Header.vue";
import Sidebar from '../components/Sidebar.vue';
import Main from '../components/Main.vue';
import Footer from "../components/Footer.vue";

export default {
  name: 'Dashboard',
  components: {
    TopBar,
    Header,
    Sidebar,
    Main,
    Footer
  }
}
</script>

<style>

</style>
