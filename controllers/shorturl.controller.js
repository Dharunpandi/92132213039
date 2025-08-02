import {
  createShortUrl,
  getOriginalUrl,
  logClick,
  getStats,
} from '../services/shorturl.service.js';

export function postShortUrl(req, res, next) {
  try {
    const result = createShortUrl(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export function redirectShortcode(req, res, next) {
  try {
    const { shortcode } = req.params;
    const url = getOriginalUrl(shortcode);
    logClick(shortcode, req);
    res.redirect(302, url);
  } catch (err) {
    next(err);
  }
}

export function getShortUrlStats(req, res, next) {
  try {
    const { shortcode } = req.params;
    const data = getStats(shortcode);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
