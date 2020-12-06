const mongoose = require('mongoose')
// let obj = { id: '', href: '', title: '', img: '', price: '', area: '', location: '', content: '', date: '' }
const webSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        
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
        
            type: String,
            required: true,
            trim: true,
        
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