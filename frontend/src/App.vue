<template>
  <div id="app">
    <nav
      style="background-color: #fc2327"
      class="navbar navbar-expand-lg navbar-dark"
    >
      <a class="navbar-brand" href="/">
        PK Shop<i class="fas fa-shopping-cart"></i>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/"
              >Home <i class="fas fa-home"></i> <span class="sr-only">(current)</span>
            ></a>
          </li>
        </ul>
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link"> Đăng ký
            <i class="fas fa-user-plus"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link"> Đăng nhập 
            <i class="fas fa-sign-in-alt"></i>
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              to="/add"
              @click.prevent="gotoAddSaler"
              class="nav-link"
            >
              Thêm sản phẩm
              <i class="fa fa-plus" aria-hidden="true"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              {{ currentUser.username }}
              <i class="fa fa-user" aria-hidden="true"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logout" href="">
              Đăng xuất
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </div>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },
  methods: {
    ...mapMutations([
      "initAuthState",
    ]),

    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },

  goToAddSaler() {
    this.$router.push("/add");
  },
  mounted() {
    this.initAuthState();
  },
};
</script>
