import { observable, action, reaction, computed } from "mobx";

import { Task } from "../../common/definitions/Task";

/** A store for an individual task. */
export class TaskStore implements Task {
	/** The task id. */
	private _id: string;

	/** The task title. */
	@observable
	private _title: string;

	/** The task description. */
	@observable
	private _description: string;

	/** The task owner. */
	@observable
	private _owner: string;

	/** The task deadline. */
	@observable
	private _deadline: Date;

	/** A callback that should be executed when this task is deleted. */
	private _deleteTaskCallback: (task: TaskStore) => void;

	/**
	 * Creates a Task.
	 * @param properties The tasks initial properties.
	 * @param deleteTaskCallback A callback that should be executed when this task is deleted.
	 */
	constructor(properties: Partial<Task>, deleteTaskCallback: (task: TaskStore) => void) {
		this._id = properties.id;
		this.title = properties.title;
		this.description = properties.description;
		this.owner = properties.owner;
		this.deadline = properties.deadline;

		this._deleteTaskCallback = deleteTaskCallback;
	}

	/** Gets the task id. */
	public get id(): string {
		return this._id;
	}

	/** Gets/sets the task title. */
	public get title(): string {
		return this._title;
	}
	@action
	public set title(title: string) {
		this._title = title;
	}

	/** Gets/sets the task description. */
	public get description(): string {
		return this._description;
	}
	@action
	public set description(description: string) {
		this._description = description;
	}

	/** Gets/sets the task owner. */
	public get owner(): string {
		return this._owner;
	}
	@action
	public set owner(owner: string) {
		this._owner = owner;
	}

	/** Gets/sets the task deadline. */
	public get deadline(): Date {
		return this._deadline;
	}
	@action
	public set deadline(deadline: Date) {
		this._deadline = deadline;
	}

	/**
	 * Saves the task.
	 */
	public save(): void {
		this.id ? this._updateTask() : this._addTask();
	}

	/**
	 * Deletes the task.
	 */
	public delete(): void {
		fetch("http://localhost:8080/task", {
			mode: "cors",
			method: "DELETE",
			body: JSON.stringify({ id: this.id }),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(() => {
			this._deleteTaskCallback(this);
		});
	}

	/**
	 * Adds the task.
	 */
	private _addTask(): void {
		fetch("http://localhost:8080/task/add", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify(this),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((response) => {
			//this._id = response.body.id;
		});
	}

	/**
	 * Updates the task.
	 */
	private _updateTask(): void {
		fetch("http://localhost:8080/task/update", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify(this),
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
}
