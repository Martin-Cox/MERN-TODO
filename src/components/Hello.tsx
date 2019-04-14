import * as React from "react";

export interface HelloProperties {
	name?: string
}

export class Hello extends React.Component<HelloProperties, { name: "" }> {
	/**
	 * Creates a Hello component.
	 * @param properties The properties.
	 */
	public constructor(properties: HelloProperties) {
		super(properties);
	}

	/**
	 * Renders the component.
	 */
	public render(): React.ReactNode {
		return (
			<h1>Hello World!</h1>
		)
	}
}