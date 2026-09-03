import express, { type Express, type Request, type Response } from "express";
import messagesRouter from "../src/routes/contact.js";
import cors from "cors";

const PORT = 3000;
const app: Express = express();

// using json
app.use(express.json());
app.use(cors());
// fetch Messages Route
app.use("/api/messages", messagesRouter);

// listeing the port
app.listen(PORT, () => {
  console.log(`listening now on ${PORT}`);
});
