import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

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
	 * @param serverPort The port the server is running on.
	 * @param databasePort The port the database is running on.
	 * @param database The database.
	 */
	public constructor(controllers: Controller[], serverPort: number, databasePort: number, database: string) {
		this._app = express();
		this._port = serverPort;

		// Connect to the database.
		mongoose.connect(`mongodb://localhost:${databasePort}/${database}`, { useNewUrlParser: true }).then(() => {
			console.log(`Connected to "${database}" running on port ${databasePort}`);
		});

		mongoose.set("debug", true);

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