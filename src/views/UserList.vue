<template>
  <div class="user-page">
    <button v-on:click="displaySelectedStatuses()">Test</button>
    <div v-for="userGame in userGames" :key="userGame.id">
      <router-link v-bind:to="`/games/${userGame.game_info.id}`">
        <img v-bind:src="`${userGame.game_info.box_art}`" class="box_art" />
      </router-link>
      <br />
      <h3>{{ userGame.status }}</h3>
      <select v-model="selectedStatuses[userGame.id]" name="status" id="status">
        <option value="plan to play">Plan To Play</option>
        <option value="playing">Playing</option>
        <option value="completed">Completed</option>
        <option value="dropped">Dropped</option>
        <option value="on hold">On Hold</option>
      </select>
      <!-- figure out why this isnt working -->
      <div v-if="selectedStatuses[userGame.id] !== currentStatuses[userGame.id]">
        <button>Update</button>
      </div>
      <h3 v-if="userGame.status === 'completed' || userGame.status === 'dropped'">
        User rating: {{ userGame.rating }}
      </h3>
      <hr />
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
      userId: null,
      selectedStatuses: {},
      currentStatuses: {},
    };
  },
  created() {
    this.indexUserGames();
    this.setUserId();
  },
  // mounted() {
  //   this.populateObjects();
  // },
  // updated() {
  //   this.indexUserGames();
  //   this.populateObjects();
  // },
  methods: {
    indexUserGames: function () {
      axios.get("/api/user_games/" + this.$route.params.id).then((response) => {
        this.userGames = response.data;
        for (var i = 0; i < this.userGames.length; i++) {
          this.currentStatuses[response.data[i]["id"]] = response.data[i]["status"];
          this.selectedStatuses[response.data[i]["id"]] = response.data[i]["status"];
        }
      });
    },
    setUserId: function () {
      this.userId = localStorage.getItem("user_id");
    },
    displaySelectedStatuses() {
      console.log(this.selectedStatuses);
      console.log(this.currentStatuses);
      // console.log(this.currentStatuses);
      // console.log(this.userId);
      // console.log(this.userGames);
    },
  },
};
</script>
