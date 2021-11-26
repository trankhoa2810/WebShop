const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Product = db.Product;

exports.create = async (req, res, next) => {
    if (!req.body.productInfoId || !req.body.category || !req.body.origin || !req.body.material || !req.body.style || !req.body.wareHouse || !req.body.address) {
        return next(new BadRequestError(400, "Thông tin bị thiếu!"));
    }

    const product = new Product({
        productInfoId: req.body.productInfoId,
        category: req.body.category,
        origin: req.body.origin,
        material: req.body.material,
        style: req.body.style,
        wareHouse: req.body.wareHouse,
        address: req.body.address,
        ownerId: req.userId,
    });

    const [error, document] = await handle(product.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the product infomation."
            )
        );
    }

    return res.send(document);
};

exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Product.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete review with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Review not found"));
    }

    return res.send({ message: "review was deleted successfully" });
};

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data to update can not be empty")
        );
    }

    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Product.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating contact with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Brand Name not found"));
    }

    return res.send({ message: "Data was updated successfully" });
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    const [error, documents] = await handle(
        Product.findOne(
            {
                productInfoId: req.params.productInfoId,
            },
        )
    );
    if (error) {
        return next(
            new BadRequestError(
                500,
                `Lỗi trong quá trình truy xuất dữ liệu testId=${req.params.infoId}`
            )
        );
    }
    return res.send(documents);
};

exports.findId = async (req, res, next) => {
    const condition = {
        _id: req.params.id,        
    };

    const [error, document] = await handle(
        Product.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving information with id=${req.params.id}`
            )
        );
    }
    if (!document) {
        return next(new BadRequestError(404, "Information not found"));
    }

    return res.send(document);
};