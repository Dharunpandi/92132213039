import express from 'express';
import {
  postShortUrl,
  redirectShortcode,
  getShortUrlStats,
} from '../controllers/shorturl.controller.js';

const shortrouter = express.Router();

shortrouter.post('/shorturls', postShortUrl); // POST endpoint
shortrouter.get('/shorturls/:shortcode', getShortUrlStats); // stats
shortrouter.get('/:shortcode', redirectShortcode); // redirect

export default shortrouter;
