<template>
  <div class="container">
    <div class="row">
      <div class="list-group col-3">
        <a
          style="background-color: #fc2327"
          class="list-group-item list-group-item-action active btn-danger"
        >
          Danh Mục
        </a>
        <router-link :to="{ path: '/quan-ao' }">
          <a class="list-group-item list-group-item-action">Quần Áo </a>
        </router-link>
        <router-link :to="{ path: '/giay-dep' }">
          <a class="list-group-item list-group-item-action">Giày Dép</a>
        </router-link>

        <router-link :to="{ path: '/dong-ho-thoi-trang' }">
          <a class="list-group-item list-group-item-action"
            >Đồng Hồ Thời Trang</a
          >
        </router-link>
      </div>

      <div class="col-9">
        <div class="mb-3 input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Tìm theo tên"
            v-model="nameToSearch"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-danger"
              type="button"
              @click="searchName"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        <div class="row">
          <div
            class="col-4 mt-3"
            v-for="(saler, index) in salers"
            :key="saler.id"
            @click="setActiveSaler(saler, index)"
          >
            <div class="list row">
              <div class="card">
                <span class="border border-dark">
                  <img
                    class="card-img-top"
                    style="width: 15em; height: 15em"
                    v-bind:src="saler.urlImg"
                  />
                </span>

                <div class="card-body">
                  <h5
                    class="card-title"
                    style="
                      display: inline-block;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      max-width: 20ch;
                    "
                  >
                    {{ saler.nameProduct }}
                  </h5>
                  <p class="card-text">Giá: {{ saler.price }} VND.</p>
                  <router-link :to="{ path: '/products/findAll/' + saler.id }">
                    <button
                      type="button"
                      data-toggle="button"
                      aria-pressed="true"
                      style="background-color: #fc2327"
                      class="btn btn-danger"
                    >
                      Chi tiết sản phẩm
                    </button>
                  </router-link>
                  <router-link :to="{ path: '/editSaler/' + saler.id }">
                    <button
                      v-if="currentUser"
                      type="button"
                      class="btn btn-primary mt-2"
                    >
                      Chỉnh sửa
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SalerService from "../services/saler.service";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Saler",
  computed: {
    ...mapGetters({
      currentUser: "loggedInUser",
    }),
  },

  data() {
    return {
      salers: [],
      currentSaler: null,
      currentIndex: -1,
      nameToSearch: "",
    };
  },

  methods: {
    ...mapMutations(["initAuthState"]),

    setActiveSaler(saler, index) {
      this.currentSaler = saler;
      this.currentIndex = saler ? index : -1;
    },

    async retrieveSalers() {
      const [error, response] = await this.handle(
        SalerService.findByCategory("clothes")
      );
      if (error) {
        console.log(error);
        alert("Error");
      } else {
        this.salers = response.data;
        console.log(response.data);
      }
    },

    refreshList() {
      this.retrieveSalers();
      this.currentSaler = null;
      this.currentIndex = -1;
    },

    async searchName() {
      const [error, response] = await this.handle(
        SalerService.findByName(this.nameToSearch)
      );
      if (error) {
        console.log(error);
      } else {
        this.salers = response.data;
        this.setActiveSaler(null);
        console.log(response.data);
      }
    },
  },
  mounted() {
    this.retrieveSalers();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

a {
  text-decoration: none;
}

a:hover {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>


