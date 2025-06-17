const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

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

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
