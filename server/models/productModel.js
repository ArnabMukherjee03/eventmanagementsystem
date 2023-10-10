const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String
    },
    price:{
        type: Number
    },
    vendorId:{
        type: String,
        ref: 'users'
    },
    productImage:{
        type: String
    }
});

const Product = mongoose.model("products", productSchema);

exports.Product = Product;
