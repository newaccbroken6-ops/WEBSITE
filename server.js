const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Enable CORS for all routes
app.use(cors());
app.use(express.static('.'));

// Proxy endpoint for account information
app.get('/api/accinfo', async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }
    
    console.log(`Fetching account info for UID: ${uid}`);
    const response = await axios.get(`https://danger-info-alpha.vercel.app/accinfo?uid=${uid}&key=DANGERxINFO`);
    console.log(`Received response for UID: ${uid}`, response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching account info:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch account information' });
  }
});

// Proxy endpoint for region information
app.get('/api/region', async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }
    
    console.log(`Fetching region info for UID: ${uid}`);
    const response = await axios.get(`https://danger-info-alpha.vercel.app/region?uid=${uid}&key=DANGERxINFO`);
    console.log(`Received response for UID: ${uid}`, response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching region info:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch region information' });
  }
});

// Proxy endpoint for outfit image
app.get('/api/outfit-image', async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }
    
    const response = await axios.get(`https://danger-info-alpha.vercel.app/outfit-image?uid=${uid}&key=DANGER-OUTFIT`, {
      responseType: 'stream'
    });
    
    // Forward the image response
    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching outfit image:', error.message);
    res.status(500).json({ error: 'Failed to fetch outfit image' });
  }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});