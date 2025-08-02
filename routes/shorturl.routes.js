import express from 'express';
import {
  postShortUrl,
  redirectShortcode,
  getShortUrlStats,
} from '../controllers/shorturl.controller.js';

const shortrouter = express.Router();

shortrouter.post('/shorturls', postShortUrl);       
shortrouter.get('/shorturls/:shortcode', getShortUrlStats); 
shortrouter.get('/:shortcode', redirectShortcode);    

export default shortrouter;
