const { Product } = require("../models/productModel");

exports.newproduct = async (req, res) => {
  try {
    const productDetails = await req.body;
    const newProduct = new Product(productDetails);
    const savedUser = await newProduct.save();
    res
      .status(201)
      .json({ savedUser, message: "Successfully upload new Product" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchProducts = async (req, res) => {
  try {
      const {id} = await req.params;
      const allProduct = await Product.find({vendorId:id}).populate("vendorId");
      console.log(id,allProduct)
      res.status(200).json(allProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const { id } = await req.params;
    const update = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({ update, message: "Product Update Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = await req.params;
    const response = await Product.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


