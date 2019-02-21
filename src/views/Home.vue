<template>
  <div class="home">
    <newRoom/>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import newRoom from '@/components/formNewRoom.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    newRoom
  }
}
</script>
