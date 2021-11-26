<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 blog-main">
        <div class="blog-post">
          <div class="row">
            <div class="col-4">
              <img style="width: 15em" v-bind:src="salers.urlImg" />
            </div>
            <div class="col"></div>
            <div class="col-7">
              <h3 class="blog-post-title mb-4">{{ salers.nameProduct }}</h3>
              <p class="blog-post-meta">Thương Hiệu: {{ salers.brandName }}</p>
              <p class="blog-post-meta">Giá: {{ salers.price }} VND.</p>
            </div>
          </div>
          <div class="row-1">
            <h3 class="pb-4 mt-4 mb-4 font-italic border-bottom">
              Chi tiết sản phẩm
            </h3>
            <p class="blog-post-meta">Danh Mục: {{ products.category }}</p>
            <p class="blog-post-meta">Xuất Xứ: {{ products.origin }}</p>
            <p class="blog-post-meta">Chất Liệu: {{ products.material }}</p>
            <p class="blog-post-meta">Phong Cách: {{ products.style }}</p>
            <p class="blog-post-meta">
              Số Lượng Trong Kho: {{ products.wareHouse }}
            </p>
            <p class="blog-post-meta">Địa Chỉ: {{ products.address }}</p>
            <router-link :to=" { path: '/editProduct/' + products.id }">
              <button class="btn btn-primary">
                Chỉnh sửa thông tin chi tiết sản phẩm
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SalerService from "../services/saler.service";
import ProductService from "../services/product.service";
export default {
  name: "Product",

  data() {
    return {
      products: [],
      currentProduct: null,
      ProductIndex: -1,
      salers: [],
    };
  },
  methods: {
    async retrieveProducts(ProductIndex) {
      const [error, response] = await this.handle(
        ProductService.getAll(ProductIndex)
      );
      if (error) {
        console.log(error);
        alert("Error");
      } else {
        this.products = response.data;
        console.log(response.data);
      }
    },

    async retrieveSalers(ProductIndex) {
      const [error, response] = await this.handle(
        SalerService.get(ProductIndex)
      );
      if (error) {
        console.log(error);
        alert("Error");
      } else {
        this.salers = response.data;
        console.log(response.data);
      }
    },
  },
  mounted() {
    this.ProductIndex = this.$route.params.id;
    this.retrieveProducts(this.ProductIndex);
    this.retrieveSalers(this.ProductIndex);
  },
};
</script>