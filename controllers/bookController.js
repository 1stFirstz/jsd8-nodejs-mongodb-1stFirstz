import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import bookModel from "../models/bookModel.js";
import teamModel from "../models/teamModel.js";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

//get
const getBooksData = async (req, res) => {
    try {
        const bookWithTeam = await bookModel.aggregate([
            {
                $lookup: {
                    from: "teams",
                    localField: "manager_id",
                    foreignField: "_id",
                    as: "teamInfo",
                },
            },
            {
                $unwind: "$teamInfo",
                // preserveNullAndEmptyArrays: true,
            },
            {
                $project: {
                    _id: 1,
                    name: "$teamInfo.name",
                    time_slot: 1,
                    duration: 1,
                },
            },
        ]);
        // console.log(bookWithTeam);

        res.status(200).json(bookWithTeam);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//create
const createBooksData = async (req, res) => {
    try {
        console.log(req.body);
        const { manager_id, time_slot, duration } = req.body;
        const parsedTimeSlot = dayjs(time_slot, "DD-MM-YYYYHH:mm", true).utc();
        const isMember = await teamModel.findById(manager_id);
        if (!isMember) {
            res
                .status(400)
                .json({ message: "Invalid manager_id. Not found in teams." });
            return;
        }

        if (!parsedTimeSlot.isValid()) {
            res
                .status(400)
                .json({ message: "Invalid time_slot. Must be a valid date format." });
            return;
        }

        if (typeof duration !== "number") {
            res.status(400).json({ message: "Invalid duration. Must be a number." });
            return;
        }

        const newBook = await bookModel.create({
            manager_id,
            time_slot: parsedTimeSlot.toISOString(),
            duration,
        });

        res.status(200).json({ message: "created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
//delete
const deleteBooksData = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBook = await bookModel.findByIdAndDelete(id);

        if (!deleteBook) {
            res.status(404).json({ message: "Book not found." });
            return;
        }

        res.status(200).json({ message: "deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateBooksData = async (req, res) => {
    try {
        const { id } = req.params;
        const { manager_id, time_slot, duration } = req.body;

        const book = await bookModel.findById(id);
        if (!book) {
            res.status(404).json({ message: "update not found" });
            return;
        }

        if (manager_id) {
            const isMember = await teamModel.findById(manager_id);
            if (!isMember) {
                res.status(400).json({ message: " book not found " });
                return;
            }
            book.manager_id = manager_id;
        }

        if (time_slot) {
            const parsedTimeSlot = dayjs(time_slot, "DD-MM-YYYYHH:mm", true).utc();
            if (!parsedTimeSlot.isValid()) {
                res.status(400).json({ message: "time update not found " });
                return;
            }
            book.time_slot = parsedTimeSlot.toISOString();
        }

        if (duration !== undefined) {
            if (typeof duration !== "number") {
                res.status(400).json({ message: " Invalid duration. Must be a number" });
                return;
            }
            book.duration = duration;
        }
        await book.save();

        res.status(200).json({ message: "updated", book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export { getBooksData, createBooksData, deleteBooksData, updateBooksData };