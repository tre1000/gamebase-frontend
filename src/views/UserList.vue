<template>
  <div class="user-page">
    <div v-for="userGame in userGames" :key="userGame.id">
      <router-link v-bind:to="`/games/${userGame.game_info.id}`">
        <img v-bind:src="`${userGame.game_info.box_art}`" class="box_art" />
      </router-link>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      userGames: [],
    };
  },
  created: function () {
    this.indexUserGames();
  },
  methods: {
    indexUserGames: function () {
      axios.get("/api/user_games/" + this.$route.params.id).then((response) => {
        this.userGames = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>
