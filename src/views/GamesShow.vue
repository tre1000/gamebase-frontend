<template>
  <div class="game-page">
    <div>
      <button @click="test()">Test</button>
      <h1>{{ game.title }}</h1>
      <img class="box_art" v-bind:src="`${game.box_art}`" alt="No box art" />
      <hr />
      <div v-if="userIsLoggedIn()">
        <select v-model="selectedStatus" name="status" id="status">
          <option value="plan to play">Plan To Play</option>
          <option value="playing">Playing</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
          <option value="on hold">On Hold</option>
        </select>
        <!-- conditional button -->
        <div>
          <button v-if="isGameOnList()" v-on:click="updateList()">Update list</button>
          <button v-else v-on:click="addGameToList()">Add To List</button>
        </div>
      </div>
      <!-- end conditional button -->
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
      userGameIds: [],
      userGames: [],
      userGameInstanceId: null,
    };
  },
  created: function () {
    this.showGame();
    this.getUserGamesIdList();
    this.setStatus();
  },
  mounted: function () {
    this.generateInstance();
  },
  updated: function () {
    this.getUserGamesIdList();
    this.isGameOnList();
  },
  methods: {
    showGame: function () {
      axios.get("/api/games/" + this.$route.params.id).then((response) => {
        this.game = response.data;
      });
    },
    setStatus: function () {
      axios.get("/api/user_games/" + localStorage.getItem("user_id")).then((response) => {
        this.userGames = response.data;
        for (var userGame in this.userGames) {
          if (this.userGames[userGame].game_id === this.game.id) {
            this.selectedStatus = this.userGames[userGame].status;
            this.userGameInstanceId = this.userGames[userGame].id;
          }
        }
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
    updateList: function () {
      var params = {
        status: this.selectedStatus,
      };
      axios.patch("/api/user_games/" + this.userGameInstanceId, params).then((response) => {
        console.log(response.data);
      });
    },
    getUserGamesIdList: function () {
      axios.get("/api/user_games/" + localStorage.getItem("user_id")).then((response) => {
        this.userGameIds = [];
        for (var game in response.data) {
          this.userGameIds.push(response.data[game].game_id);
        }
      });
    },
    isGameOnList: function () {
      for (var i = 0; i < this.userGameIds.length; i++) {
        if (this.userGameIds[i] === this.game.id) {
          return true;
        }
      }
      return false;
    },
    userIsLoggedIn: function () {
      if (localStorage.getItem("user_id") !== null) {
        return true;
      }
    },
    test: function () {
      console.log(this.userGameIds);
      console.log(this.isGameOnList());
      console.log(this.$route.params.id);
      console.log(this.selectedStatus);
      console.log(localStorage.getItem("user_id") === null);
      console.log(this.userGameInstanceId);
    },
  },
};
</script>
