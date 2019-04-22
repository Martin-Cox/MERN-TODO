import * as mongoose from "mongoose";

import { Task } from "../../common/definitions/Task";

const taskSchema = new mongoose.Schema({
	title: String,
	description: String,
	owner: String,
	deadline: Date
});

// Map the MongoDB "_id" field to the "id" field at runtime.
taskSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

taskSchema.set("toObject", { virtuals: true });
taskSchema.set("toJSON", { virtuals: true });

// Mongoose seems to lowercase + pluralize the model name to get the collection name, see https://mongoosejs.com/docs/models.html
// I have defined the "tasks" collection here to make it more explicit.
export const TaskModel = mongoose.model<Task & mongoose.Document>("Task", taskSchema, "tasks");
