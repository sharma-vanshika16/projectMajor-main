const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload');
const uploadedFilesRoute = require('./routes/uploadedFiles');
const bucketStatusRoute = require('./routes/bucketStatus');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://project-major-client.vercel.app' ,// Allow all origins or specify your client URL here
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/upload', uploadRoute);
app.use('/uploaded-files', uploadedFilesRoute);
app.use('/bucket-status', bucketStatusRoute);

// Root Route
app.get('/', (req, res) => {
  res.send('Cloud Deduplication Server is running');
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
