import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter as  Router } from "react-router-dom";

import { Hello } from "../components/Hello";
import { CatFact } from "../components/CatFact";
import { CounterStore } from "../store/CounterStore";
import { Counter } from "../components/Counter";

ReactDOM.render(
	<Router>
		<Hello name="Martin"></Hello>
		<CatFact time="" fact=""></CatFact>
		<Counter store={new CounterStore()}></Counter>
	</Router>,
	document.getElementById("example")
);
