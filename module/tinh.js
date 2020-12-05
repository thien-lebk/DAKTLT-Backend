// dayjs
var dayjs = require('dayjs');

//Tao csv
const createCsvWriter = require('csv-writer').createObjectCsvWriter;



//Cherio

const axios = require("axios");
const cheerio = require('cheerio');
const e = require('express');

async function fetchHTML(url) {
	const { data } = await axios.get(url)
	return cheerio.load(data)
}

//Viet fuction nay ne
async function crawlWeb(url) {
	let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }


	const $ = await fetchHTML(url)
	//ID
	var id;
	let cx = $('.sp3')
	cx.each((i, e) => {
		if (i == 2) {
			id = $(e).text();
		}
	})

	//href
	var href;
	// cx = $('h3 a')
	// cx.each((i, e) => {
	// 	arrHref.push("https://homedy.com/" + $(e).attr('href'))
	// })
	href = url;

	//arrTitle

	var title;
	cx = $('.re-title')
	cx.each((i, e) => {
		title = $(e).text();
	})

	//IMG

	var img;
	cx = $('.fancybox')
	cx.each((i, e) => {
		img = $(e).attr('href');
	})

	//price
	var price;
	cx = $('.re-price')
	cx.each((i, e) => {
		price = $(e).text();
	})

	//Area
	var area;
	cx = $('.ion-home')
	cx.each((i, e) => {
		area = $(e).text();
	})

	//Location
	var location;
	cx = $('.re-address')
	cx.each((i, e) => {
		location = $(e).text();
	})

	//Content
	var content;
	cx = $('div.re-content p span')
	cx.each((i, e) => {
		content = $(e).text() + '\n';
	})

	// Date
	var date;
	cx = $('.sp3');
	cx.each((i, e) => {
		if (i == 0) {
			date = $(e).text();
		}
	})

	obj.id = id;
	obj.href = href;
	obj.title = title;
	obj.img = img;
	obj.price = price;
	obj.area = area;
	obj.location = location;
	obj.content = content;
	obj.date = date;

	return obj;
}


