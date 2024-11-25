const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://itsanubhav120:anubhav@cluster0.srwfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    console.log("Connected to MongoDB Atlas");
  } 
  catch (error) {
    console.error("Error connecting to MongoDB:");
  }
};

module.exports = connect;
