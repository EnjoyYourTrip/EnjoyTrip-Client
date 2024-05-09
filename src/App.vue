<template>
  <!--상단 nav-bar-->
  <Navbar/>
  <!--라우터로 설정한 컴포넌트들-->
  <router-view></router-view>  

</template>
<script>
import Navbar from './components/Navigation/Nav-bar.vue';

export default {

  name: 'App',
  components: {
    Navbar,
  
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
