const expess =  require('express');
const openai = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI with API key from environment variables
const openai = new openai.OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = expess();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests 
app.use(expess.json());
app.use(cors()); 

//Define the api endpoint for chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const botMessage = response.data.choices[0].message.content;
    res.json({ content: botMessage });
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
