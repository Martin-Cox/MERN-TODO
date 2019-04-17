
import * as mongodb from "mongodb";

const url = "mongodb://localhost:27017";
const databaseName = "test";

/** Populates the mongo database. */
async function main(): Promise<void> {
	const client = new mongodb.MongoClient(url, { useNewUrlParser: true });

	console.log("Connecting to database server");
	try {
		await client.connect();
	} catch {
		console.log("Failed to connect to database server");
		return;
	}

	console.log("Successfully connected to database server");
	console.log("Creating database");
	const database = client.db(databaseName);

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

	let result: any[] = [];

	console.log("Successfully inserted documents");
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

main();
