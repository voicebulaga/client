<template>
  <div class="home">
    <newRoom/>
    <register v-if="!username"/>
    <waiting/>
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import newRoom from '@/components/formNewRoom.vue'
import register from '@/components/register.vue'
import { mapState } from 'vuex'
import waiting from '@/components/waiting.vue'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import db from '@/script/config.js'

export default {
  name: 'home',
  components: {
    newRoom,
    register,
    waiting
  },
  created () {
    if (!localStorage.username) {
      this.$store.dispatch('register', null)
    } else {
      this.$store.dispatch('register', localStorage.username)
    }
  },
  computed: mapState([
    'username'
  ])
}
</script>
