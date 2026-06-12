const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const CLOUD_PAGE_2_URL = 'https://YOUR_CLOUDPAGE2_URL'; // 🔁 Replace this

// Journey Builder calls this when a contact hits this activity
app.post('/execute', async (req, res) => {
  try {
    const inArguments = req.body.inArguments[0];

    // Call Cloud Page 2 with all parameters
    await fetch(CLOUD_PAGE_2_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        emailAddress: inArguments.emailAddress || '',
        firstName: inArguments.firstName || '',
        // 🔁 Add more fields as needed
      })
    });

    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('Execute error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Required Journey Builder lifecycle endpoints
app.post('/publish',  (req, res) => res.status(200).json({}));
app.post('/validate', (req, res) => res.status(200).json({}));
app.post('/stop',     (req, res) => res.status(200).json({}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
