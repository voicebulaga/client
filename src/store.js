import Vue from 'vue'
import Vuex from 'vuex'
import db from './script/config'
// import swal from 'sweetalert'
import router from '@/router.js'
import alertify from 'alertifyjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

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
    },
    mutateAddUser (state, data) {
      state.player1 = data.player1
      state.player2 = data.player2
      state.point1 = data.point1
      state.point2 = data.point2
    },
    logout (state) {
      state.username = null
    }
  },
  actions: {
    createNewRoom ({ commit, dispatch }, room) {
      // console.log(room)
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
        })
    },
    register ({ commit, dispatch }, name) {
      if (name) {
        localStorage.setItem('username', name)
        dispatch('getRoomsAct')
        commit('register', name)
        alertify.message(`Welcome, ${localStorage.username}`)
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
      db.collection('rooms').doc(id)
        .onSnapshot(data => {
          let datum = data.data()
          commit('mutateAddUser', datum)
        })
    },
    joinRoomAct ({ commit, dispatch }, roomId) {
      db
        .collection('rooms')
        .doc(roomId)
        .onSnapshot(function (data) {
          var roomData = data.data()
          if (roomData.player2) {
            console.log('sudah ada player', roomData.player2)
          } else if (!roomData.player2) {
            if (localStorage.username !== roomData.player1) {
              console.log('belum ada player', roomData.player2)
              db.collection('rooms')
                .doc(roomId)
                .update({
                  player2: localStorage.getItem('username'),
                  statusRoom: true
                })
                .then(() => {
                  console.log('MADSUK')
                  dispatch('getOneRoom', roomId)
                  commit('setPlayer2', localStorage.username)
                })
              if (roomData.statusRoom) {
                alert('roomFull')
              }
            } else {
              router.push({ name: 'room', params: { id: roomId } })
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
    },
    logout ({ commit }) {
      var que = db.collection('rooms').where('player1', '==', localStorage.username)
      var que2 = db.collection('rooms').where('player2', '==', localStorage.username)
      que.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete()
        })
      })
      que2.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete()
        })
      })
      localStorage.removeItem('username')
      alertify.message(`Bye.. 😢😢`)
      commit('logout')
    }
  }
})
