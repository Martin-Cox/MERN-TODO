import boundMethod from "autobind-decorator";

import * as React from "react";

export interface CatProps {
	time: string,
	fact: string
}

/** A component that gets cat data from the server. */
export class CatFact extends React.Component<CatProps, CatProps & { newFact: string}> {
	/**
	 * Creates a CatFact component.
	 * @param props The properties.
	 */
	public constructor(props: CatProps) {
		super(props);
		this.state = { time: props.time, fact: props.fact, newFact: "" };
	}

	/**
	 * Renders the component.
	 */
	public render(): React.ReactNode {
		return (
			<div className="cat-fact">
				<p>Time: {this.state.time}</p>
				<p>Fact: {this.state.fact}</p>
				<button onClick={this._fetchFact}>
					Get a cat fact!
				</button>
				<input
					id="new-fact"
					onChange={this._onChange}
					value={this.state.newFact}
				/>
				<button onClick={this._submitFact}>
					Submit fact!
				</button>
			</div>
		)
	}

	/**
	 * Called when the component is mounted into the DOM.
	 */
	public componentDidMount(): void {
		this._fetchFact();
	}

	/**
	 * Fetches a cat fact.
	 */
	@boundMethod
	private _fetchFact(): void {
		fetch("http://localhost:8080/cat", { mode: "cors" })
		.then((result) => result.json())
		.then((result) => {
			if (!result || !result.fact) {
				console.error("Something went wrong!");
				console.log(result);

				return;
			}

			this.setState({
				time: result.time,
				fact: result.fact
			});
		});
	}

	/**
	 * Handles input change.
	 * @param event The event.
	 */
	@boundMethod
	private _onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({ newFact: event.target.value });
	}

	/**
	 * Submits a cat fact.
	 */
	@boundMethod
	private _submitFact(): void {
		fetch("http://localhost:8080/cat", { 
			mode: "cors",
			method: "POST",
			body: JSON.stringify({ fact: this.state.newFact }),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(() => this.setState({ newFact: "" }));
	}
}