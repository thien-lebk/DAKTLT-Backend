

//Tao csv
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



//Cherio

const axios = require("axios");
const cheerio = require('cheerio');
const e = require('express');

const {batdongsanDotCom} = require('../module/thien');
const {muabannhadat} = require('../module/thien');




exports.batdongsanDotCom = async (req, res, next) => {
    var pages = req.query.page;
    var date = req.query.date;
    a = await batdongsanDotCom(date, pages);

    return res.send(a);

}
exports.muabannhadat = async (req, res, next) => {
    var pages = req.query.page;
    var date = req.query.date;
    try {
        a = await muabannhadat(date, pages);

    } catch (error) {
        console.log(error);
    }

    return res.send(a);

}