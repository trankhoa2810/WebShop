module.exports = mongoose => {
    const schema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "Tên người dùng là bắt buộc."],
        },
        email: {
            type: String,
            required: [true, "Bắt buộc phải điền email."],
        },
        password: {
            type: String,
            required: [true, "Mật khẩu là bắt buộc."],
        },
    });

    return mongoose.model("user", schema);
};
