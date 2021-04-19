<template>
  <div class="home">
    <div v-for="game in games" :key="game.id">
      <router-link v-bind:to="`/games/${game.id}`">
        <img v-bind:src="`${game.box_art}`" class="box_art" />
      </router-link>
    </div>
  </div>
</template>

<style>
.box_art {
  height: 325px;
  width: 275px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
      games: [],
    };
  },
  created: function () {
    this.indexGames();
  },
  methods: {
    indexGames: function () {
      axios.get("/api/games").then((response) => {
        this.games = response.data;
      });
    },
  },
};
</script>
