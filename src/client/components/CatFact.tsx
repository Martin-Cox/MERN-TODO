import boundMethod from "autobind-decorator";

import * as React from "react";

export interface CatProps {
	time: string,
	fact: string
}

/** A component that requests a cat fact from the server. */
export class CatFact extends React.Component<CatProps, CatProps> {
	/**
	 * Creates a CatFact component.
	 * @param props The properties.
	 */
	public constructor(props: CatProps) {
		super(props);
		this.state = { time: props.time, fact: props.fact };
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
		fetch("http://localhost:8080/", { mode: "cors" })
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
}