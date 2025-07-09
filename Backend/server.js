const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const session = require('express-session');
const path = require('path');
const fs = require('fs').promises;
const getAudioPath = require('./voiceGen');

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Google Generative AI with API key from environment variables
const googleGenAI = new GoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY,
});

// Define the AI models to use
const geminiModel = googleGenAI.getGenerativeModel({
	model: 'gemini-1.5-flash',
}); // Google Gemini model name
const chatgptModel = 'gpt-3.5-turbo'; // OpenAI ChatGPT model name

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
// Session middleware
app.use(
	session({
		secret: 'your-secret-key', // Replace with a secure key for your app
		resave: false, // Avoid saving session if unmodified
		saveUninitialized: true, // Save session for new users
		cookie: {
			secure: false, // Set to `true` if using HTTPS
			maxAge: 1000 * 60 * 60, // Set session expiration (1 hour)
		},
	}),
);

// Data storage
let eventData = null;
let choiceData = null;
let gameManager = null;

// Loads timeline data from the JSON file asynchronously
const getEvents = async () => {
	try {
		const fileData = await fs.readFile(
			'../public/timeline_data/timeline_data.json',
			'utf8',
		);
		eventData = JSON.parse(fileData);
		console.log('Event data loaded successfully.');
	} catch (err) {
		console.error('Error loading event data:', err);
		return (eventData = null);
	}
};

const getChoices = async () => {
	try {
		const fileData = await fs.readFile(
			'../public/timeline_data/choices.json',
			'utf8',
		);
		choiceData = JSON.parse(fileData);
		console.log('Choice data loaded successfully.');
	} catch (err) {
		console.error('Error loading choice data:', err);
		return (choiceData = null);
	}
};

function addEventItem(event) {
	// TODO: Create a new event item with the provided data
}

function addChoiceCardItem(choice) {
	// TODO: Create a new choice card item with the provided data
}

// API Endpoints to handle chat requests
app.post('/api/filteredEvents', async (req, res) => {
	if (!eventData) {
		return res.status(500).json({ error: 'Event data not loaded' });
	}
	res.json({ events: eventData });
});

app.post('/api/chat', async (req, res) => {
	const { message, provider } = req.body;

	if (!message || typeof message !== 'string') {
		return res.status(400).json({ error: 'Invalid message format' });
	}

	try {
		let botMessage = '';
		if (provider === 'google') {
			const result = await geminiModel.generateContent([message]);
			botMessage = result.response.text();
		} else {
			const response = await openai.createChatCompletion({
				model: chatgptModel,
				messages: [{ role: 'user', content: message }],
			});
			botMessage = response.data.choices[0].message.content;
		}
		res.json({ content: botMessage });
	} catch (error) {
		console.error('Error calling AI API:', error.message);
		res.status(500).json({ error: 'Failed to process the request' });
	}
});

app.post('/api/incYear', async (req, res) => {
	const { selectedCard } = req.body;
	if (!req.session.gameManager) {
		return res.status(400).json({ error: 'Game manager not initialized' });
	}
	try {
		const result = req.session.gameManager.incrementYear(selectedCard);
		res.status(200).json({
			message: 'Year incremented',
			currentYear: result.currentYear,
			newEvents: result.newEvents,
			newCards: result.newCards,
		});
	} catch (error) {
		console.error('Error incrementing year:', error);
		res.status(500).json({ error: 'Failed to increment year' });
	}
});

app.post('/api/getGameState', async (req, res) => {
	if (!req.session.gameManager) {
		return res.status(400).json({ error: 'Game manager not initialized' });
	}
	const gameManager = req.session.gameManager;
	res.json({
		stats: gameManager.getStats(),
		currentYear: gameManager.currentYear,
		pastEvents: gameManager.pastEvents,
	});
});

app.post('/api/newGame', async (req, res) => {
	if (!eventData || !choiceData) {
		return res.status(500).json({ error: 'Event or choice data not loaded' });
	}
	req.session.gameManager = new GameManagerClass(eventData, choiceData);
	const gameManager = req.session.gameManager;
	res.status(200).json({
		message: 'New game started',
		stats: gameManager.getStats(),
		currentYear: gameManager.currentYear,
		pastEvents: gameManager.pastEvents,
	});
});

// Placeholder database query function (unused)
function execQuery(query) {
	connection.connect((error) => {
		if (error) {
			console.error('Error connecting to the database:', error);
			return;
		}
		console.log('Connected to the database');
	});

	// Run a database query
	connection.query(query, (error, results) => {
		if (error) {
			console.error('Error executing query:', error);
			connection.end();
			return;
		}
		connection.end();
		return results;
	});

	// Close the connection
	connection.end();
}

// Endpoint to handle voice generation requests
app.get('/api/voice/:title', async (req, res) => {
	const audioPath = await getAudioPath(req.params.title);
	res.sendFile(audioPath);
});

// Start the server
getEvents().then(() => {
	getChoices().then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
			if (eventData && choiceData) {
				gameManager = new GameManagerClass(eventData, choiceData);
			}
		});
	});
});