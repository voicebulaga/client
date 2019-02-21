import Vue from 'vue'
import Vuex from 'vuex'
import db from './script/config'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    roomId: '',
    question: '',
    player1: '',
    player2: '',
    point1: 0,
    point2: 0
  },
  mutations: {
    createNewRoom (state, payload) {
      state.roomId = payload.id
      state.statusRoom = payload.statusRoom
      state.player1 = payload.player1
    }

  },
  actions: {
    createNewRoom ({ commit }, room) {
      console.log(`----room`, room)
      let res = {
        title: room.roomName,
        player1: localStorage.getItem('username'),
        player2: room.player2,
        statusRoom: room.statusRoom,
        point1: room.point1,
        point2: room.point2
      }
      db.collection('rooms').add(res)
        .then(function (docRef) {
          commit('createNewRoom', {
            id: docRef.id,
            statusRoom: res.statusRoom,
            player1: res.player1
          })
        })
        .catch(function (err) {
          swal('Oops!', err, 'error')
        })
    }
  }
})