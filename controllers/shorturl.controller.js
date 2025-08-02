import {
  createShortUrl,
  getOriginalUrl,
  logClick,
  getStats,
} from '../services/shorturl.service.js';

export function postShortUrl(req, res, next) {
  try {
    console.log('📥 Request body:', req.body);

    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const result = createShortUrl(url); // Pass only the URL string, not whole body
    res.status(201).json({ message: 'Short URL created', data: result });
  } catch (err) {
    console.error('❌ Error in postShortUrl:', err.message);
    next(err);
  }
}

export function redirectShortcode(req, res, next) {
  try {
    const { shortcode } = req.params;

    const url = getOriginalUrl(shortcode);

    if (!url) {
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    logClick(shortcode, req); // Optional logging
    res.redirect(302, url);
  } catch (err) {
    console.error('❌ Error in redirectShortcode:', err.message);
    next(err);
  }
}

export function getShortUrlStats(req, res, next) {
  try {
    const { shortcode } = req.params;

    const stats = getStats(shortcode);

    if (!stats) {
      return res.status(404).json({ error: 'No stats found for shortcode' });
    }

    res.status(200).json({ message: 'Stats retrieved', data: stats });
  } catch (err) {
    console.error('❌ Error in getShortUrlStats:', err.message);
    next(err);
  }
}
