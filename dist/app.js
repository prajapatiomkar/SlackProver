"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statusCodes_1 = require("./constants/statusCodes");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.status(statusCodes_1.CODE.OK).json({ message: "working!" });
});
app.listen(3000, () => {
    console.log(`server is up and running!`);
});
