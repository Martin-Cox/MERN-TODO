import boundMethod from "autobind-decorator";


import * as React from "react";

import { computed } from "mobx";
import { observer } from "mobx-react";


import { TasksStore } from "../store/TasksStore";
import { Task } from "../components/Task";
import { TaskStore } from "client/store/TaskStore";

export interface TasksProps {
	store: TasksStore
}

@observer
export class Tasks extends React.Component<TasksProps, TasksProps> {
	@computed
	private get _tasks(): TaskStore[] {
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

		const renderedTasks = this._tasks.map((taskStore, index) => {
			return <Task store={taskStore} key={index}></Task>
		});

		return (
			<div className="tasks">
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Description</th>
							<th>Owner</th>
							<th>Deadline</th>
						</tr>
					</thead>
					<tbody>
						{renderedTasks}
					</tbody>
				</table>
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