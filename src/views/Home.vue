<template>
  <div class="home vh-100" id="roomList">
      <div v-if="username">
        <newRoom/>
        <RoomList></RoomList>
      </div>
      <div v-else>
        <register/>
      </div>
    <div class="home">
      <newRoom/>
      <register v-if="!username"/>
      <waiting v-if="username"/>
    </div>
  </div>
</template>

<script>
import newRoom from '@/components/formNewRoom.vue'
import register from '@/components/register.vue'
import room from '@/components/room.vue'
import RoomList from '@/components/list.vue'
import { mapState } from 'vuex'
import db from '@/script/config.js'

export default {
  name: 'home',
  components: {
    newRoom,
    register,
    room,
    RoomList
  },
  created () {
    if (!localStorage.username) {
      this.$store.dispatch('register', null)
    } else {
      this.$store.dispatch('getRoomsAct')
      this.$store.dispatch('register', localStorage.username)
    }
  },
  computed: mapState([
    'username'
  ])
}

</script>
