const {
    batdongsan321
} = require('../module/tuan');

exports.batdongsan321Controller = async (req, res, next) => {
    var pages = req.query.page;
    var date = req.query.date;
    a = await batdongsan321(date, pages);

    return res.send(a);
}