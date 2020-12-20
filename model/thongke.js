const mongoose = require('mongoose')
const thongkeSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true,
    }
    ,
    address: {
        type: String,
        required: true,
        trim: true,
    }
    ,
    area: {
        type: Number,
        required: true,
    },
    avg: {
        type: Number,
        required: true,
    },
    
    date: {
        type: String,
        trim: true,
    }
    
},
    {
        timestamps: true,
    })

const ThongKe = mongoose.model('ThongKe', thongkeSchema);

module.exports = ThongKe;
