
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

module.exports.batdongsanDotCom = async function (date, pages) {
    var result = []
    var totalPage = 0;
    if (pages) totalPage = pages;
    if (date) totalPage = 99;

    for (let index = 1; index <= totalPage; index++) {

        //csv
        const csvWriter = createCsvWriter({
            path: `/batdongsan-p${index}.csv`,
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





        const $ = await fetchHTML(`https://batdongsan.com.vn/nha-dat-ban/p${index}`)
        //ID
        var arrID = [];
        let cx = $('.iconSave')
        cx.each((i, e) => {

            arrID.push($(e).attr('data-productid'))
        })

        //href
        var arrHref = [];

        cx = $('.product-avatar')
        cx.each((i, e) => {

            arrHref.push("https://batdongsan.com.vn"+  $(e).attr('href'))
        })

        //arrTitle

        var arrTitle = [];

        cx = $('.product-title a')
        cx.each((i, e) => {
            // console.log($(e).attr('title'));
            arrTitle.push($(e).attr('title'))
        })

        //IMG

        var arrImg = [];
        cx = $('.product-avatar-img')
        cx.each((i, e) => {
            arrImg.push($(e).attr('src-lazy'))
        })

        //price
        var arrPrice = [];
        cx = $('.iconSave')
        cx.each((i, e) => {
            arrPrice.push($(e).attr('data-price'))
        })

        //Area
        var arrArea = [];
        cx = $('.iconSave')
        cx.each((i, e) => {
            let tempt = /[\d]+/.exec($(e).attr('data-area'));
            arrArea.push(tempt[0]+ " m2");
           
        })

        //Location
        var arrLocation = [];
        cx = $('.product-info .location')
        cx.each((i, e) => {
            arrLocation.push($(e).text())
        })

        //Content
        var arrContent = [];
        cx = $('.product-content')
        cx.each((i, e) => {
            arrContent.push($(e).text())
        })

        //Date
        var arrDate = [];
        cx = $('.iconSave')
        cx.each((i, e) => {
            let abc = $(e).attr('data-datesort');
            arrDate.push(abc)
            if (date) {

                if (Date.parse(date) != Date.parse(abc.slice(0, 10))) {

                    index = totalPage + 1;
                    // console.log(abc.slice(0, 10));
                    // console.log(date);
                    // console.log("-----");
                    // console.log(Date.parse(date));
                    // console.log(Date.parse(abc.slice(0, 10)));
                } else {
                    console.log(abc);

                }
            }
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
            if (arrID[i]) {
                if (date) {
                    if (Date.parse(date) == Date.parse(arrDate[i].slice(0, 10))) {
                        let obj = { id: '', href: '', title: '', img: [], price: '', area: '', location: '', content: '', date: '' }
                        obj.id = arrID[i];
                        obj.href = arrHref[i];
                        obj.title = arrTitle[i];
                        obj.img.push(arrImg[i]);
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
                    obj.id = arrID[i];
                    obj.href = arrHref[i];
                    obj.title = arrTitle[i];
                    obj.img.push(arrImg[i]);
                    obj.price = arrPrice[i];
                    obj.area = arrArea[i];
                    obj.location = arrLocation[i];
                    obj.content = arrContent[i];
                    obj.date = arrDate[i];
                    // if(checkDate == 0) records.push(obj);
                    records.push(obj);
                    result.push(obj);
                }

            }

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


    }
    return result;
}


module.exports.muabannhadat = async function (date, pages) {
        var result = []
        var totalPage = 0;
        if (pages) totalPage = pages;
        if (date) totalPage = 99;

        for (let index = 1; index <= totalPage; index++) {

            //csv
            const csvWriter = createCsvWriter({
                path: `/muabannhadat-p${index}.csv`,
                header: [
                    { id: 'id', title: 'id' },
                    { id: 'href', title: 'href' },
                    { id: 'title', title: 'title' },
                    { id: 'img', title: 'img' },
                    { id: 'price', title: 'price' },
                    { id: 'area', title: 'area' },
                    // { id: 'location', title: 'location' },
                    { id: 'content', title: 'content' },
                    { id: 'date', title: 'date' }
                ]
            });





            const $ = await fetchHTML(`https://www.muabannhadat.vn/mua-ban-bat-dong-san?page=${index}`)
            //ID
            var arrID = [];
            let cx = $('.relative.h-full.relative.ml-5')
            cx.each((i, e) => {
                arrID.push($(e).attr('data-bi-listing-id'));
                // console.log($(e).attr('data-bi-listing-id'));
            })

            //href
            var arrHref = [];

            cx = $('.no-underline.text-primary')
            cx.each((i, e) => {

                arrHref.push('https://www.muabannhadat.vn' + $(e).attr('href'))

            })

            //Content
            var arrContent = [];
            cx = $('.text-black.no-underline.block')
            cx.each((i, e) => {
                arrContent.push($(e).text())
            })

            //Date
            var arrDate = [];
            cx = $('.text-xs.font-light.text-grey-darker')
            cx.each((i, e) => {
                let abc = $(e).text();
                arrDate.push(abc)
                if (date) {

                    if (Date.parse(date) != Date.parse(abc.slice(0, 10))) {

                        index = totalPage + 1;
                        // console.log(abc.slice(0, 10));
                        // console.log(date);
                        // console.log("-----");
                        // console.log(Date.parse(date));
                        // console.log(Date.parse(abc.slice(0, 10)));
                    } else {
                        console.log(abc);

                    }
                }
            })


            //Thêm data vào record
            var records = [];
            for (let i = 0; i < 20; i++) {
                if (arrID[i]) {
                    if (date) {
                        if (Date.parse(date) == Date.parse(arrDate[i].slice(0, 10))) {
                            let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
                            obj.id = arrID[i];
                            obj.href = arrHref[i];
                            obj.title = 1;
                            obj.img = 1;
                            obj.price = 1;
                            obj.area = 1;
                            // obj.location = arrLocation[i];
                            obj.content = arrContent[i];
                            obj.date = arrDate[i];
                            // if(checkDate == 0) records.push(obj);
                            records.push(obj);
                            result.push(obj);
                        }
                    } else {
                        let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
                        obj.id = arrID[i];
                        obj.href = arrHref[i];
                        obj.title = 1;
                        obj.img = 1;
                        obj.price = 1;
                        obj.area = 1;
                        // obj.location = arrLocation[i];
                        obj.content = arrContent[i];
                        obj.date = arrDate[i];
                        // if(checkDate == 0) records.push(obj);

                        records.push(obj);
                        result.push(obj);
                    }

                }

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
      await Promise.all(result.map( async ele=>   {

            const $$ = await fetchHTML(ele.href)

            //IMG
            let arrImg = [];
            cx = $$('.flex.items-center.h-64 img')
            cx.each((i, e) => {
                arrImg.push($$(e).attr('src'))
            })
            ele.img = arrImg;
            //content

            ele.content = $$('.mb-2.leading-normal.text-justify').text();


            //location

            cx = $$('.text-grey-darker.no-underline.hidden')
            cx.each((i, e) => {
                if (i % 2 == 0) {
                    ele.location = $$(e).text().trim() + ", "
                } else {
                    ele.location += $$(e).text().trim()
                }

            })

            //area
            let tempt = $$('.flex.items-center.mr-5.max-w-24').text().trim().split('\n');
            ele.area = tempt[0] + " m2";
            //price
            tempt = $$('.text-xl.font-bold.block.mr-3').text().trim().split(' ');
            ele.price = tempt[1].trim() + " " + tempt[2].trim();
            //title
            cx = $$('.block.mb-4.uppercase');
            cx.each((i, e) => {

                if (i == 0) {
                    let abcd = $$(e).text().trim().split('\n');
                    ele.title = abcd[0];
                }

            })
        }))



        return result;
    }

