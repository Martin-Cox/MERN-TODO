import boundMethod from "autobind-decorator";


import * as React from "react";

import { computed } from "mobx";
import { observer } from "mobx-react";


import { TasksStore } from "../store/TasksStore";
import { Task } from "../../common/definitions/Task";

export interface TasksProps {
	store: TasksStore
}

@observer
export class Tasks extends React.Component<TasksProps, TasksProps> {
	@computed
	private get _tasks(): Task[] {
		return this.props.store.tasks;
	}

	@computed
	private get _isOverLimit(): boolean {
		return this.props.store.isOverLimit;
	}

	/**
	 * Renders the component.
	 */
	public render(): React.ReactNode {
		let addTaskArea: React.HTMLProps<React.AllHTMLAttributes<any>>;

		if (this._isOverLimit) {
			addTaskArea = <p>Too many tasks!</p>
		} else {
			addTaskArea = <button onClick={this._add}>+</button>;
		}

		return (
			<div className="tasks">
				<div className="header">
					<p>Title</p>
					<p>Description</p>
					<p>Owner</p>
					<p>Deadline</p>
				</div>
				{addTaskArea}
			</div>
		)
	}

	/**
	 * Called when the component is mounted into the DOM.
	 */
	public componentDidMount(): void {
		this.props.store.getTasks();
	}

	@boundMethod
	private _add(): void {
		this.props.store.addTask();
	}
}