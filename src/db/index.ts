import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection =  mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb connection established");
    });
    connection.on("error", (err) => {
      console.log(
        "Mongodb connection error please male sure db is runningg" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Db Connection Error ");
    console.log("ERROR::", error);
  }
}
