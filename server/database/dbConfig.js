const mongoose = require("mongoose");

exports.connection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb connection successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "Mongodb connecection error. Please make sure MongoDB is running," + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went Wrong");
    console.log(error);
  }
};
