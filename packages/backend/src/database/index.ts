import mongoose from "mongoose";

const options: mongoose.ConnectOptions = {};

mongoose.connect(process.env.MONGO_URI as string, options);
