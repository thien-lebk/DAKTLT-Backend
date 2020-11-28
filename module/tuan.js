const fetch = require('node-fetch');
var fp = require('lodash/fp');

module.exports.batdongsan321 = async function (date, pages) {
    var totalPage = 0;
    if (pages) totalPage = pages;
    if (date) totalPage = 99;

    let pageIds = fp.range(1, ++totalPage);
    let fetchPages = fp.flow(
        fp.map(page => `https://batdongsan321.com/api/v1/home/demand/1/posts?page=${page}`),
        fp.map(url => fetch(url)),
        fp.map(async (promisedFetch) => (await promisedFetch).json()),
        fp.map(async (promise) => {
            try{
                return await promise;
            } catch {
                return {};
            }
        }),
    )

    let data = await Promise.all(fetchPages(pageIds));
    let mapData = fp.flow(
        fp.filter(aRecord => !!aRecord),
        fp.filter(aRecord => !!aRecord.data),
        fp.map(aRecord => aRecord.data),
    )

    data = fp.flatten(mapData(data))

    mapData = fp.flow(
        fp.map(aRecord => {
            try{
                return {
                    id: aRecord['id'] || null,
                    href: aRecord['url'] || "",
                    title: aRecord['title'] || "",
                    img: aRecord['thumbnail'] ||  "",
                    price: aRecord['price_format'].replace('<strong>','').replace('</strong>', '') || "",
                    area: aRecord['area'] ||  "",
                    location: aRecord['district_name'] || "",
                }
            } catch {
                return null;
            }
        }),
        fp.filter(aRecord => !!aRecord),
    )

    let mappedData = mapData(data);
    // try {
    //     let CSVWriter = getCSVWriter("./batdongsan321.csv");
    //     await CSVWriter.writeRecords(mappedData)       
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const fs = require('fs');

        let stringJSON = JSON.stringify(mappedData);
        fs.writeFileSync('./crawldata/batdongsan312.json', stringJSON);
    } catch (error) {
        console.log(error);
    }

    return mappedData;
}