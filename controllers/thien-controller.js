

//Tao csv
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const Web = require('../model/web')
const ThongKe = require('../model/thongke')

//Cherio

const axios = require("axios");
const cheerio = require('cheerio');
const e = require('express');

const { batdongsanDotCom, batdongsan321 } = require('../module/thien');
const { muabannhadat } = require('../module/thien');
const { crawlWeb } = require('../module/tinh');
const bdsJson = require('../report/tuan1/sampledata/batdongsan.json')
//add json
// const bdsan = require('../samplerecord/badomsan.json')
// console.log(bdsan.length);

exports.adddata = async (req, res, next) => {
    // let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
    var data = [];
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
    // await Promise.all(data.map(async x => {

    // // for (const x of data) {
    //     let id = x.id;
    //     let href = x.href;
    //     let title = x.title;
    //     let imgs = x.img;

    //     let price = x.price;
    //     let area = x.area;
    //     let location = x.location;
    //     let content = x.content;
    //     let date = x.date;
    //     let obj = new Web({
    //         id: id,
    //         href: href,
    //         title: title,
    //         imgs: imgs,
    //         price: price,
    //         area: area,
    //         location: location,
    //         content: content,
    //         date: date

    //     })
    //     // console.log(obj);
    //     try {
    //         await obj.save();

    //         // console.log(obj);
    //     } catch (error) {
    //         // console.log(error);
    //     }
    // // }
    // }))

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

exports.searchLocation = async (req, res, next) => {

    try {
        var location = req.query.location || "";
        var page = req.query.page || 1;
        var totalEle = 10;
        const a = await Web.find({ location: { $regex: location, $options: 'i' } })
        console.log(a.length);
        var data = []
        if (page == 1) {
            var i = 0;
        } else {
            var i = (page - 1) * totalEle;
        }

        for (i; i < totalEle; i++) {
            if (a[i]) data.push(a[i])

        }

        let objReturn = { "totalPage": a.length, "currPage": page, "data": data }
        if (a.length % totalEle == 0) {
            objReturn.totalPage = parseInt(a.length / totalEle)
        } else {
            objReturn.totalPage = parseInt(a.length / totalEle) + 1

        }
        return res.send(objReturn);
    } catch (error) {
        console.log(error);
    }



}
exports.searchArea = async (req, res, next) => {

    try {
        var type = req.query.type

        var areaFrom = parseInt(req.query.areaFrom) || 0;
        var areaTo = parseInt(req.query.areaTo) || 0;
        var page = req.query.page || 1;
        var totalEle = 10;
        var a = await Web.find({ title: { $regex: type, $options: 'i' } }).sort({ area: 1 })
        var newA = []
        a.forEach(ele => {
            let compare = ele.area.split("m2");
            if (compare[0] >= areaFrom && compare[0] <= areaTo) {
                newA.push(ele);
            }
        }
        )
        a = newA;
        console.log(a.length);

        var data = []
        if (page == 1) {
            var i = 0;
        } else {
            var i = (page - 1) * totalEle;
        }

        for (i; i < totalEle; i++) {
            if (a[i]) data.push(a[i])

        }

        let objReturn = { "totalPage": a.length, "currPage": page, "data": data }
        if (a.length % totalEle == 0) {
            console.log("here");
            objReturn.totalPage = parseInt(a.length / totalEle);

        } else {
            console.log(a.length / totalEle);
            objReturn.totalPage = parseInt(a.length / totalEle) + 1

        }
        return res.send(objReturn);
    } catch (error) {
        console.log(error);
    }



}


exports.fixPriceBatdongsan = async (req, res, next) => {
    try {
        for (const ele of bdsJson) {


            var listWeb = await Web.findOne({ $and: [{ href: { $regex: "batdongsan.com", $options: 'i' } }, { id: ele.id }] })
            if (listWeb) {
                if (ele.price != 'Không xác định' && ele.price != 'Giá thỏa thuận' && ele.price != 'Liên hệ') {
                    let price = ele.price;
                    if (price.split(' ')[1] == 'tỷ') {
                        let price2 = price.split(' ')[0];
                        // if (price2.split(',')[1] != undefined) {
                        //     price2 = price2.split(',')[0] + '.' + price2.split(',')[1];
                        // } else {
                        //     price2 = price2.split(',')[0];
                        // }
                        console.log((price2));
                        listWeb.price = parseFloat(price2) * 1000;
                        await listWeb.save();
                    } else if (price.split(' ')[1] == 'triệu') {
                        let price2 = price.split(' ')[0];
                        // if (price2.split(',')[1] != undefined) {
                        //     price2 = price2.split(',')[0] + '.' + price2.split(',')[1];
                        // } else {
                        //     price2 = price2.split(',')[0];
                        // }
                        listWeb.price = parseFloat(price2);
                        // console.log(price2);
                        console.log((price2));

                        await listWeb.save();
                    } else {
                        let price2 = price.split(' ')[0];
                        // if (price2.split(',')[1] != undefined) {
                        //     price2 = price2.split(',')[0] + '.' + price2.split(',')[1];
                        // } else {
                        //     price2 = price2.split(',')[0];
                        // }

                        listWeb.price = parseFloat(price2) * parseFloat(listWeb.area);
                        console.log(price2);

                        await listWeb.save();
                    }
                    // console.log("done " +listWeb._id);
                    console.log(ele.id);
                    console.log("------");
                }
            } else {
                // console.log(listWeb);
                // console.log(ele.id);
            }


        }
        // var listWeb = await Web.find({href:{$regex:"batdongsan321.com", $options: 'i'}}).distinct('address') 


        //    for (const web of listWeb) {
        //        web.address = web.location.split(',')[1].trim() + " -"  + web.location.split(',')[0].trim()
        //      await  web.save();
        //        console.log("done "+web._id);
        //    }
        //    console.log("done all");
        return res.send("done");
    } catch (error) {
        console.log(error);
        return res.send("123")
    }

}



exports.thongKeTheoQuan = async (req, res, next) => {

    try {
        var listWeb = await Web.find({ href: { $regex: "batdongsan321.com", $options: 'i' } }).distinct('address')
        await Promise.all(listWeb.map(async (ele) => {
            if (ele.length > 0) {
                let listRes;
                if (ele.slice(0, 3) == 'TP.') {
                    listRes = await Web.find({ address: { $regex: ele.slice(4,), $options: 'i' } });
                } else {
                    listRes = await Web.find({ address: { $regex: ele, $options: 'i' } });

                }
                // console.log(ele);
                let area = 0;
                let price = 0;

                // console.log(listRes);
                listRes.forEach(eleArea => {

                    if (eleArea.price != undefined && eleArea.area != undefined && eleArea.price >= 99) {
                        // console.log("-----");
                        // console.log(eleArea.price)
                        // console.log(eleArea.area)

                        price += eleArea.price;
                        area += parseFloat(eleArea.area.split('m')[0]);

                    }
                })
                
                const thongke = new ThongKe({ price: 0, address: ele, area: 0, avg: 0 });
                
                thongke.price = price ;
                thongke.area = parseFloat(area);
                thongke.avg =   thongke.price/  thongke.area;
                console.log("-----");
                console.log(ele);
                console.log(thongke.price);
                console.log(thongke.area);
                console.log( thongke.avg);
                await thongke.save();
                // console.log("here");
            }


        }))

        return res.send("done")
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.fixthongke = async (req, res, next) => {
    try {
        // var listWeb = await Web.find({address:{$regex:"Bà Rịa - Vũng Tàu -Bà Rịa", $options: 'i'}})
        var listWeb = await Web.find();
        Promise.all(listWeb.map(async ele=>{
            if(ele.price<30){
                let ar = ele.area.split('m')[0]
                ele.price = ele.price* parseFloat(ar);
                await ele.save();
            }
        }))


        //    for (const web of listWeb) {
        //        web.address = web.location.split(',')[1].trim() + " -"  + web.location.split(',')[0].trim()
        //      await  web.save();
        //        console.log("done "+web._id);
        //    }
        //    console.log("done all");
        return res.send("done");
    } catch (error) {
        console.log(error);
        return res.send("123")
    }

}