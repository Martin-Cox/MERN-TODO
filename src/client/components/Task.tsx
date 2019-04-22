import boundMethod from "autobind-decorator";


import * as React from "react";

import { computed } from "mobx";
import { observer } from "mobx-react";


import { TaskStore } from "../store/TaskStore";

export interface TaskProps {
	store: TaskStore
}

@observer
export class Task extends React.Component<TaskProps, TaskProps> {
	@computed
	private get _title(): string {
		return this.props.store.title;
	}

	@computed
	private get _description(): string {
		return this.props.store.description;
	}

	@computed
	public get _owner(): string {
		return this.props.store.owner;
	}

	@computed
	public get _deadline(): Date {
		return this.props.store.deadline;
	}

	/**
	 * Renders the component.
	 */
	public render(): React.ReactNode {
		return (
			<tr className="task-row">
				<td>{this._title}</td>
				<td>{this._description}</td>
				<td>{this._owner}</td>
				<td>{this._deadline}</td>
			</tr>
		)
	}
}