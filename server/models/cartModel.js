const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

const Cart = mongoose.model("cartItems",cartSchema);

exports.Cart = Cart;