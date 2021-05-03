<template>
  <div class="game-page">
    <div>
      <!-- <h1>{{ game.title }}</h1>
      <img class="box_art" v-bind:src="`${game.box_art}`" alt="No box art" />
      <hr />
      <div v-if="userIsLoggedIn()">
        <select v-model="selectedStatus" name="status" id="status">
          <option value="plan to play">Plan To Play</option>
          <option value="playing">Playing</option>
          <option value="completed">Completed</option>
          <option value="dropped">Dropped</option>
          <option value="on hold">On Hold</option>
        </select> -->

      <!-- conditional button -->
      <!-- <div>
          <div v-if="isGameOnList()">
            <button v-on:click="updateList()">Update list</button>
            <br />
            <div v-if="currentStatus === 'completed' || currentStatus === 'dropped'">
              <button v-on:click="showReviewModal()">Rate/Review</button>
            </div>
          </div>
          <button v-else v-on:click="addGameToList()">Add To List</button>
        </div> -->

      <!-- modal -->
      <!-- <div>
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
        </div> -->
      <!-- end modal -->
      <!-- </div> -->
      <!-- end conditional button -->
      <!-- <h2>Average User Rating: {{ game.avg_user_rating }}</h2>
      <div>
        <h3>{{ game.about }}</h3>
        <p>{{ game.platforms }}</p>
        <p>{{ game.multiplayer }}</p>
      </div>
    </div> -->

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
                        <button v-on:click="updateList()">Submit</button>
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
                <h4 class="comment-title">Top Coments</h4>
                <ul class="comment-list">
                  <li>
                    <div class="comment">
                      <div class="comment-avator set-bg" data-setbg="img/authors/1.jpg"></div>
                      <div class="comment-content">
                        <h5>
                          James Smith
                          <span>June 21, 2018</span>
                        </h5>
                        <p>
                          Donec venenatis at eros sit amet aliquam. Donec vel orci efficitur, dictum nisl vitae,
                          scelerisque nibh. Curabitur eget ipsum pulvinar nunc gravida interdum.
                        </p>
                        <a href="" class="reply">Reply</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="comment">
                      <div class="comment-avator set-bg" data-setbg="img/authors/2.jpg"></div>
                      <div class="comment-content">
                        <h5>
                          James Smith
                          <span>June 21, 2018</span>
                        </h5>
                        <p>
                          Donec venenatis at eros sit amet aliquam. Donec vel orci efficitur, dictum nisl vitae,
                          scelerisque nibh. Curabitur eget ipsum pulvinar nunc gravida interdum.
                        </p>
                        <a href="" class="reply">Reply</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="comment-form-warp">
                <h4 class="comment-title">Leave Your Comment</h4>
                <form class="comment-form">
                  <div class="row">
                    <div class="col-md-6">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div class="col-md-6">
                      <input type="email" placeholder="Email" />
                    </div>
                    <div class="col-lg-12">
                      <input type="text" placeholder="Subject" />
                      <textarea placeholder="Message"></textarea>
                      <button class="site-btn btn-sm">Send</button>
                    </div>
                  </div>
                </form>
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
              <!-- widget -->
              <div class="widget-item">
                <h4 class="widget-title">Top Comments</h4>
                <div class="top-comment">
                  <div class="tc-item">
                    <div class="tc-thumb set-bg" data-setbg="img/authors/1.jpg"></div>
                    <div class="tc-content">
                      <p>
                        <a href="#">James Smith</a>
                        <span>on</span>
                        Lorem consec ipsum dolor sit amet, co
                      </p>
                      <div class="tc-date">June 21, 2018</div>
                    </div>
                  </div>
                  <div class="tc-item">
                    <div class="tc-thumb set-bg" data-setbg="img/authors/2.jpg"></div>
                    <div class="tc-content">
                      <p>
                        <a href="#">Michael James</a>
                        <span>on</span>
                        Cras sit amet sapien aliquam
                      </p>
                      <div class="tc-date">June 21, 2018</div>
                    </div>
                  </div>
                  <div class="tc-item">
                    <div class="tc-thumb set-bg" data-setbg="img/authors/3.jpg"></div>
                    <div class="tc-content">
                      <p>
                        <a href="#">Justin More</a>
                        <span>on</span>
                        Lorem ipsum dolor consecsit amet, co
                      </p>
                      <div class="tc-date">June 21, 2018</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- widget -->
              <div class="widget-item">
                <div class="feature-item set-bg" data-setbg="img/features/1.jpg">
                  <span class="cata new">new</span>
                  <div class="fi-content text-white">
                    <h5><a href="#">Suspendisse ut justo tem por, rutrum</a></h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <a href="#" class="fi-comment">3 Comments</a>
                  </div>
                </div>
              </div>
              <!-- widget -->
              <div class="widget-item">
                <div class="review-item">
                  <div class="review-cover set-bg" data-setbg="img/review/1.jpg">
                    <div class="score yellow">9.3</div>
                  </div>
                  <div class="review-text">
                    <h5>Assasin’’s Creed</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisc ing ipsum dolor sit ame.</p>
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
