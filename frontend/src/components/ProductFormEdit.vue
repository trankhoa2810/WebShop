<template>
  <Form
    @submit="$emit('product-submit', productLocal)"
    :validation-schema="schema"
  >
    <div class="form-group">
      <label for="category">Mục sản phẩm</label>
      <Field
        name="category"
        type="text"
        class="form-control"
        v-model="productLocal.category"
      />
      <ErrorMessage name="category" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="origin">Xuất xứ</label>
      <Field
        name="origin"
        type="text"
        class="form-control"
        v-model="productLocal.origin"
      />
      <ErrorMessage name="material" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="material">Chất liệu</label>
      <Field
        name="material"
        type="text"
        class="form-control"
        v-model="productLocal.material"
      />
      <ErrorMessage name="material" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="style">Phong cách</label>
      <Field
        name="style"
        type="text"
        class="form-control"
        v-model="productLocal.style"
      />
      <ErrorMessage name="style" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="wareHouse">Số lượng trong kho</label>
      <Field
        name="wareHouse"
        type="number"
        class="form-control"
        v-model="productLocal.wareHouse"
      />
      <ErrorMessage name="wareHouse" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="address"
        class="form-control"
        v-model="productLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="productLocal.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="$emit('product-delete', productLocal.id)"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "ProductFormEdit",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["product-submit", "product-delete"],
  props: ["product"],
  data() {
    const schema = yup.object().shape({
      material: yup.string().required("Xuất xứ sản phẩm không được bỏ trống!"),
    });
    return {
      productLocal: this.product,
      schema,
    };
  },
};
</script>
<style>
@import "../assets/styles/main.css";
</style>