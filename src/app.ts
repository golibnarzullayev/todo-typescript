import express from "express";
import "dotenv/config";
import db from "mongoose";
import todoRoutes from "./routes/todos";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/todos", todoRoutes);

app.use((err:Error, req:express.Request, res:express.Response, next:express.NextFunction) => {
   res.status(500).json({ message: err.message });
})

const MONGO_URI = process.env.MONGO_URI as string;
db.connect(MONGO_URI)
   .then(() => {
      console.log("Database connected")
   }).catch((err:Error) => {
      console.log(err.message);
   })

const PORT = process.env.PORT || '3000';
app.listen(Number(PORT), () => {
   console.log(`Server running on port: ${PORT}`)
})