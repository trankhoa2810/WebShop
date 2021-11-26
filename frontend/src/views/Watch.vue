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
        <a href="/quan-ao" class="list-group-item list-group-item-action"
          >Quần Áo</a
        >
        <a href="/giay-dep" class="list-group-item list-group-item-action"
          >Giày Dép</a
        >
        <a
          href="/dong-ho-thoi-trang"
          class="list-group-item list-group-item-action"
          >Đồng Hồ Thời Trang</a
        >
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
                    style="width: 15em"
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
                  <router-link :to="{ path: '/edit/' + saler.id }">
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

      <!-- <div class="col-md-6">
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == activeIndex }"
            v-for="(saler, index) in salers"
            :key="saler.id"
            @click="setActiveSaler(saler, index)"
          >
            {{ saler.name }}
          </li>
        </ul>
        <button class="mt-3 btn btn-sm btn-primary" @click="goToAddSaler">
          Thêm Liên hệ
        </button>
        <button
          class="mt-3 ml-2 btn btn-sm btn-danger"
          @click="removeAllSalers"
        >
          Xóa tất cả
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentSaler">
          <SalerDetails :saler="currentSaler" />
          <router-link :to="'/salers/' + currentSaler.id">
            <span class="badge badge-warning">Hiệu chỉnh</span>
          </router-link>
        </div>
      </div> -->
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
        SalerService.findByCategory("watch")
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

    goToAddSaler() {
      this.$router.push("/add");
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
</style>


