const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Saler = db.Saler;
const Product = db.Product;

// Create and Save a new Contact
exports.create = async (req, res, next) => {
    // Validate request
    if (!req.body.category || !req.body.brandName || !req.body.nameProduct || !req.body.urlImg || !req.body.price || !req.body.email) {
        return next(new BadRequestError(400, "Thông tin bị thiếu!"));
    }


    const saler = new Saler({
        category: req.body.category,
        brandName: req.body.brandName,
        nameProduct: req.body.nameProduct,
        urlImg: req.body.urlImg,
        price: req.body.price,
        email: req.body.email,
        isAuthentic: String(req.body.isAuthentic).toLowerCase() === "true",
        ownerId: req.userId,
    });


    const [error, document] = await handle(saler.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the saler"
            )
        );
    }

    return res.send(document);
};


exports.findAll = async (req, res, next) => {
    const condition = {};
    const category = req.query.category;
    
    if (category) {
        condition.category = { $regex: new RegExp(category), $options: "i" };
    }

    const [error, documents] = await handle(
        Saler.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving contacts"
            )
        );
    }

    return res.send(documents);
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
        Saler.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating saler with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Saler not found"));
    }

    return res.send({ message: "Saler was updated successfully" });
};


exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Saler.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete saler with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Saler not found"));
    }

    return res.send({ message: "Saler was deleted successfully" });
};


exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Saler.deleteMany({ ownerId: req.userId })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all saler"
            )
        );
    }

    return res.send({
        message: `${data.deletedCount} salers were deleted successfully`,
    });
};

exports.findByName = async (req, res, next) => {
    const condition = {};
    const nameProduct = req.query.nameProduct;
    if (nameProduct) {
        condition.nameProduct = { $regex: new RegExp(nameProduct), $options: "i" };
    }

    const [error, documents] = await handle(
        Saler.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving contacts"
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
        Saler.findOne(condition)
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

exports.findByCategory = async (req, res, next) => {
    const condition = {};
    const category = req.query.category;
    if (category) {
        condition.category = { $regex: new RegExp(category), $options: "i" };
    }

    const [error, documents] = await handle(
        Saler.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving contacts"
            )
        );
    }

    return res.send(documents);
};