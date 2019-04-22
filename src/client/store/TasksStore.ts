import { observable, action } from "mobx";

import { TaskStore } from "../store/TaskStore";
import { Task } from "../../common/definitions/Task";

export class TasksStore {
	/** The tasks. */
	@observable
	private _tasks: TaskStore[] = [];

	/** Whether the amount of tasks exceeds the limit. */
	@observable
	private _isOverLimit: boolean = false;

	public get tasks(): TaskStore[] {
		return this._tasks;
	}

	public get isOverLimit(): boolean {
		return this._isOverLimit;
	}

	@action
	public addTask(): void {
		const task = new TaskStore({}, (taskToDelete) => this._deleteTask(taskToDelete));

		this._tasks.push(task);

		if (this.tasks.length === 10) {
			this._isOverLimit = true;
		}
	}

	@action
	public getTasks(): void {
		fetch("http://localhost:8080/task", {
			mode: "cors"
		})
		.then((response) => response.json())
		.then((rawTasks: Task[]) => {
			const tasks: TaskStore[] = [];

			rawTasks.forEach((rawTask) => {
				tasks.push(new TaskStore(rawTask, () => this._deleteTask));
			});

			this._tasks = tasks;
		});
	}

	@action
	private _deleteTask(task: TaskStore): void {
		this._tasks = this.tasks.splice(this.tasks.indexOf(task), 1);

		if (this._tasks.length < 10) {
			this._isOverLimit = false;
		}
	}
}
