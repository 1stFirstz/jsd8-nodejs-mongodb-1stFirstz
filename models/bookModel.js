import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    manager_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    time_slot: { type: Date, default: Date.now },
    duration: { type: Number, required: true },
});
const bookModel = mongoose.models.book || mongoose.model("book", bookSchema);
export default bookModel;