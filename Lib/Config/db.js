const mongoose = require("mongoose");

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Hasara:Hasara@blogapp.unilb.mongodb.net/"
  );
  console.log("Connected to MongoDB");
};
