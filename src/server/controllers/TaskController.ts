import * as express from "express";

import { Controller } from "../main/Server";
import { Task } from "../../common/definitions/Task";

import { TaskModel } from "../models/TaskModel";

/** The TaskController. */
export class TaskController implements Controller {
	/** The root controller path. */
	private readonly _path = "/task";

	/** THe controller router. */
	private readonly _router: express.Router;

	private _taskModel = TaskModel;

	/**
	 * Creates the TaskController.
	 */
	public constructor() {
		this._router = express.Router();
		this._initializeRoutes();
	}

	/** Gets the router. */
	public get router(): express.Router {
		return this._router;
	}

	/** Initializes the routes. */
	private _initializeRoutes(): void {
		this._router.get(this._path, (request: express.Request, response: express.Response) => this._getAllTasks(request, response));
		this._router.post(`${this._path}\\add`, (request: express.Request, response: express.Response) => this._addTask(request, response));
		this._router.post(`${this._path}\\update`, (request: express.Request, response: express.Response) => this._updateTask(request, response));
		this._router.delete(this._path, (request: express.Request, response: express.Response) => this._deleteTask(request, response));
	}

	private _getAllTasks(request: express.Request, response: express.Response): void {
		this._taskModel.find().then((tasks) => {
			console.log("Tasks:");
			console.log(tasks);

			response.send(tasks);
		});
	}

	private _addTask(request: express.Request, response: express.Response): void {
		const taskData = request.body as Task;
		const task = new TaskModel(taskData);
		task.save().then((savedTask) => {
			response.send({ id: savedTask._id });
		});
	}

	private _deleteTask(request: express.Request, response: express.Response): void {
		const id = request.body.id;
		this._taskModel.findByIdAndDelete(id).then((success) => {
			success ? response.send(200) : response.send(404);
		});
	}

	private _updateTask(request: express.Request, response: express.Response): void {
		const id = request.body.id;
		const taskData = request.body as Task;
		this._taskModel.findByIdAndUpdate(id, taskData).then(() => {
			response.send(200);
		});
	}
}