module.exports.tinhfunc1 = async function (date, pages) {
	var result = []
	var totalPage = 0;
	if (pages) totalPage = pages;
	if (date) totalPage = 99;

	for (let index = 1; index <= totalPage; index++) {

		//csv
		const csvWriter = createCsvWriter({
			path: `/homedy-p${index}.csv`,
			header: [
				{ id: 'id', title: 'id' },
				{ id: 'href', title: 'href' },
				{ id: 'title', title: 'title' },
				{ id: 'img', title: 'img' },
				{ id: 'price', title: 'price' },
				{ id: 'area', title: 'area' },
				{ id: 'location', title: 'location' },
				{ id: 'content', title: 'content' },
				{ id: 'date', title: 'date' }
			]
		});





		const $ = await fetchHTML(`https://homedy.com/ban-nha-dat/p${index}`)
		//ID
		// var arrID = [];
		// let cx = $('.iconSave')
		// cx.each((i, e) => {

		// 	arrID.push($(e).attr('data-productid'))
		// })

		//href
		var arrHref = [];

		// .color-red.product-item .product-item-top a

		cx = $('h3 a')
		cx.each((i, e) => {
			arrHref.push("https://homedy.com/" + $(e).attr('href'))
		})

		//arrTitle

		var arrTitle = [];

		cx = $('.title.padding-hoz')
		cx.each((i, e) => {
			// console.log($(e).attr('title'));
			arrTitle.push($(e).attr('title'))
		})

		//IMG

		// var arrImg = [];
		// cx = $('.product-avatar-img')
		// cx.each((i, e) => {
		// 	arrImg.push($(e).attr('src-lazy'))
		// })

		//price
		var arrPrice = [];
		cx = $('.col.price')
		cx.each((i, e) => {
			arrPrice.push($(e).text())
		})

		//Area
		var arrArea = [];
		cx = $('.col.acreage')
		cx.each((i, e) => {

			arrArea.push($(e).text());

		})

		//Location
		var arrLocation = [];
		cx = $('.address.padding-hoz')
		cx.each((i, e) => {
			arrLocation.push($(e).text())
		})

		//Content
		var arrContent = [];
		cx = $('.description.padding-hoz')
		cx.each((i, e) => {
			arrContent.push($(e).text())
		})

		// Date
		var arrDate = [];
		cx = $('.date.padding-hoz');
		cx.each((i, e) => {
			const originalDate = $(e).text();
			const subOriginalDate = originalDate.split(" ");
			let formattedDate = dayjs();
			if (subOriginalDate[1] == "giờ") {
				formattedDate = dayjs().subtract(parseInt(subOriginalDate[0]), "hours");
			}
			else if (subOriginalDate[1] == "ngày") {
				formattedDate = dayjs().subtract(parseInt(subOriginalDate[0]), "days");
			}
			else if (subOriginalDate[1] == "tuần") {
				formattedDate = dayjs().subtract(parseInt(subOriginalDate[0]) * 7, "days");
			}
			else if (subOriginalDate[1] == "tháng") {
				formattedDate = dayjs().subtract(parseInt(subOriginalDate[0]), "months");
			}
			else if (subOriginalDate[1] == "năm") {
				formattedDate = dayjs().subtract(parseInt(subOriginalDate[0]), "years");
			}
			arrDate.push(formattedDate.format("MM/DD/YYYY HH:mm:ss"));
		})

		//  console.log(arrID.length);
		//  console.log(arrHref.length);
		//  console.log(arrTitle.length);
		//  console.log(arrImg.length);
		//  console.log(arrPrice.length);
		//  console.log(arrArea.length);
		//  console.log(arrLocation.length);
		//  console.log(arrContent.length);
		//  console.log(arrDate.length);


		//Thêm data vào record
		var records = [];
		for (let i = 0; i < 20; i++) {
			// if (arrID[i]) {
			if (date) {
				if (Date.parse(date) == Date.parse(arrDate[i].slice(0, 10))) {
					let obj = { id: '', href: '', title: '', img: [], price: '', area: '', location: '', content: '', date: '' }
					// obj.id = arrID[i];
					obj.href = arrHref[i];
					obj.title = arrTitle[i];
					// obj.img.push(arrImg[i]);
					obj.price = arrPrice[i];
					obj.area = arrArea[i];
					obj.location = arrLocation[i];
					obj.content = arrContent[i];
					obj.date = arrDate[i];
					// if(checkDate == 0) records.push(obj);
					records.push(obj);
					result.push(obj);
				}
			} else {
				let obj = { id: '', href: '', title: '', img: [], price: '', area: '', location: '', content: '', date: '' }
				// obj.id = arrID[i];
				obj.href = arrHref[i];
				obj.title = arrTitle[i];
				// obj.img.push(arrImg[i]);
				obj.price = arrPrice[i];
				obj.area = arrArea[i];
				obj.location = arrLocation[i];
				obj.content = arrContent[i];
				obj.date = arrDate[i];
				// if(checkDate == 0) records.push(obj);
				records.push(obj);
				result.push(obj);
			}

			// }

		}

		//xuất file
		try {
			await csvWriter.writeRecords(records)       // returns a promise
				.then(() => {
					console.log('...Done page ' + index);
				});
			// console.log(checkDate);
		} catch (error) {
			console.log(error);
		}
		//--------------------------------

		await Promise.all(result.map(async ele => {

			const $$ = await fetchHTML(ele.href)

			//IMG
			let arrImg = [];
			cx = $$('.owl-lazy')
			cx.each((i, e) => {
				arrImg.push($$(e).attr('data-src'))
			})
			ele.img = arrImg;
			//content

			// ele.content = $$('.mb-2.leading-normal.text-justify').text();


			// id 
			cx = $$('.product-info .code');

			cx.each((i, e) => {
				if (i == 0)
					ele.id = $$(e).text()
			})



			//location

			// cx = $$('.text-grey-darker.no-underline.hidden')
			// cx.each((i, e) => {
			// 	if (i % 2 == 0) {
			// 		ele.location = $$(e).text().trim() + ", "
			// 	} else {
			// 		ele.location += $$(e).text().trim()
			// 	}

			// })

			//area
			// let tempt = $$('.flex.items-center.mr-5.max-w-24').text().trim().split('\n');
			// ele.area = tempt[0] + " m2";
			// //price
			// tempt = $$('.text-xl.font-bold.block.mr-3').text().trim().split(' ');
			// ele.price = tempt[1].trim() + " " + tempt[2].trim();
			// //title
			// cx = $$('.block.mb-4.uppercase');
			// cx.each((i, e) => {

			// 	if (i == 0) {
			// 		let abcd = $$(e).text().trim().split('\n');
			// 		ele.title = abcd[0];
			// 	}

			// })
		}))



	}
	return result;
}


