import express from 'express'
import {getBooksData,createBooksData, deleteBooksData, updateBooksData} from "../controllers/bookController.js"



const bookRouter = express.Router();
bookRouter.get("/", getBooksData);
bookRouter.post("/", createBooksData);
bookRouter.put("/:id", updateBooksData);
bookRouter.delete("/:id",deleteBooksData);


export default bookRouter;