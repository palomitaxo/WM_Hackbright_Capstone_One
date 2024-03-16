const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(__dirname));

app.get('/api/saveFormData', (req, res) => {
  const receivedData = req.body;
  console.log('Received form data:', receivedData);
  res.json({ message: 'Form data saved successfully!' });
});

app.post('/api/savePassword', (req, res) => {
  const receivedData = req.body;
  console.log('Received password data:', receivedData);
  res.json({ message: 'Password saved successfully!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});