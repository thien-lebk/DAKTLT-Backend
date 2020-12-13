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
		var totalEle = 10;
		const a = await Web.find()
		console.log(a.length);
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
