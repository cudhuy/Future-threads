// Provided title, description

// What format / easiest to play

const fs = require('fs');
const { createClient, toWav } = require('@neuphonic/neuphonic-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const client = createClient({ apiKey: process.env.NEUPHONICS_API });
const outputDir = 'voiceFiles';

// Returns a description string based on the provided title
function descriptionFromTitle(title) {
	const testDescriptions = {
		meow: 'Cats!!!!',
		beep: 'BEEEEEEEEEEEEEEES!',
		ship: 'beep beep the ship cargo space? car no go space, car go road',
	};
	return testDescriptions[title];
}

// Generates speech audio (wav) from a text description using Neuphonic API
async function generateText(description) {
	const sse = await client.tts.sse({
		speed: 1.15,
		lang_code: 'en',
	});

	const res = await sse.send(description);

	// returning as a wav
	return toWav(res.audio);
}

// Gets the audio file path for a given title, generates and saves the audio if it doesn't exist
async function getAudioPath(title) {
	if (fs.existsSync(outputDir + `/${title}.wav`)) {
		// exists already
		console.log('title exists already for voice');
	} else {
		// generate file and save it for future use
		console.log('title doesnt exist for voice');
		const wav = await generateText(descriptionFromTitle(title));
		console.log('content is generated');

		fs.writeFileSync(outputDir + `/${title}.wav`, wav);
	}
	return path.join(__dirname, outputDir + `/${title}.wav`);
}

module.exports = getAudioPath;