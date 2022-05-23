const authRouter = require('./auth');
const productRouter = require('./product');
const newsRouter = require('./news');
const receiptRouter = require('./receipt');
const voucherRouter = require('./voucher');
const bannerRouter = require('./banner');

function route(app) {
    app.use("/api/auth",authRouter);
    app.use("/api/product",productRouter);
    app.use("/api/news",newsRouter);
    app.use("/api/receipt",receiptRouter);
    app.use("/api/voucher",voucherRouter);
    app.use("/api/banner",bannerRouter);
}

module.exports = route;