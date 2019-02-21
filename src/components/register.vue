<template>
    <div class="register">

        <form @submit.prevent="regis" class="regis-form container">
        <fieldset class="text-white">
            <legend class="text-center">Register</legend>
            <hr style="padding: 0; background-color: white;margin-top: 0.3rem">
            <div class="form-group">
                <label for="exampleInputEmail1">Name: </label>
                <input v-model="name" type="text" class="form-control" placeholder="Enter name">
            </div>
            <button type="submit" class="btn btn-secondary mt-3 float-right">Submit</button>
        </fieldset>
        </form>

    </div>
</template>

<script>
import alertify from 'alertifyjs'

export default {
  name: 'register',
  data () {
      return {
          name: ''
      }
  },
  methods: {
      regis () {
          if (this.name === '') {
              alertify.error('Please fill your name')
          } else {
              this.$store.dispatch('register', this.name)
              this.name = ''
          }
      }
  }
}
</script>

<style>

</style>
