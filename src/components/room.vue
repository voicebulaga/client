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
          <button
            @click="addPointAndCheckWinner"
            type="button"
            class="btn btn-secondary"
            style="border-radius: 40%"
          >
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </center>
      <br>
      <center>
        <button
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
import newRoom from "@/components/formNewRoom.vue";
import waiting from "@/components/waiting.vue";
import { mapState } from "vuex";
import alertify from 'alertifyjs'

export default {
  name: "room",
  components: {
    waiting
  },
  data() {
    return {
      answer: ""
    };
  },
  methods: {
    record() {
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.start();
      recognition.onresult = event => {
        const speechToText = event.results[0][0].transcript;
        this.answer = speechToText;
      };
      recognition.onspeechend = function() {
        recognition.stop();
      };
    },
    addPointAndCheckWinner() {
      //kalo ques-nya udah 10, cek siapa pemenangnya abis itu delete roomnya
      if (this.ques == this.questions.length - 1) {
        if (localStorage.getItem('username') === this.player1) {
          if (this.point1 > this.point2) {
            alertify.message(`Congratulations ${localStorage.getItem('username')} you won the game`)
          } else if (this.point1 === this.poin2) {
            alertify.message(`DRAW!`)
          } else {
            alertify.message(`Sorry ${localStorage.getItem('username')} you lose. You can try it again anytime!`)
          }
        } else {
          if (this.point1 < this.point2) {
            alertify.message(`Congratulations ${localStorage.getItem('username')} you won the game`)
          } else if (this.point1 === this.poin2) {
            alertify.message(`DRAW!`)
          } else {
            alertify.message(`Sorry ${localStorage.getItem('username')} you lose. You can try it again anytime!`)
          }          
        }
        this.answer = ''
        this.$store.dispatch("pluspoint", this.$route.params.id);
      } else {
        if (this.questions[this.ques].answer.toLowerCase() === this.answer.toLowerCase()) {
          this.$store.dispatch("pluspoint", this.$route.params.id);
          alertify.message('Great!')
        } else {
          alertify.message('You are wrong, please try another anwer!')
        }
        this.answer = ''
      }
    }
  },
  created() {
    this.$store.dispatch("getQuestions");
    console.log(`this.question....`, this.questions);
    this.$store.dispatch("getOneRoom", this.$route.params.id);
    console.log(this.player2, "================");
  },
  watch: {
    '$route'(val) {
      this.$store.dispatch("getOneRoom", this.$route.params.id);
    },
    player2 (val) {
      return val
    },
    ques (val) {
      if (val == this.questions.length) {
        this.$store.commit('setFinal')
      }
    },
    final (val) {
      if (val == true) {
        this.$store.dispatch("deleteRoom", this.$route.params.id);
      }
    }
  }, 
  computed: mapState([
    "player1",
    "player2",
    "point1",
    "point2",
    "roomId",
    "questions",
    "ques",
    'final'
  ])
};
</script>
