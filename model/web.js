const mongoose = require('mongoose')
// let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
const webSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
    }
    ,
    href: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    title: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    imgs: [{
        img: {
            type: String,
            required: true,
            trim: true,
        }
    }]
    ,
    area: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    location: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    content: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    date: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        timestamps: true,
    })

const Web = mongoose.model('Web', webSchema);

module.exports = Web;
//ADd chekc point return se add vao target