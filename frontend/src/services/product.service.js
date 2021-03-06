import http from "../common/http";
import store from "../store";

class ProductService {
  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }
  
  getAll(id) { return http.get(`/products/findAll/${id}`); }
  get(id) { return http.get(`/products/findId/${id}`); }
  create(id, data) { return http.post(`/products/${id}`, data); }
  update(id, data) { return http.put(`/products/${id}`, data); }
  delete(id) { return http.delete(`/products/${id}`); }
  deleteAll() { return http.delete("/products/"); }
}

export default new ProductService();