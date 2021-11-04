const proxy = require("http-proxy-middleware");
module.exports = (app) => {
    app.use(
        "/api",
        proxy({
            target: process.env["REACT_APP_BASE_URL"] || "http://localhost:8080",
            changeOrigin: true,
        })
    );
    app.use(
        "/producer",
        proxy({
            target: "http://producer.default.svc:8080",
            changeOrigin: true,
            pathRewrite: {
                '^/producer': ''
              },
        })
    );
};
