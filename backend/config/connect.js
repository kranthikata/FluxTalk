const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connection Successful...");
  } catch (e) {
    console.log(`Database Connection Failed: ${e.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
