const express = require("express");
const products = require("../controllers/product.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    router.get("/findAll/:productInfoId", products.findAll);
    router.use(middlewares.verifyToken);
    router.get("/findId/:id", products.findId);
    router.post("/", products.create);
    router.put("/:id", products.update);
    router.delete("/:id", products.delete);
    
    app.use("/api/products", router);
};