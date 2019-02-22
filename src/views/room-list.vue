<template>
    <div id="roomList" class="vh-100">
        <!-- navbar dari there -->
        <RoomList></RoomList>
    </div>
</template>

<script>
    import RoomList from '@/components/list.vue'
    import db from '@/script/config.js'
    // import { mapState } from 'vuex';

    export default {
        created() {
            this.$store.dispatch('getRoomsAct')
        },
        computed: {

        },
        components: {
            RoomList
        }
    }
</script>

<style>

</style>


