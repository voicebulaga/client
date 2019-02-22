<template>
    <div class="game-room">
        <waiting v-if="player2"/>
        <div class="searchbar container">
            <input v-model="answer" class="search_input form-control" value="" type="text" name="" placeholder="Search..." id="searchTitle">
            <button type="button" class="btn btn-secondary"><i class="fas fa-check-circle"></i></button>
            <button @click.prevent="record" type="button" class="btn btn-secondary"><i class="fas fa-microphone"></i></button>
        </div>
    </div>
</template>

<script>
import waiting from '@/components/waiting.vue'
import { mapState } from 'vuex'

export default {
  name: 'room',
  components: {
    waiting
  },
  data () {
    return {
      answer: ''
    }
  },
  methods: {
    record () {
      window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.start()
      recognition.onresult = (event) => {
        console.log('==============')
        const speechToText = event.results[0][0].transcript
        console.log(speechToText, '=======')
        this.answer = speechToText
      }
      recognition.onspeechend = function () {
        recognition.stop()
      }
    }

  },
  created () {
  },
  computed: mapState(['player1', 'player2', 'point1', 'point2'])
}

</script>

<style>

</style>
