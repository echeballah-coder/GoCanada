const express = require('express');
const path = require('path');
const config = require('./config/config');
const routes = require('./routes');

const app = express();

// Middleware for parsing JSON and form data (prepared for future use)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Serve static files from frontend/src to allow direct linking (e.g., /src/css/global.css)
// This is necessary because we are not using a bundler yet.
app.use('/src', express.static(path.join(__dirname, '../frontend/src')));

// API Routes placeholder
app.use('/api', routes);

// Fallback for SPA (if we move to client-side routing later, for now just basic static serving)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
// });

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    console.log(`Visit http://localhost:${config.PORT}`);
});
