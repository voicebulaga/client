<template>
  <div class="home">
    <newRoom/>
    <register v-if="!username"/>
    <waiting />
  </div>
</template>

<script>
import newRoom from '@/components/formNewRoom.vue'
import register from '@/components/register.vue'
import { mapState } from 'vuex'
import waiting from '@/components/waiting.vue'

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
  ]),
}
</script>
