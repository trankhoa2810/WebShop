<template>
  <div v-if="saler" class="edit-form">
    <h4>Chỉnh sửa sản phẩm</h4>
    <SalerFormEdit
      :saler="saler"
      @saler-submit="updateSaler"
      @saler-delete="deleteSaler"
    />
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Không tìm thấy sản phẩm.</p>
  </div>
</template>
<script>
import SalerService from "../services/saler.service";
import SalerFormEdit from "../components/SalerFormEdit";
export default {
  name: "SalerEdit",
  components: {
    SalerFormEdit,
  },
  data() {
    return {
      saler: null,
      message: "",
    };
  },
  methods: {
    async getSaler(id) {
      const [error, response] = await this.handle(SalerService.get(id));
      if (error) {
        console.log(error);
      } else {
        this.saler = response.data;
        console.log(response.data);
      }
    },
    async updateSaler(data) {
      const [error, response] = await this.handle(
        SalerService.update(this.saler.id, data)
      );
      if (error) {
        alert("Bạn không được phép cập nhật sản phẩm này!");
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Sản phẩm được cập nhật thành công.";
      }
    },
    async deleteSaler(id) {
      const [error, response] = await this.handle(
        SalerService.delete(id)
      );
      if (error) {
        alert("Bạn không được phép xoá sản phẩm này!");
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Sản phẩm đã được xoá!";
      }
    },
  },
  mounted() {
    this.message = "";
    this.getSaler(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
