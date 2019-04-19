import * as express from "express";

import { Controller } from "../main/Server";

/** The CatFact controller. */
export class CatFact implements Controller {
	/** The controller path. */
	private readonly _path = "/cat";

	/** THe controller router. */
	private readonly _router: express.Router;

	/** Cat facts. */
	private readonly _facts: string[] = [];

	/**
	 * Creates the CatFact controller.
	 */
	public constructor() {
		this._router = express.Router();

		this._facts = [
			"There are over 500 million domestic cats in the world",
			"Cats and humans have been associated for nearly 10000 years",
			"Cats conserve energy by sleeping for an average of 13 to 14 hours a day",
			"On average cats live for around 12 to 15 years"
		];

		this._initializeRoutes();
	}

	/** Gets the router. */
	public get router(): express.Router {
		return this._router;
	}

	/** Initializes the routes. */
	private _initializeRoutes(): void {
		this._router.get(this._path, (request: express.Request, response: express.Response) => this._getFact(request, response));
		this._router.post(this._path, (request: express.Request, response: express.Response) => this._postFact(request, response));
	}

	/** Gets a cat fact and adds it to the response. */
	private _getFact(request: express.Request, response: express.Response): void {
		const factIndex = Math.floor(Math.random() * this._facts.length);

		response.send({
			time: new Date().toISOString(),
			fact: this._facts[factIndex]
		});
	}

	/** Adds a cat fact from the request. */
	private _postFact(request: express.Request, response: express.Response): void {
		this._facts.push(request.body.fact);

		response.status(201).end();
	}
}