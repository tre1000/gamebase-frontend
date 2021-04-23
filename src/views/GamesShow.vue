<template>
  <div class="game-page">
    <div>
      <button v-on:click="test()">Test</button>
      <h1>{{ game.title }}</h1>
      <img class="box_art" v-bind:src="`${game.box_art}`" alt="No box art" />
      <hr />
      <select v-model="selectedStatus" name="status" id="status">
        <option value="" disabled selected>--Status--</option>
        <option value="plan to play">Plan To Play</option>
        <option value="playing">Playing</option>
        <option value="completed">Completed</option>
        <option value="dropped">Dropped</option>
        <option value="on hold">On Hold</option>
      </select>
      <button v-on:click="addGameToList()">Add To List</button>
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
      selectedStatus: "",
      rating: "8",
      completionHours: 0,
      completionMinutes: 0,
      instance: [],
    };
  },
  created: function () {
    this.showGame();
  },
  mounted: function () {
    this.generateInstance();
  },
  methods: {
    showGame: function () {
      axios.get("/api/games/" + this.$route.params.id).then((response) => {
        this.game = response.data;
      });
    },
    generateInstance: function () {
      this.instance = [localStorage.getItem("user_id"), this.$route.params.id];
    },
    addGameToList: function () {
      var params = {
        user_id: localStorage.getItem("user_id"),
        game_id: this.game.id,
        status: this.selectedStatus,
        review: this.review,
        completion_hours: this.completionHours,
        completion_minutes: this.completionMinutes,
        instance: this.instance,
      };
      axios
        .post("/api/user_games", params)
        .then((response) => {
          console.log("Game added to list!", response.data);
        })
        .catch((error) => console.log(error.response.data));
    },
    test: function () {
      console.log(this.selectedStatus);
      console.log(localStorage.getItem("user_id"));
      console.log(this.game.id);
      console.log(this.instance);
    },
  },
};
</script>
