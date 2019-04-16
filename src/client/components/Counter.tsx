import boundMethod from "autobind-decorator";

import * as React from "react";

import { CounterStore } from "../store/CounterStore";

import { observable } from "mobx";
import { observer } from "mobx-react";

export interface CounterProps {
	store: CounterStore
}

/** A component that interacts with a mobx store. */
@observer
export class Counter extends React.Component<CounterProps, CounterProps> {
	/** The store. */
	@observable
	private _store: CounterStore;

	/**
	 * Creates a Counter component.
	 * @param props The properties.
	 */
	public constructor(props: CounterProps) {
		super(props);

		this._store = props.store;
	}

	/**
	 * Renders the component.
	 */
	public render(): React.ReactNode {
		return (
			<div className="counter">
				<p>Value: {this._store.count}</p>
				<p>Binary: {this._store.binary}</p>
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
		this._store.resetCount();
	}
}