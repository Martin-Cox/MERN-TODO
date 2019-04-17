import boundMethod from "autobind-decorator";

import * as React from "react";

import { CounterStore } from "../store/CounterStore";

import { computed } from "mobx";
import { observer } from "mobx-react";

export interface CounterProps {
	store: CounterStore
}

/** A component that interacts with a mobx store. */
@observer
export class Counter extends React.Component<CounterProps, CounterProps> {
	@computed
	private get _count(): number {
		return this.props.store.count;
	}

	@computed
	private get _binary(): string {
		return this.props.store.binary;
	}

	/**
	 * Renders the component.
	 */
	public render(): React.ReactNode {
		return (
			<div className="counter">
				<p>Value: {this._count}</p>
				<p>Binary: {this._binary}</p>
				<button onClick={this._resetCount}>
					Reset the count!
				</button>
			</div>
		)
	}

	/**
	 * Resets the count on the store.
	 */
	@boundMethod
	private _resetCount(): void {
		this.props.store.resetCount();
	}
}