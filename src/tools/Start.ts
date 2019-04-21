import "dotenv/config";

import * as child from "child_process";
import * as fs from "fs-extra";
import * as yargs from "yargs";
import * as mongodb from "mongodb";

const args = yargs
	.option(
		"new",
		{
			alias: "n",
			description: "Whether the database is being installed for the first time (or if an existing installation should be overwritten).",
			default: false
		}
	)
	.argv;

const newInstall = args.new;
const directory = process.env.DATABASE_DIRECTORY;
const port = process.env.DATABASE_PORT;
const name = process.env.DATABASE_NAME;
const serverUrl = `mongodb://localhost:${port}`

if (newInstall) {
	console.log(`Starting new installation at "${directory}"`);

	if (fs.existsSync(directory)) {
		console.log("Removing existing directory");
		fs.removeSync(directory);
	};

	console.log("Creating new directory");
	fs.mkdirSync(directory);
}

console.log(`Starting database server at "${serverUrl}"`);
child.spawn(`cd build && mongod --dbpath=${directory}`, { shell: true });

if (newInstall) {
	console.log("New install detected, populating with test data.");
	populate();
} else {
	console.log("Existing database detected.");
	read();
}

/**
 * Populates the mongo database with test data.
 */
async function populate(): Promise<void> {
	const client = new mongodb.MongoClient(serverUrl, { useNewUrlParser: true });

	console.log("Connecting to database server");
	try {
		await client.connect();
	} catch {
		console.log("Failed to connect to database server");
		return;
	}

	console.log("Successfully connected to database server");
	console.log(`Creating database "${name}"`);
	const database = client.db(name);

	let collection: mongodb.Collection;

	console.log("Successfully created database");
	console.log("Creating collection");
	try {
		collection = await database.createCollection("tasks");
	} catch {
		console.log("Failed to create collection");
		return;
	}

	console.log("Successfully created collection");
	console.log("Inserting documents");
	try {
		await collection.insertMany([{
			title: "Test Task #1",
			description: "A test task",
			owner: "Martin",
			deadline: new Date(2020, 4, 3, 15)
		}, {
			title: "Test Task #2",
			description: "Another test task",
			owner: "Harry",
			deadline: new Date(2022, 8, 2, 6)
		}]);
	} catch {
		console.log("Failed to insert documents");
		return;
	}

	console.log("Successfully inserted documents");

	read(client);
}

 /**
  * Reads test data from the mongo database.
  * @param client The optional database client.
  */
async function read(client?: mongodb.MongoClient): Promise<void> {
	if (!client) {
		client = new mongodb.MongoClient(serverUrl, { useNewUrlParser: true });

		await client.connect();
	}

	const database = client.db(name);
	const collection = database.collection("tasks");

	let result: any[] = [];

	console.log("Finding document");
	try {
		result = await collection.find({ title: "Test Task #1" }).toArray();
	} catch {
		console.log("Error finding document");
		return;
	}

	if (result.length === 1) {
		console.log("Found document:");
		console.log(result[0]);
	} else {
		console.log("Failed to find document");
	}

	client.close();
}
