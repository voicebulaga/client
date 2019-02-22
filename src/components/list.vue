<template>
    <div>
        <div class=" d-flex justify-content-center">
            <b-card-group deck v-for="room in rooms" :key="room.id" class="mx-3 my-3">
                <b-card bg-variant="dark" :header="room.title" text-variant="white" class="text-center">
                    <b-card-text>
                        <img src="https://img.icons8.com/color/48/000000/voice-recognition-scan.png" height="100px" alt="">
                        <br>
                        <button class="btn plyr">Player 1</button> <button class="btn">Player 2</button> <br>
                        Player list: <br>
                        {{ room.player1 }} <br>
                        {{ room.player2 }}
                    </b-card-text>
                    <button class="btn btn-primary">Join</button>
                    <!-- <button class="btn btn-secondary">Join</button> -->
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
// import db from '@/script/config.js'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'rooms'
    ])
  }
}
</script>

<style>
    .btn {
        color: #64E94F;
    }
</style>
