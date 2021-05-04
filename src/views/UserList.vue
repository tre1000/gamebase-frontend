<template>
  <!-- <div class="user-page">
    <div v-for="userGame in userGames" :key="userGame.id">
      <h1>{{ userGame.game_info.title }}</h1>
      <router-link v-bind:to="`/games/${userGame.game_info.id}`">
        <img v-bind:src="`${userGame.game_info.box_art}`" class="box_art" />
      </router-link>
      <br />
      <h3>{{ userGame.status }}</h3>
      <h3 v-if="userGame.status === 'completed' || userGame.status === 'dropped'">
        User rating: {{ userGame.rating }}
      </h3>
      <hr />
    </div>
  </div> -->
  <div class="home">
    <!-- <div v-for="game in games" :key="game.id">
      <router-link v-bind:to="`/games/${game.id}`">
        <img v-bind:src="`${game.box_art}`" class="box_art" />
      </router-link>
    </div> -->
    <!-- Review section -->
    <section class="review-section spad set-bg" data-setbg="img/review-bg.png">
      <div class="container">
        <div class="section-title">
          <!-- <div class="cata new">new</div> -->
          <h2>Playing</h2>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6" v-for="game in userGames" :key="game.id">
            <div class="review-item">
              <div class="review-cover set-bg" data-setbg="img/review/1.jpg">
                <router-link v-bind:to="`/games/${game.game_info.id}`">
                  <img v-bind:src="`${game.game_info.box_art}`" alt="no image" class="review-cover set-bg" />
                </router-link>

                <!-- change rating bubble color based on score -->
                <div v-if="game.rating < 6.0" class="score red">
                  {{ game.rating }}
                </div>
                <div v-else-if="game.rating >= 6.0 && game.rating < 8.0" class="score yellow">
                  {{ game.rating }}
                </div>
                <div v-else-if="game.rating >= 8.0" class="score green">
                  {{ game.rating }}
                </div>
                <!-- end conditional bubble color -->
              </div>
              <div class="review-text">
                <h5>{{ game.game_info.title }}</h5>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="review-section spad set-bg" data-setbg="img/review-bg.png">
      <div class="container">
        <div class="section-title">
          <!-- <div class="cata new">new</div> -->
          <h2>Completed</h2>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6" v-for="game in userGames" :key="game.id">
            <div class="review-item">
              <div class="review-cover set-bg" data-setbg="img/review/1.jpg">
                <router-link v-bind:to="`/games/${game.game_info.id}`">
                  <img v-bind:src="`${game.game_info.box_art}`" alt="no image" class="review-cover set-bg" />
                </router-link>

                <!-- change rating bubble color based on score -->
                <div v-if="game.rating < 6.0" class="score red">
                  {{ game.rating }}
                </div>
                <div v-else-if="game.rating >= 6.0 && game.rating < 8.0" class="score yellow">
                  {{ game.rating }}
                </div>
                <div v-else-if="game.rating >= 8.0" class="score green">
                  {{ game.rating }}
                </div>
                <!-- end conditional bubble color -->
              </div>
              <div class="review-text">
                <h5>{{ game.game_info.title }}</h5>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Review section end -->
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
      planToPlay: [],
      playing: [],
      completed: [],
      dropped: [],
      onHold: [],
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
