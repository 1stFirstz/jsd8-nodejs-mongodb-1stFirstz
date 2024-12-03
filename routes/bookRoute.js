import express from "express";
import { getBookData, createBookData, deleteBookData } from "../controllers/bookController.js"

const bookRouter = express.Router();
bookRouter.get("/", getBooksData);
bookRouter.post("/", createBookData);
bookRouter.put("/:id");
bookRouter.delete("/:id", deleteBookData);

export default bookRouter;