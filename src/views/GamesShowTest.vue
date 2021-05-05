<template>
  <div class="game-page">
    <div>
      <!-- Page section -->
      <section class="page-section single-blog-page spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div>
                <h3>{{ game.title }}</h3>
                <img :src="game.box_art" alt="no image" class="blog-thumb set-bg game-show-image" />
              </div>
              <!-- add button -->
              <div>
                <div v-if="userIsLoggedIn()">
                  <select v-model="selectedStatus" name="status" id="status">
                    <option value="plan to play">Plan To Play</option>
                    <option value="playing">Playing</option>
                    <option value="completed">Completed</option>
                    <option value="dropped">Dropped</option>
                    <option value="on hold">On Hold</option>
                  </select>
                  <br />
                  <br />
                  <!-- conditional button -->
                  <div>
                    <div v-if="isGameOnList()">
                      <button class="site-btn btn-sm" v-on:click="updateList()">Update list</button>
                      <br />
                      <br />
                      <div v-if="currentStatus === 'completed' || currentStatus === 'dropped'">
                        <button class="site-btn btn-sm" v-on:click="showReviewModal()">Rate/Review</button>
                      </div>
                    </div>
                    <div v-else>
                      <button class="site-btn btn-sm" v-on:click="addGameToList()">Add To List</button>
                    </div>
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
                        <div v-if="rating !== null">
                          <button v-on:click="updateList()">Submit</button>
                        </div>
                        <br />
                        <button>Exit</button>
                      </form>
                    </dialog>
                  </div>

                  <!-- end modals -->
                </div>
                <!-- end conditional button -->
              </div>

              <div class="blog-content">
                <br />
                <h3>About:</h3>
                <p>
                  {{ game.about }}
                </p>
              </div>
              <div class="comment-warp">
                <h4 class="comment-title">Reviews</h4>
                <ul class="comment-list" v-for="userGame in reviews_array" :key="userGame.id">
                  <li>
                    <div class="comment">
                      <div class="comment-avator set-bg" data-setbg="img/authors/1.jpg"></div>
                      <div class="comment-content">
                        <router-link v-bind:to="`/userlist/${userGame.user_id}`">
                          <h4>
                            {{ usersById[userGame.user_id] }}:
                            <span>{{ userGame.rating }}</span>
                          </h4>
                        </router-link>
                        <p>
                          {{ userGame.review }}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- sidebar -->
            <div class="col-lg-4 col-md-7 sidebar pt-5 pt-lg-0">
              <!-- widget -->
              <div class="widget-item">
                <h4 class="widget-title">Info</h4>
                <div class="latest-blog">
                  <div class="lb-item">
                    <div class="lb-content">
                      <div class="lb-date">Average User Rating</div>
                      <h3>{{ game.avg_user_rating }}</h3>
                    </div>
                  </div>
                  <div class="lb-item">
                    <div class="lb-content">
                      <div class="lb-date">Platforms</div>
                      <p>{{ game.platforms }}</p>
                    </div>
                  </div>
                  <div class="lb-item">
                    <div class="lb-content">
                      <div class="lb-date">Multiplayer?</div>
                      <p>{{ game.multiplayer }}</p>
                    </div>
                  </div>
                  <div class="lb-item">
                    <div class="lb-content">
                      <div class="lb-date">ESRB</div>
                      <h3>{{ game.esrb_rating }}</h3>
                      <p>{{ game.content_description }}</p>
                    </div>
                  </div>
                  <div class="lb-item">
                    <div class="lb-content">
                      <div class="lb-date">Developer</div>
                      <p>{{ game.developer }}</p>
                    </div>
                  </div>
                  <div class="lb-item">
                    <div class="lb-content">
                      <div class="lb-date">Publisher</div>
                      <p>{{ game.publisher }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Page section end -->
    </div>
  </div>
</template>

<style>
.box_art {
  height: 325px;
  width: 275px;
}

.game-show-image {
  height: 500px;
  width: 350px;
}
</style>

<script>
//This is a mess. Please refactor
//Make a decision regarding completion time. It wouldn't be particularaly difficult to implement. Just do it.
import axios from "axios";
export default {
  data: function () {
    return {
      game: {},
      selectedStatus: "plan to play",
      currentStatus: "",
      completionHours: 0,
      completionMinutes: 0,
      instance: [],
      userGameIds: [],
      userGames: [],
      userGameInstanceId: null,
      review: null,
      rating: null,
      reviews_array: [],
      usersById: {},
    };
  },
  created: function () {
    this.showGame();
    this.getUserGamesIdList();
    this.setStatus();
    this.getGameReviews();
    this.getUsersById();
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
    // this is setting more than just the status. Maybe call it something broader like get user games info or something.
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
    //can this become a function called in addGamesToList that simply returns the instance?
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
    //may want to break this into two functions so as not to accidentally change rating/review when updating list
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
    //can this be done in getUserGamesInformation?
    getUserGamesIdList: function () {
      axios.get("/api/user_games/" + localStorage.getItem("user_id")).then((response) => {
        this.userGameIds = [];
        for (var game in response.data) {
          this.userGameIds.push(response.data[game].game_id);
        }
      });
    },
    //maybe make this a computed function so the reactivity is always there without having to constantly check.
    isGameOnList: function () {
      for (var i = 0; i < this.userGameIds.length; i++) {
        if (this.userGameIds[i] === this.game.id) {
          return true;
        }
      }
      return false;
    },
    //think about grouping things based on axios requests
    getGameReviews: function () {
      axios.get("/api/user_games/reviews/" + this.$route.params.id).then((response) => {
        this.reviews_array = response.data;
        console.log(this.reviews_array);
      });
    },
    getUsersById: function () {
      axios.get("/api/users").then((response) => {
        for (var user in response.data) {
          this.usersById[response.data[user].id] = response.data[user].name;
        }
        console.log(this.usersById);
      });
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
      console.log();
    },
  },
};
</script>
