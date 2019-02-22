<template>
  <div class="button-create">
    <b-button @click.prevent="logout" class="button-modal-create float-right mt-3 mr-4 btn-secondary" >Logout</b-button>
    <b-button class="button-modal-create float-right mt-3 mr-4 btn-info" v-b-modal.modalPrevent>Create Room</b-button>

    <!-- Modal Component -->
    <b-modal
      id="modalPrevent"
      ref="modal"
      title="Room Name"
      @ok="handleOk"
      @shown="clearName"
    >
      <form @submit.stop.prevent="createRoom">
        <b-form-input type="text" placeholder="Enter room name" v-model="roomName"/>
      </form>
    </b-modal>
  </div>
</template>

<script>
import db from '@/script/config.js'
import swal from 'sweetalert'
import { mapState } from 'vuex'

export default {
  name: 'newRoom',
  data () {
    return {
      roomName: '',
      statusRoom: false,
      player1: localStorage.getItem('username'),
      point1: 0,
      player2: null,
      point2: 0
    }
  },
  methods: {
    clearName () {
      this.roomName = ''
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.roomName) {
        swal('Oops!', 'Please enter room name', 'error')
      } else {
        this.createRoom()
      }
    },
    createRoom: function (val) {
      this.$store.dispatch('createNewRoom', { ...this })
      // clear roomName and close modal
      this.clearName()
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
