import * as React from "react";

export interface HelloProps {
	name: string
}

/** A simple component that greets you. */
export class Hello extends React.Component<HelloProps, { name: string }> {
	/**
	 * Creates a Hello component.
	 * @param props The properties.
	 */
	public constructor(props: HelloProps) {
		super(props);
		this.state = { name: this.props.name };

		// TODO: Investigate ways to auto-bind methods.
		this.onChange = this.onChange.bind(this);
	}

	/**
	 * Renders the component.
	 */
	public render(): React.ReactNode {
		return (
			<form>
				<h1>Hello {this.state.name}!</h1>
				<label htmlFor="name">Name: </label>
				<input
					id="name"
					onChange={this.onChange}
					value={this.state.name}
				/>
			</form>
		)
	}

	public onChange(event: any): void {
		this.setState({ name: event.target.value });
	}
}