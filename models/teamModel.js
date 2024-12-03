import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, require:true },
    position: { type: String, require:ture },
});

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;