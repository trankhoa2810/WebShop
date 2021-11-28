<template>
  <div class="edit-form">
    <h4>Thêm Sản Phẩm</h4>
    <ProductFormEdit
      :product="product"
      @product-submit="addProduct"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>

import ProductService from "../services/product.service";
import ProductFormEdit from "../components/ProductFormEdit";
export default {
  name: "ProductAdd",
  components: {
    ProductFormEdit,
  },
  data() {
    return {
      product: {
        category: "",
        origin: "",
        material: "",
        style: "",
        wareHouse: "",
        address: "",
      },
      message: "",
    };
  },
  methods: {
    initProduct() {},

    async addProduct(data) {
      data.productInfoId = this.$route.params.id;
      console.log("input: ", data);
      const [error, response] = await this.handle(
        ProductService.create(this.$route.params.id, data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Thông tin chi tiết sản phẩm được thêm thành công.";
      }
    },
    resetProduct() {
      alert("reset");
    },
  },
  mounted() {
    this.message = "";
    this.initProduct();
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
