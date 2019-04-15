import * as express from "express";
import * as cors  from "cors";

const app = express();

app.use(cors({ credentials: true, origin: true }));

let factIndex = 0;

app.get("/", (request, response) => {
	const facts = [
		"There are over 500 million domestic cats in the world",
		"Cats and humans have been associated for nearly 10000 years",
		"Cats conserve energy by sleeping for an average of 13 to 14 hours a day",
		"On average cats live for around 12 to 15 years"
	];

	const fact = facts[factIndex];

	factIndex++;

	if (factIndex >= facts.length) {
		factIndex = 0;
	}

	response.send({
		time: new Date().toISOString(),
		fact
	});
});

app.listen(8080);