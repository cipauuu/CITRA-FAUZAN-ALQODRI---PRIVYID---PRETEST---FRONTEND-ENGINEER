const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
    "/api",
    createProxyMiddleware({
        target: "http://pretest-qa.dcidev.id/",
        changeOrigin: true,
        pathRewrite: { "^/api/": "/" },
    })
    );
};
