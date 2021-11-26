<template>
  <div class="edit-form">
    <h4>Thêm Sản Phẩm</h4>
    <SalerFormEdit
      :saler="saler"
      @saler-submit="addSaler"
      @saler-delete="resetSaler"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>

import SalerService from "../services/saler.service";
import SalerFormEdit from "../components/SalerFormEdit";
export default {
  name: "SalerAdd",
  components: {
    SalerFormEdit,
  },
  data() {
    return {
      saler: {
        category: "",
        brandName: "",
        nameProduct: "",
        phone: "",
        urlImg: "",
        price: "",
        email: "",
        isAuthentic: false
      },
      message: "",
    };
  },
  methods: {
    initSaler() {},

    async addSaler(data) {
      console.log("input: ", data);
      const [error, response] = await this.handle(
        SalerService.create(data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Sản phẩm được thêm thành công.";
      }
    },
    resetSaler() {
      alert("reset");
    },
  },
  mounted() {
    this.message = "";
    this.initSaler();
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
