const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    orderNumber:{
        type: Number,
        required: true,
        default: Math.floor(10000 + Math.random() * 90000).toString()
    },
    cart:[
        {
            name:{
                type: String,
            },
            price:{
                type: Number,
            },
            quantity:{
                type: Number,
            },
            category:{
                type: String,
            },
            image:{
                type: String,
            }
        }
    ],
    totalAmount :{
        type: Number,
        required: true,
    },
    shippingAddress:{
        type: String,
    },
    orderedAt:{
        type: Date,
        default: Date.now,
    },
    status:{
        type: String,
        default: "Pending",
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;