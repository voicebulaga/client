<template>
  <div class="game-room">
    <waiting v-if="!player2"/>

    <div v-else>
      <div class="mx-auto text-center">
        <br>
        <br>
        <h1>{{ questions[ques].question }}</h1>
        <div no-body class="overflow-hidden mx-auto" style="max-width: 500px;">
          <b-card-img :src="questions[ques].image" class="rounded-0"/>
        </div>
      </div>
      <br>
      <br>

      <center>
          <div>
          <div class="searchbar container" style="max-width: 30%; display:inline-block;">
          <input
            v-model="answer"
            class="search_input form-control"
            value
            type="text"
            name
            placeholder="Input text.."
            id="searchTitle"
          >
          </div>
          <button type="button" class="btn btn-secondary" style="border-radius: 40%">
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </center>
      <br>
      <center><button
          @click.prevent="record"
          type="button"
          class="btn btn-secondary"
          style="border-radius: 40%;"
        >
          <img src="https://img.icons8.com/cotton/40/000000/micro.png">
        </button>
      </center>
    </div>
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
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.start()
      recognition.onresult = event => {
        const speechToText = event.results[0][0].transcript
        this.answer = speechToText
      }
      recognition.onspeechend = function () {
        recognition.stop()
      }
    }
  },
  created () {
    this.$store.dispatch('getQuestions')
    console.log(`this.question....`, this.question)
    this.$store.dispatch('getOneRoom', this.$route.params.id)
    console.log(this.player2, '================')
  },
  watch: {
    route (val) {
      this.$store.dispatch('getOneRoom', this.$route.params.id)
    }
  },
  computed: mapState([
    'player1',
    'player2',
    'point1',
    'point2',
    'roomId',
    'questions',
    'ques'
  ])
}
</script>

<style>
</style>
