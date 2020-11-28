const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const axios = require("axios");
const cheerio = require('cheerio');

async function fetchHTML(url) {
    const {
        data
    } = await axios.get(url)
    return cheerio.load(data)
}

const getCSVWriter = (fileName) => createCsvWriter({
    path: fileName,
    header: [{
            id: 'id',
            title: 'id'
        },
        {
            id: 'href',
            title: 'href'
        },
        {
            id: 'title',
            title: 'title'
        },
        {
            id: 'img',
            title: 'img'
        },
        {
            id: 'price',
            title: 'price'
        },
        {
            id: 'area',
            title: 'area'
        },
        {
            id: 'location',
            title: 'location'
        },
        {
            id: 'content',
            title: 'content'
        },
        {
            id: 'date',
            title: 'date'
        }
    ]
});

module.exports = {
    fetchHTML,
    getCSVWriter
}
