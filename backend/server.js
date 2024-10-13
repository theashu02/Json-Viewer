const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
    origin: 'https://json-viewer-lyart.vercel.app/', // Replace with your frontend URL
    methods: 'GET,POST', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  }));


// Route to parse and validate JSON
app.post('/api/validate-json', (req, res) => {
    try {
        const jsonData = req.body;
        console.log(jsonData)
        // Additional validation logic for clinical trial data could be added here
        res.status(200).json({
            message: 'Valid JSON',
            data: jsonData,
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid JSON format' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
