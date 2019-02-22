<template>
    <div class="game-room">
        <div class="searchbar container">
            <input v-model="answer" class="search_input form-control" value="" type="text" name="" placeholder="Search..." id="searchTitle">
            <button type="button" class="btn btn-secondary"><i class="fas fa-check-circle"></i></button>
            <button @click.prevent="record" type="button" class="btn btn-secondary"><i class="fas fa-microphone"></i></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'room',
    data () {
        return {
            answer: ''
        }
    },
    methods: {
        record () {
            window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.start();
            recognition.onresult = (event) => {
                console.log('==============')
                const speechToText = event.results[0][0].transcript;
                console.log(speechToText,"=======");
                this.answer = speechToText
            }
            recognition.onspeechend = function() {
                recognition.stop();
            }
        },

    },
    created () {
    }
}

</script>

<style>

</style>