module.exports.tinhfunc2 = async function (date, pages) {
	var result = []
	var totalPage = 0;
	if (pages) totalPage = pages;
	if (date) totalPage = 99;

	for (let index = 1; index <= totalPage; index++) {

		//csv
		const csvWriter = createCsvWriter({
			path: `/nhadatso1-p${index}.csv`,
			header: [
				{ id: 'id', title: 'id' },
				{ id: 'href', title: 'href' },
				{ id: 'title', title: 'title' },
				{ id: 'img', title: 'img' },
				{ id: 'price', title: 'price' },
				{ id: 'area', title: 'area' },
				{ id: 'location', title: 'location' },
				{ id: 'content', title: 'content' },
				{ id: 'date', title: 'date' }
			]
		});



		// product-item product-property

		const $ = await fetchHTML('http://www.nhadatso1.com.vn/nha-dat/nha.htm/can-ban/p${index}')
		//ID
		// var arrID = [];
		// let cx = $('.relative.h-full.relative.ml-5')
		// cx.each((i, e) => {
		// 	arrID.push($(e).attr('data-bi-listing-id'));
		// 	// console.log($(e).attr('data-bi-listing-id'));
		// })

		//href
		// var arrHref = [];

		// cx = $('.no-underline.text-primary')
		// cx.each((i, e) => {

		// 	arrHref.push('https://www.muabannhadat.vn' + $(e).attr('href'))

		// })

		// //Content
		// var arrContent = [];
		// cx = $('.text-black.no-underline.block')
		// cx.each((i, e) => {
		// 	arrContent.push($(e).text())
		// })

		// //Date
		// var arrDate = [];
		// cx = $('.text-xs.font-light.text-grey-darker')
		// cx.each((i, e) => {
		// 	let abc = $(e).text();
		// 	arrDate.push(abc)
		// 	if (date) {

		// 		if (Date.parse(date) != Date.parse(abc.slice(0, 10))) {

		// 			index = totalPage + 1;
		// 			// console.log(abc.slice(0, 10));
		// 			// console.log(date);
		// 			// console.log("-----");
		// 			// console.log(Date.parse(date));
		// 			// console.log(Date.parse(abc.slice(0, 10)));
		// 		} else {
		// 			console.log(abc);

		// 		}
		// 	}
		// })




		//ID
		// var arrID = [];
		// let cx = $('.iconSave')
		// cx.each((i, e) => {

		// 	arrID.push($(e).attr('data-productid'))
		// })

		//href
		var arrHref = [];
		cx = $('h3.title a')
		cx.each((i, e) => {
			arrHref.push($(e).attr('href'))
		})

		//arrTitle

		// var arrTitle = [];

		// cx = $('.title.padding-hoz')
		// cx.each((i, e) => {
		// 	// console.log($(e).attr('title'));
		// 	arrTitle.push($(e).attr('title'))
		// })

		//IMG

		// var arrImg = [];
		// cx = $('.product-avatar-img')
		// cx.each((i, e) => {
		// 	arrImg.push($(e).attr('src-lazy'))
		// })

		// //price
		// var arrPrice = [];
		// cx = $('.col.price')
		// cx.each((i, e) => {
		// 	arrPrice.push($(e).text())
		// })

		// //Area
		// var arrArea = [];
		// cx = $('.col.acreage')
		// cx.each((i, e) => {

		// 	arrArea.push($(e).text());

		// })

		// //Location
		// var arrLocation = [];
		// cx = $('.address.padding-hoz')
		// cx.each((i, e) => {
		// 	arrLocation.push($(e).text())
		// })

		// //Content
		// var arrContent = [];
		// cx = $('.description.padding-hoz')
		// cx.each((i, e) => {
		// 	arrContent.push($(e).text())
		// })

		//Date
		// var arrDate = [];
		// cx = $('.iconSave')
		// cx.each((i, e) => {
		// 	let abc = $(e).attr('data-datesort');
		// 	arrDate.push(abc)
		// 	if (date) {

		// 		if (Date.parse(date) != Date.parse(abc.slice(0, 10))) {

		// 			index = totalPage + 1;
		// 			// console.log(abc.slice(0, 10));
		// 			// console.log(date);
		// 			// console.log("-----");
		// 			// console.log(Date.parse(date));
		// 			// console.log(Date.parse(abc.slice(0, 10)));
		// 		} else {
		// 			console.log(abc);

		// 		}
		// 	}
		// })

		//  console.log(arrID.length);
		//  console.log(arrHref.length);
		//  console.log(arrTitle.length);
		//  console.log(arrImg.length);
		//  console.log(arrPrice.length);
		//  console.log(arrArea.length);
		//  console.log(arrLocation.length);
		//  console.log(arrContent.length);
		//  console.log(arrDate.length);







		//Thêm data vào record
		var records = [];
		for (let i = 0; i < 20; i++) {
			// if (arrID[i]) {
			if (date) {
				if (Date.parse(date) == Date.parse(arrDate[i].slice(0, 10))) {
					let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
					// obj.id = arrID[i];
					obj.href = arrHref[i];
					// obj.title = 1;
					// obj.img = 1;
					// obj.price = 1;
					// obj.area = 1;
					// // obj.location = arrLocation[i];
					// obj.content = arrContent[i];
					// obj.date = arrDate[i];
					// if(checkDate == 0) records.push(obj);
					records.push(obj);
					result.push(obj);
				}
			} else {
				let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
				// obj.id = arrID[i];
				obj.href = arrHref[i];
				// obj.title = 1;
				// obj.img = 1;
				// obj.price = 1;
				// obj.area = 1;
				// // obj.location = arrLocation[i];
				// obj.content = arrContent[i];
				// obj.date = arrDate[i];
				// if(checkDate == 0) records.push(obj);

				records.push(obj);
				result.push(obj);
			}

			// }

		}

		// xuất file
		try {
			await csvWriter.writeRecords(records)       // returns a promise
				.then(() => {
					console.log('...Done page ' + index);
				});
			// console.log(checkDate);
		} catch (error) {
			// console.log(error);
		}


	}

	await Promise.all(result.map(async ele => {

		const $$ = await fetchHTML(ele.href)

		//IMG
		// let arrImg = [];
		// cx = $$('.owl-lazy')
		// cx.each((i, e) => {
		// 	arrImg.push($$(e).attr('data-src'))
		// })
		// ele.img = arrImg;
		// //content

		// // ele.content = $$('.mb-2.leading-normal.text-justify').text();


		// // id id id 
		// cx = $$('.product-info .code');
		// cx.each((i, e) => {
		// 	ele.id = $$(e).text()
		// })



		//location

		// cx = $$('.text-grey-darker.no-underline.hidden')
		// cx.each((i, e) => {
		// 	if (i % 2 == 0) {
		// 		ele.location = $$(e).text().trim() + ", "
		// 	} else {
		// 		ele.location += $$(e).text().trim()
		// 	}

		// })

		//area
		// let tempt = $$('.flex.items-center.mr-5.max-w-24').text().trim().split('\n');
		// ele.area = tempt[0] + " m2";
		// //price
		// tempt = $$('.text-xl.font-bold.block.mr-3').text().trim().split(' ');
		// ele.price = tempt[1].trim() + " " + tempt[2].trim();
		// //title
		// cx = $$('.block.mb-4.uppercase');
		// cx.each((i, e) => {

		// 	if (i == 0) {
		// 		let abcd = $$(e).text().trim().split('\n');
		// 		ele.title = abcd[0];
		// 	}

		// })
	}))



	return result;
}

