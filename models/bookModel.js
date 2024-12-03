import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    manager_id: { type: Object, require: true },
    time_slot: { type: String, require: true },
    duration: { type: Number, require: true }

})

export default bookModel;