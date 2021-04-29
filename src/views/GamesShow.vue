<template>
  <div class="game-page">
    <div>
      <!-- <button @click="test()">Test</button> -->
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
          <div v-if="isGameOnList()">
            <button v-on:click="updateList()">Update list</button>
            <br />
            <div v-if="currentStatus === 'completed' || currentStatus === 'dropped'">
              <button v-on:click="showReviewModal()">Rate/Review</button>
            </div>
          </div>
          <button v-else v-on:click="addGameToList()">Add To List</button>
        </div>

        <!-- modals -->
        <div>
          <dialog id="leave-review">
            <form method="dialog">
              <h1>Rate/Review</h1>
              <p>Rating:</p>
              <select v-model="rating" name="rating" id="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <p>Review:</p>
              <textarea v-model="review"></textarea>
              <br />
              <button v-on:click="updateList()">Submit</button>
              <br />
              <button>Exit</button>
            </form>
          </dialog>
        </div>
        <!-- end modals -->
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
//This is a mess. Please refactor
import axios from "axios";
export default {
  data: function () {
    return {
      game: {},
      selectedStatus: "",
      currentStatus: "",
      completionHours: 0,
      completionMinutes: 0,
      instance: [],
      userGameIds: [],
      userGames: [],
      userGameInstanceId: null,
      review: null,
      rating: null,
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
            this.currentStatus = this.userGames[userGame].status;
            this.review = this.userGames[userGame].review;
            this.rating = this.userGames[userGame].rating;
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
        completion_hours: this.completionHours,
        completion_minutes: this.completionMinutes,
        instance: this.instance,
      };
      axios
        .post("/api/user_games", params)
        .then((response) => {
          console.log("Game added to list!", response.data);
          this.setStatus();
          this.userGameIds.push(this.game.id);
        })
        .catch((error) => console.log(error.response.data));
    },
    updateList: function () {
      var params = {
        status: this.selectedStatus,
        review: this.review,
        rating: this.rating,
      };
      axios.patch("/api/user_games/" + this.userGameInstanceId, params).then((response) => {
        console.log(response.data);
        this.setStatus();
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
    showReviewModal: function () {
      document.querySelector("#leave-review").showModal();
    },
    test: function () {
      console.log(this.userGameIds);
      console.log(this.isGameOnList());
      console.log(this.userGameInstanceId);
    },
  },
};
</script>
