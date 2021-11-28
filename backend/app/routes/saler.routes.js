const express = require("express");
const { get } = require("mongoose");
const salers = require("../controllers/saler.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    router.get("/findByName", salers.findByName);
    router.get("/findId/:id", salers.findId);
    router.get("/findByCategory", salers.findByCategory)
    router.get("/find/findAll", salers.findAll); // Tìm tất cả sản phẩm.
    router.use(middlewares.verifyToken);
    router.post("/", salers.create);
    router.put("/:id", salers.update);
    router.delete("/:id", salers.delete);

    app.use("/api/salers", router);
};