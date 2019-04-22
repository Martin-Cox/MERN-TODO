import "dotenv/config";

import { Server } from "../main/Server";
import { TaskController } from "../controllers/TaskController";

const server = new Server([
	new TaskController()
], parseInt(process.env.SERVER_PORT), parseInt(process.env.DATABASE_PORT), process.env.DATABASE_NAME);

server.start();
