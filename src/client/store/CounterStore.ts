import { observable, action, reaction, computed } from "mobx";

/** A simple store that counts to 50. */
export class CounterStore {
	/** The count. */
	@observable
	private _count: number  = 0;

	/**
	 * Creates the CounterStore.
	 */
	constructor() {
		// Start counting.
		setInterval(() => this._count++, 500);

		// Set up a reaction that resets the count when it hits 50.
		reaction(
			() => this._count > 50,
			(isOverLimit) => {
				if (isOverLimit) {
					this.resetCount();
				}
			}
		)
	}

	/** Gets the count. */
	public get count(): number {
		return this._count;
	}

	/** Gets the count represented as a binary string. */
	@computed
	public get binary(): string {
		return this._count.toString(2).padStart(6, "0");
	}

	/**
	 * Resets the count.
	 */
	@action
	public resetCount(): void {
		this._count = 0;
	}
}
