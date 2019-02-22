<template>
  <div class="game-room">
    <waiting v-if="!player2"/>
    <div class="searchbar container" v-else>
      <input
        v-model="answer"
        class="search_input form-control"
        value
        type="text"
        name
        placeholder="Search..."
        id="searchTitle"
      >
      <button type="button" class="btn btn-secondary">
        <i class="fas fa-check-circle"></i>
      </button>
      <button @click.prevent="record" type="button" class="btn btn-secondary">
        <i class="fas fa-microphone"></i>
      </button>

    </div>

    <div>{{questions}}</div>
  </div>
</template>

<script>
import newRoom from '@/components/formNewRoom.vue'
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
        const speechToText = event.results[0][0].transcript
        this.answer = speechToText
      }
      recognition.onspeechend = function () {
        recognition.stop()
      }
    },
  },
  created () {
    this.$store.dispatch('getQuestions')
    console.log(`this.question....`, this.question)
    this.$store.dispatch('getOneRoom', this.$route.params.id)
    console.log(this.player2, '================')
  },
  watch: {
      'route' (val) {
        this.$store.dispatch('getOneRoom', this.$route.params.id)
      }
  },
  computed: mapState(['player1', 'player2', 'point1', 'point2', 'roomId','questions'])
}
</script>

<style>

</style>
