<template>
  <Form @submit="$emit('saler-submit', salerLocal)" :validation-schema="schema">
    <div class="form-group">
      <label for="category">Mục sản phẩm</label>
      <Field
        name="category"
        type="text"
        class="form-control"
        v-model="salerLocal.category"
      />
      <ErrorMessage name="category" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="brandName">Tên Thương Hiệu</label>
      <Field
        name="brandName"
        type="text"
        class="form-control"
        v-model="salerLocal.brandName"
      />
      <ErrorMessage name="brandName" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="nameProduct">Tên Sản Phẩm</label>
      <Field
        name="nameProduct"
        type="text"
        class="form-control"
        v-model="salerLocal.nameProduct"
      />
      <ErrorMessage name="nameProduct" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="urlImg">Đường Dẫn Ảnh Minh Hoạ</label>
      <Field
        name="urlImg"
        type="text"
        class="form-control"
        v-model="salerLocal.urlImg"
      />
      <ErrorMessage name="urlImg" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Giá</label>
      <Field
        name="price"
        type="number"
        class="form-control"
        v-model="salerLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="salerLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="isAuthentic"
        type="checkbox"
        class="form-check-input"
        v-model="salerLocal.isAuthentic"
      />
      <label for="isAuthentic" class="form-check-label">
        <strong>Hàng chính hãng</strong>
      </label>
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="salerLocal.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="$emit('saler-delete', salerLocal.id)"
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
  name: "SalerFormEdit",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["saler-submit", "saler-delete"],
  props: ["saler"],
  data() {
    const schema = yup.object().shape({
      category: yup
        .string()
        .required("Danh mục sản phẩm là bắt buộc.")
        .min(2, "Tên danh mục phải ít nhất 2 ký tự.")
        .max(30, "Tên danh mục có nhiều nhất 50 ký tự."),
      brandName: yup
        .string()
        .required("Tên thương hiệu là bắt buộc.")
        .min(2, "Tên thương hiệu phải ít nhất 2 ký tự.")
        .max(30, "Tên thương hiệu có nhiều nhất 50 ký tự."),
      nameProduct: yup
        .string()
        .required("Tên sản phẩm là bắt buộc.")
        .min(2, "Tên sản phẩm phải ít nhất 2 ký tự."),
      urlImg: yup
        .string()
        .required("Phải nhập đường dẫn hình ảnh minh hoạ sản phẩm."),
      price: yup.number().required("Phải nhập giá của sản phẩm."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
    });
    return {
      salerLocal: this.saler,
      schema,
    };
  },
};
</script>
<style>
@import "../assets/styles/main.css";
</style>