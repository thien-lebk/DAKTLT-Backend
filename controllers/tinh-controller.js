//Tao csv
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



//Cherio

const axios = require("axios");
const cheerio = require('cheerio');
const e = require('express');

const {tinhfunc1} = require('../module/tinh');
const {tinhfunc2} = require('../module/tinh');




exports.tinh1 = async (req, res, next) => {
    var pages = req.query.page;
    var date = req.query.date;
    a = await tinhfunc1(date, pages);

    return res.send(a);

}
exports.tinh2 = async (req, res, next) => {
    var pages = req.query.page;
    var date = req.query.date;
    try {
        a = await tinhfunc2(date, pages);

    } catch (error) {
        console.log(error);
    }

    return res.send(a);

}