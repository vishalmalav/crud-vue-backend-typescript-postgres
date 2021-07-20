import { json } from "body-parser";
import express from "express";
import indexRouter from "./routes/routes.index";
import multer from "multer";
import cors from "cors";
const upload = multer();
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.array());
app.use(express.static("public"));
app.use(indexRouter);

app.listen(8080, () => {
  console.log("server on port", 8080);
});
