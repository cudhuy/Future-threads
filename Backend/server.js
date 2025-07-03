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

let eventData = null;
let gameManager = null;

// Loads timeline data from the JSON file asynchronously
const getJson = async () => {
	try {
		const fileData = await fs.readFile(
			'../public/timeline_data/timeline_data.json',
			'utf8',
		);
		eventData = JSON.parse(fileData);
		console.log('Timeline data loaded successfully.');
	} catch (err) {
		console.error('Error loading timeline data:', err);
		return null;
	}
};

function addEventItem(event) {
	// Create a new event item with the provided data
}

function addChoiceCardItem(choice) {
	// Create a new choice card item with the provided data
}

app.post('/api/filteredEvents', async (req, res) => {
	console.log(eventData);
});

// Endpoint to handle chat requests
app.post('/api/chat', async (req, res) => {
	const { message, provider } = req.body;

	if (!message || typeof message !== 'string') {
		return res.status(400).json({ error: 'Invalid message format' });
	}

	try {
		let botMessage = '';

		if (provider === 'google') {
			const result = await geminiModel.generateContent([message]);
			console.log(result.response.text());
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

// Set up session middleware
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

// Sample route to set user session
app.post('/login', (req, res) => {
	const { email, password } = req.body;

	// Dummy authentication logic (replace with real logic)
	if (email === 'user@example.com' && password === 'password123') {
		// Store user info in session
		req.session.user = {
			email: email,
			loggedIn: true,
		};
		return res
			.status(200)
			.json({ message: 'Login successful', user: req.session.user });
	}

	return res.status(401).json({ message: 'Invalid credentials' });
});

// Sample route to check if the user is logged in
app.get('/profile', (req, res) => {
	if (req.session.user && req.session.user.loggedIn) {
		return res
			.status(200)
			.json({ message: 'User is logged in', user: req.session.user });
	}

	return res.status(401).json({ message: 'You need to log in first' });
});

// Sample route to log out
app.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ message: 'Failed to log out' });
		}

		res.status(200).json({ message: 'Logged out successfully' });
	});
});

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

// Start the server
getJson().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
	gameManager = new GameManagerClass(eventData);
});

// Endpoint to handle voice generation requests
app.get('/api/voice/:title', async (req, res) => {
	const audioPath = await getAudioPath(req.params.title);
	res.sendFile(audioPath);
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
