import express from 'express';
import { createShortUrl, redirectShortUrl, getAllUrls } from '../controllers/shorturl.controller.js';

const shortrouter = express.Router();

shortrouter.post('/shorten', createShortUrl);
shortrouter.get('/urls', getAllUrls);
shortrouter.get('/:shortcode', redirectShortUrl);

export default shortrouter;
