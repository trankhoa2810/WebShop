import http from "../common/http";
import store from "../store";

class SalerService {
  constructor() {
    http.interceptors.request.use(config => {
      const user = store.getters.loggedInUser;
      if (user && user.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });
  }
  
  getAll() { return http.get("/salers/find/findAll"); }
  get(id) { return http.get(`/salers/findId/${id}`); }
  create(data) { return http.post("/salers/", data); }
  update(id, data) { return http.put(`/salers/${id}`, data); }
  delete(id) { return http.delete(`/salers/${id}`); }
  deleteAll() { return http.delete("/salers/"); }
  findByName(nameProduct) { return http.get(`/salers/findByName?nameProduct=${nameProduct}`); }
  findByCategory(category) { return http.get(`/salers/findByCategory?category=${category}`); }
}

export default new SalerService();