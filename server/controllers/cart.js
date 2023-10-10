const { getDataFromToken } = require("../utils/getData");
const { Cart } = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const id = getDataFromToken(req);
    const data = await req.body;
    const newCart = new Cart({ ...data, user: id });
    const savedCart = await newCart.save();
    savedCart.populate("productId");
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchCartItem = async (req, res) => {
  try {
    const id = getDataFromToken(req);

    const fetchItem = await Cart.find({ user: id }).populate("productId");
    res.status(201).json(fetchItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = await req.params;
    const updateData = await req.body;
    const updateCartItem = await Cart.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("productId");
    res.status(201).json(updateCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Items Sucessfully Deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};
