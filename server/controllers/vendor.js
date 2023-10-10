const { User } = require("../models/userModel");

exports.fetchVendors = async (req, res) => {
    try {
        let vendors = await User.find({role: "vendor"});
        res.status(200).json(vendors);
    } catch (error) {
      console.log(error) 
      res.status(500).json({ error: error.message });
    }
};