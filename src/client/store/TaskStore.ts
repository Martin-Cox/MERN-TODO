import { observable, action, reaction, computed } from "mobx";

import { Task } from "../../common/definitions/Task";

export class TaskStore implements Task {
	private _id: string;

	@observable
	private _title: string;

	@observable
	private _description: string;

	@observable
	private _owner: string;

	@observable
	private _deadline: Date;

	private _deleteTaskCallback: (task: TaskStore) => void;

	constructor(properties: Partial<Task>, deleteTaskCallback: (task: TaskStore) => void) {
		this._id = properties.id;
		this.title = properties.title;
		this.description = properties.description;
		this.owner = properties.owner;
		this.deadline = properties.deadline;

		this._deleteTaskCallback = deleteTaskCallback;
	}

	public get id(): string {
		return this._id;
	}

	public get title(): string {
		return this._title;
	}

	public get description(): string {
		return this._description;
	}

	public get owner(): string {
		return this._owner;
	}

	public get deadline(): Date {
		return this._deadline;
	}

	@action
	public set title(title: string) {
		this._title = title;
	}

	@action
	public set description(description: string) {
		this._description = description;
	}

	@action
	public set owner(owner: string) {
		this._owner = owner;
	}

	@action
	public set deadline(deadline: Date) {
		this._deadline = deadline;
	}

	public save(): void {
		this.id ? this._updateTask() : this._addTask();
	}

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
