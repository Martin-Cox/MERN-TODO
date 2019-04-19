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
	).option(
		"directory",
		{
			alias: "d",
			description: "The database installation directory.",
			default: "C:\\Temp\\database"
		}
	).option(
		"port",
		{
			alias: "p",
			description: "The database server port.",
			default: 27017
		}
	).option(
		"name",
		{
			description: "The database name.",
			default: "test"
		}
	)
	.argv;

const newInstall = args.new;
const directory = args.directory;
const port = args.port;
const name = args.name;
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
		collection = await database.createCollection("people");
	} catch {
		console.log("Failed to create collection");
		return;
	}

	console.log("Successfully created collection");
	console.log("Inserting documents");
	try {
		await collection.insertMany([{
			name: "Tom"
		}, {
			name: "Dick"
		}, {
			name: "Harry"
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

	console.log(name);
	const database = client.db(name);
	const collection = database.collection("people");

	let result: any[] = [];

	console.log("Finding document");
	try {
		result = await collection.find({ name: "Dick" }).toArray();
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
