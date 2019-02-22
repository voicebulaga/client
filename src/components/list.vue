<template>
    <b-card-group columns class="mx-3 my-3">
        <b-card  v-for="room in rooms" :key="room.id"  :header="room.title" text-variant="white" class="text-center rooms">
            <b-card-text>
                <div class="row">
                    <div class="col">
                        <h4 class="player-name">
                            {{ room.player1 }}
                        </h4>
                    </div>
                    <div class="col">
                        <img class="player-avatar" src="../assets/vs.png">
                    </div>
                    <div class="col">
                        <h4 class="player-name">
                            {{ room.player2 }}
                        </h4>
                    </div>
                </div>
            </b-card-text>
            <button v-if="!room.statusRoom || room.player2 == ''" @click.prevent="join(room)" class="btn btn-secondary">Join</button>
            <div v-else-if="room.player2">
                room full...
            </div>
        </b-card>
    </b-card-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'list',
  computed: {
    ...mapState(['rooms'])
  },
  methods: {
    join (room) {
      this.$store.dispatch('joinRoomAct', room.id)
      this.$router.push({ name: 'room', params: { id: room.id } })
    }
  }
}
</script>

<style>
</style>
