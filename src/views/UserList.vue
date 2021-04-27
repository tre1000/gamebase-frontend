<template>
  <div class="user-page">
    <div v-for="userGame in userGames" :key="userGame.id">
      <h1>{{ userGame.game_info.title }}</h1>
      <router-link v-bind:to="`/games/${userGame.game_info.id}`">
        <img v-bind:src="`${userGame.game_info.box_art}`" class="box_art" />
      </router-link>
      <br />
      <h3>{{ userGame.status }}</h3>
      <!-- <select v-model="selectedStatuses[userGame.id]" name="status" id="status">
        <option value="plan to play">Plan To Play</option>
        <option value="playing">Playing</option>
        <option value="completed">Completed</option>
        <option value="dropped">Dropped</option>
        <option value="on hold">On Hold</option>
      </select> -->
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
    };
  },
  created() {
    this.indexUserGames();
    this.setUserId();
  },
  methods: {
    indexUserGames: function () {
      axios.get("/api/user_games/" + this.$route.params.id).then((response) => {
        this.userGames = response.data;
      });
    },
    setUserId: function () {
      this.userId = localStorage.getItem("user_id");
    },
  },
};
</script>
