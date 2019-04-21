import * as mongoose from "mongoose";

import { Task } from "../../common/definitions/Task";

const taskSchema = new mongoose.Schema({
	title: String,
	description: String,
	owner: String,
	deadline: Date
});

// Mongoose seems to lowercase + pluralize the model name to get the collection name, see https://mongoosejs.com/docs/models.html
// I have defined the "tasks" collection here to make it more explicit.
export const TaskModel = mongoose.model<Task & mongoose.Document>("Task", taskSchema, "tasks");
