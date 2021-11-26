module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            productInfoId: {
                type: String,
                require: [true, "Cần nhập id người bán."]
            },
            category: {
                type: String,
                required: [true, "Cần nhập danh mục sản phẩm."],
            },
            origin: {
                type: String,
                require: [true, "Cần nhập nguồn gốc xuất xứ sản phẩm."]
            },
            material: {
                type: String,
                require: [true, "Cần nhập chất liệu của sản phẩm."]
            },
            style: {
                type: String,
                require: [true, "Bạn cần phong cách của sản phẩm."]
            },
            wareHouse: {
                type: Number,
                require: [true, "Số lượng sản phẩm hiện còn lại trong kho."]
            },
            address: {
                type: String,
                require: [true, "Địa chỉ của người bán là bắt buộc."]
            },
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
        },
        { timestamps: true }
    );

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("product", schema);
};
