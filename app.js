import express from 'express';
import dotenv from 'dotenv';

import shortrouter from './routes/shorturl.routes.js';
import logrouter from './routes/logRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/', shortrouter);
app.use('/', logrouter);

app.get('/', (req, res) => {
  res.send('URL Shortener App is running');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
