import express from 'express';
import { Log } from '../middleware/logger.js';

const logrouter = express.Router();

logrouter.post('/log-error', async (req, res) => {
  const { stack, level, pkg, message } = req.body;

  if (!stack || !level || !pkg || !message) {
    return res.status(400).json({ error: 'All fields are required: stack, level, pkg, message' });
  }

  const result = await Log(stack, level, pkg, message);

  if (result.error) {
    return res.status(500).json({ status: 'Failed to send log', error: result.error });
  }

  res.status(200).json({ status: 'Log sent successfully!' });
});

export default logrouter;
