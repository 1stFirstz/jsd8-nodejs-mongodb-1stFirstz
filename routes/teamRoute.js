import express from "express";
import { getTeamMembers } from "../controllers/teamController.js";

const teamRoute = express.Router();

teamRoute.get("/:id", getTeamMembers);
export default teamRoute;