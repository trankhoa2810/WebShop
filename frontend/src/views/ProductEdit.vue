<template>
  <div v-if="product" class="edit-form">
    <h4>Chỉnh sửa thông tin sản phẩm</h4>
    <ProductFormEdit
      :product="product"
      @product-submit="updateProduct"
      @product-delete="deleteProduct"
    />
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Không tìm thấy thông tin sản phẩm.</p>
  </div>
</template>
<script>
import ProductService from "../services/product.service";
import ProductFormEdit from "../components/ProductFormEdit";
export default {
  name: "ProductEdit",
  components: {
    ProductFormEdit,
  },
  data() {
    return {
      product: null,
      message: "",
    };
  },
  methods: {
    async getProduct(id) {
      const [error, response] = await this.handle(ProductService.get(id));
      if (error) {
        console.log(error);
      } else {
        this.product = response.data;
        console.log(response.data);
      }
    },
    async updateProduct(data) {
      const [error, response] = await this.handle(
        ProductService.update(this.product.id, data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Thông tin được cập nhật thành công.";
      }
    },
    async deleteProduct(id) {
      const [error, response] = await this.handle(
        ProductService.delete(id)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Thông tin đã được xoá.";
      }
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
