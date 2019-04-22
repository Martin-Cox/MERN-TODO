import * as React from "react";
import * as ReactDOM from "react-dom";

import { BrowserRouter as  Router } from "react-router-dom";

import { TasksStore } from "../store/TasksStore";
import { Tasks } from "../components/Tasks";

ReactDOM.render(
	<Router>
		<Tasks store={new TasksStore()}></Tasks>>
	</Router>,
	document.getElementById("example")
);
