import * as child from "child_process";
import * as fs from "fs-extra";

const directory = "build/database";

async function main(): Promise<void> {
	if (fs.existsSync(directory)) {
		console.log("Removing existing directory");
		fs.rmdirSync(directory);
	};

	console.log("Creating new directory");
	fs.mkdirSync(directory);

	console.log("Starting database server");
	child.execSync(`cd build && mongod --dbpath=database`);
}

main();
