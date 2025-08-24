// Import necessary packages
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();
const port = 3000;

// Middleware setup
// Use express.json() to parse incoming JSON data from requests
app.use(express.json());

// Use cors() to allow cross-origin requests from your frontend domain
// In a real-world scenario, you can restrict this to only your frontend's domain for security
app.use(cors());

// A simple array acting as a temporary "database" to store messages in memory
const messages = [];

// Define a POST endpoint to receive new messages from the sender.html
app.post('/send', (req, res) => {
    // Extract the 'message' property from the request body
    const { message } = req.body;

    // Check if the message is not empty or null
    if (message) {
        // Add the new message to our messages array
        messages.push({ message });
        console.log('New message received:', message);
        // Send a success response back to the frontend
        res.status(200).send({ status: 'Success', message: 'Message received and stored.' });
    } else {
        // Send an error response if the message is empty
        res.status(400).send({ status: 'Error', message: 'Message cannot be empty.' });
    }
});

// Define a GET endpoint to send all stored messages to the receiver.html
app.get('/messages', (req, res) => {
    // Send the entire messages array as a JSON response
    res.status(200).json(messages);
});

// Start the server and make it listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('Open your browser and navigate to sender.html to send messages.');
});