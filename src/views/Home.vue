<template>
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
          <h2>Games</h2>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6" v-for="game in games" :key="game.id">
            <div class="review-item">
              <div class="review-cover set-bg" data-setbg="img/review/1.jpg">
                <router-link v-bind:to="`/games/${game.id}`">
                  <img v-bind:src="`${game.box_art}`" alt="no image" class="review-cover set-bg" />
                </router-link>

                <!-- change rating bubble color based on score -->
                <div v-if="game.avg_user_rating < 6.0" class="score red">{{ game.avg_user_rating }}</div>
                <div v-else-if="game.avg_user_rating >= 6.0 && game.avg_user_rating < 8.0" class="score yellow">
                  {{ game.avg_user_rating }}
                </div>
                <div v-else-if="game.avg_user_rating >= 8.0" class="score green">
                  {{ game.avg_user_rating }}
                </div>
                <!-- end conditional bubble color -->
              </div>
              <div class="review-text">
                <h5>{{ game.title }}</h5>
                <br />
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-3 col-md-6">
            <div class="review-item">
              <div class="review-cover set-bg" data-setbg="img/review/2.jpg">
                <div class="score purple">9.5</div>
              </div>
              <div class="review-text">
                <h5>Doom</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="review-item">
              <div class="review-cover set-bg" data-setbg="img/review/3.jpg">
                <div class="score green">9.1</div>
              </div>
              <div class="review-text">
                <h5>Overwatch</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="review-item">
              <div class="review-cover set-bg" data-setbg="img/review/4.jpg">
                <div class="score pink">9.7</div>
              </div>
              <div class="review-text">
                <h5>GTA</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame.</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </section>
    <!-- Review section end -->
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
