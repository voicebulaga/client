import Vue from 'vue'
import Vuex from 'vuex'
import db from './script/config'
import swal from 'sweetalert'
import router from '@/router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    roomId: '',
    questions: '',
    player1: '',
    player2: '',
    point1: 0,
    point2: 0,
    username: null,
    statursRoom: false
  },
  mutations: {
    createNewRoom (state, payload) {
      state.roomId = payload.id
      state.statusRoom = payload.statusRoom
      state.player1 = payload.player1
    },
    register (state, name) {
      state.username = name
    },
    getRoomsMut (state, data) {
      state.rooms = data
    },
    setPlayer2 (state, player2) {
      state.player2 = player2
    },
    getQuestions (state, payload) {
      state.questions = payload
    }
  },
  actions: {
    createNewRoom ({ commit, dispatch }, room) {
      // console.log(room);
      let res = {
        title: room.roomName,
        player1: localStorage.getItem('username'),
        player2: room.player2,
        statusRoom: room.statusRoom,
        point1: room.point1,
        point2: room.point2,
        ques: 0
      }

      db.collection('rooms').add(res)
        .then(function (docRef) {
          console.log(docRef.id, `--- docRef.id`)
          router.push({ name: 'room', params: { id: docRef.id } })
          commit('createNewRoom', {
            id: docRef.id,
            statusRoom: res.statusRoom,
            player1: res.player1
          })
        })
        .catch(function (err) {
          console.log(err)
          // swal('Oops!', err, 'error')
        })
    },
    register ({ commit, dispatch }, name) {
      if (name) {
        localStorage.setItem('username', name)
        dispatch('getRoomsAct')
        commit('register', name)
      }
    },
    getRoomsAct (context) {
      db.collection('rooms').onSnapshot(querySnapshot => {
        let rooms = []
        querySnapshot.forEach(doc => {
          rooms.push({ id: doc.id, ...doc.data() })
        })
        context.commit('getRoomsMut', rooms)
      })
    },
    getOneRoom ({ commit }, id) {

    },
    joinRoomAct ({ commit }, roomId) {
      db
        .collection('rooms')
        .doc(roomId)
        .onSnapshot(function (data) {
          var roomData = data.data()
          if (roomData.player2) {
            console.log('sudah ada player', roomData.player2)
          } else if (!roomData.player2) {
            console.log('belum ada player', roomData.player2)
            db.collection('rooms')
              .doc(roomId)
              .update({
                player2: localStorage.getItem('username'),
                statusRoom: true
              })
              .then(() => {
                console.log('MADSUK')
                commit('setPlayer2', localStorage.username)
              })
            if (roomData.statusRoom) {
              alert('roomFull')
            }
          }
        })
    },
    pluspoint ({ commit }, roomId) {
      let self = this.state
      if (localStorage.getItem('username') === self.player2) {
        console.log('selfplayer2', self.player2)
        self.point2 += 20
        db.collection('rooms').doc(roomId)
          .update({
            point2: self.point2,
            ques: self.ques + 1
          })
      } else {
        console.log('selfplayer1')
        self.point1 += 20
        db.collection('rooms').doc(roomId)
          .update({
            point1: self.point1,
            ques: self.ques + 1
          })
      }
    },
    getQuestions ({ commit }) {
      let allQuestions = []
      db.collection('questions').onSnapshot(snapshot => {
        snapshot.forEach(data => {
          allQuestions.push(data.data())
        })
      })
      commit('getQuestions', allQuestions)
    }
  }
})
