import "dotenv/config";

import { Server } from "../main/Server";
import { CatFact } from "../controllers/CatFact";

const server = new Server([
	new CatFact()
], parseInt(process.env.SERVER_PORT));

server.start();
