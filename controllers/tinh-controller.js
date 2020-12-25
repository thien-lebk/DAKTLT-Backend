const Web = require('../model/web')

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

exports.getall = async (req, res, next) => {

	try {
		var page = req.query.page || 1;
		var location = req.query.location || "";
		var title = req.query.title || "";
		var areaFrom = parseInt(req.query.areaFrom) || 0;
        var areaTo = parseInt(req.query.areaTo) || 0;
		var totalEle = 10;
        var a = await Web.find({ location: { $regex: location, $options: 'i' } ,title: { $regex: title, $options: 'i' }})
		console.log(a.length);

		if(areaFrom >0 && areaTo>0){
			var newA = []
			a.forEach(ele => {
				let compare = ele.area.split("m2");
				if (compare[0] >= areaFrom && compare[0] <= areaTo) {
					newA.push(ele);
				}
			}
			)
		} else if( areaFrom >0){
			var newA = []
			a.forEach(ele => {
				let compare = ele.area.split("m2");
				if (compare[0] >= areaFrom ) {
					newA.push(ele);
				}
			}
			)
		} else if( areaTo >0){
			var newA = []
			a.forEach(ele => {
				let compare = ele.area.split("m2");
				if (compare[0] >= areaFrom ) {
					newA.push(ele);
				}
			}
			)
		}
		
        a = newA;




		var data = []
		if (page == 1) {
			var i = 0;
		} else {
			var i = (page - 1) * totalEle;
		}

		for (i; i < totalEle; i++) {
			data.push(a[i])
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

exports.searchTitle = async (req, res, next) => {

	try {
		var title = req.query.title || "";
		var page = req.query.page || 1;
		var totalEle = 10;
		const a = await Web.find({ title: { $regex: title, $options: 'i' } })
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

exports.cleanAddress = async (req, res, next) => {

	try {
		var type = req.query.type;
		var address = req.query.address;
		var a = await Web.find({ $or: [{ title: { $regex: type, $options: 'i' } }, { location: { $regex: type, $options: 'i' } }, { content: { $regex: type, $options: 'i' } }] })
		//    console.log(a);
		for (const ele of a) {
			if (!ele.address) {
				ele.address = address;

				await ele.save();
				console.log("done " + ele._id);
			}

		}

		console.log("done " + a.length);
		return res.send("done")
	} catch (err) {
		console.log(err);
		return err;
	}
}

exports.fixAddress = async (req, res, next) => {

	try {
		var type = req.query.search;
		var fix = req.query.fix;
		var a = await Web.find({ $or: [{ address: { $regex: type, $options: 'i' } }] })
		//    console.log(a);
		for (const ele of a) {

			ele.address = fix;

			await ele.save();
			console.log("done " + ele._id);

		}

		console.log("done " + a.length);

		return res.send("done")
	} catch (err) {
		console.log(err);
		return err;
	}
}

exports.findnotadd = async (req, res, next) => {

	try {

		var a = await Web.find()
		a = a.filter(ele => !ele.address)
		console.log(a.length)
		return res.send(a)
	} catch (err) {
		console.log(err);
		return err;
	}
}

exports.batdongsan321 = async (req, res, next) => {
	try {
		var url = req.query.url;
		var listWeb = await Web.find({ href: { $regex: "batdongsan321.com", $options: 'i' } })

		for (const web of listWeb) {
			let a = await batdongsan321(web.href);
			web.address = a;
			await web.save();
			console.log("done " + web._id);
		}

		return res.send("done all");
	} catch (error) {
		console.log(error);
		return res.send("123")
	}

}

exports.batdongsan = async (req, res, next) => {
	try {
		// var listWeb = await Web.find({address:{$regex:"Bà Rịa - Vũng Tàu -Bà Rịa", $options: 'i'}})
		var listWeb = await Web.find({ href: { $regex: "batdongsan.com", $options: 'i' } })
		// var listWeb = await Web.find({href:{$regex:"batdongsan321.com", $options: 'i'}}).distinct('address') 

		//    for (const web of listWeb) {
		//        web.address = web.location.split(',')[1].trim() + " -"  + web.location.split(',')[0].trim()
		//      await  web.save();
		//        console.log("done "+web._id);
		//    }
		//    console.log("done all");
		return res.send(listWeb);
	} catch (error) {
		console.log(error);
		return res.send("123")
	}

}
