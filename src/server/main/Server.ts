import * as express from "express";
import * as cors  from "cors";
import * as bodyParser from "body-parser";

export interface Controller {
	router: express.Router;
}

/** The server. */
export class Server {
	/** The express application. */
	private readonly _app: express.Application;

	/** The server port. */
	private readonly _port: number;

	/**
	 * Creates the server.
	 * @param controllers The controllers.
	 * @param port The port.
	 */
	public constructor(controllers: Controller[], port: number) {
		this._app = express();
		this._port = port;

		this._initializeMiddleware();
		this._initializeControllers(controllers);
	}

	/**
	 * Starts the server.
	 */
	public start(): void {
		this._app.listen(this._port);
	}

	/**
	 * Initializes middleware.
	 */
	private _initializeMiddleware(): void {
		this._app.use(cors({ credentials: true, origin: true }));
		this._app.use(bodyParser.json());
	}

	/**
	 * Initializes the controllers.
	 * @param controllers The controllers.
	 */
	private _initializeControllers(controllers: Controller[]): void {
		controllers.forEach((controller) => this._app.use("/", controller.router));
	}
}