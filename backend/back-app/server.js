const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // To allow requests from your frontend
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
