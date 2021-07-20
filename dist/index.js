"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_index_1 = __importDefault(require("./routes/routes.index"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const upload = multer_1.default();
const app = express_1.default();
var corsOptions = {
    origin: "http://localhost:8081",
};
app.use(cors_1.default(corsOptions));
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(upload.array());
app.use(express_1.default.static("public"));
app.use(routes_index_1.default);
app.listen(8080, () => {
    console.log("server on port", 8080);
});
