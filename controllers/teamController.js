import teamModel from "../models/teamModel.js";

export const getTeamMembers = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            res.status(400).json({ message: "Team ID is required" });
            return;
        }
        const members = await teamModel.findById(id);
        if (!members) {
            res.status(404).json({ message: "Team members not found" });
            return;
        }
        res.json(members)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}