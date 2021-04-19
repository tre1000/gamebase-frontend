<template>
  <div class="game-page">
    <div>
      <h1>{{ game.title }}</h1>
      <img class="box_art" v-bind:src="`${game.box_art}`" alt="No box art" />
      <h2>Average User Rating: {{ game.avg_user_rating }}</h2>
      <div>
        <h3>{{ game.about }}</h3>
        <p>{{ game.platforms }}</p>
        <p>{{ game.multiplayer }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.box_art {
  height: 325px;
  width: 275px;
}

.show_page {
  position: absolute;
  top: 200px;
  left: 0px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      game: {},
    };
  },
  created: function () {
    this.showGame();
  },
  methods: {
    showGame: function () {
      axios.get("/api/games/" + this.$route.params.id).then((response) => {
        this.game = response.data;
      });
    },
  },
};
</script>
