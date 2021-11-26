module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            category: {
                type: String,
                required: [true, "Cần nhập danh mục của sản phẩm."]
            },
            brandName: {
                type: String,
                required: [true, "Cần nhập tên thương hiệu."]
            },
            nameProduct: {
                type: String,
                required: [true, "Cần nhập tên sản phẩm."],
            },
            urlImg: {
                type: String,
                required: [true, "Cần nhập đường dẫn ảnh minh hoạ sản phẩm."]
            },
            price: {
                type: Number,
                required: [true, "Cần nhập giá bán của sản phẩm."]
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
                required: [true, "Cần nhập email liên lạc của người bán hàng."]
            },
            isAuthentic: Boolean,
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

    return mongoose.model("saler", schema);
};