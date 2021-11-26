const config = {
    app: {
        port: process.env.PORT || 8080
    },
    db: {
        url: "mongodb://localhost:27017/LocalBrand"
    },
    jwt: {
        secret: "LocalBrand-secret-key"
    }
};

module.exports = config;
