const express = require('express');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
    methods: ['POST', 'GET', 'OPTIONS'],
    origin: ['http://localhost:3000', 'https://json-viewer-lyart.vercel.app'], // Allow your frontend's origin
}));
app.use(bodyParser.json());

// Route to parse and validate JSON
app.post('/api/validate-json', (req, res) => {
    try {
        const jsonData = req.body;
        console.log(jsonData);
        // Validate your JSON data here if needed
        JSON.parse(JSON.stringify(jsonData)); // Example validation
        res.status(200).json({
            message: 'Valid JSON',
            data: jsonData,
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid JSON format', error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
