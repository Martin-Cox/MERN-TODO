import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as  Router } from "react-router-dom";

import { Hello } from "../components/Hello";
import { CatFact } from "../components/CatFact";

ReactDOM.render(
	<Router>
		<Hello name="Martin"></Hello>
		<CatFact time="" fact=""></CatFact>
	</Router>,
	document.getElementById("example")
);