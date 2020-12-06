

//Tao csv
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Web = require('../model/web')

//Cherio

const axios = require("axios");
const cheerio = require('cheerio');
const e = require('express');

const { batdongsanDotCom } = require('../module/thien');
const { muabannhadat } = require('../module/thien');
const { crawlWeb } = require('../module/tinh');

//add json
const bdsan = require('../samplerecord/badomsan.json')
// console.log(bdsan.length);

exports.adddata = async (req, res, next) => {
    // let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
    var data = bdsan;
    // // await Promise.all(bdsan.map(async x => {

    //     for (const x of bdsan) {
    //     try {
    //         let obj = await crawlWeb(x.href)
    //         data.push(obj);
    //     } catch (error) {
    //         // console.log(error);
    //     }
    //     // console.log(data);

    //     }
    await Promise.all(data.map(async x => {

    // for (const x of data) {
        let id = x.id;
        let href = x.href;
        let title = x.title;
        let imgs = x.img;

        let price = x.price;
        let area = x.area;
        let location = x.location;
        let content = x.content;
        let date = x.date;
        let obj = new Web({
            id: id,
            href: href,
            title: title,
            imgs: imgs,
            price: price,
            area: area,
            location: location,
            content: content,
            date: date

        })
        // console.log(obj);
        try {
            await obj.save();

            // console.log(obj);
        } catch (error) {
            // console.log(error);
        }
    // }
    }))

    return res.send("success");
}


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