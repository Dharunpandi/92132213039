import { generateShortcode } from "../utils/generateCode.js";

const db = new Map();
const stats = new Map();

export function createShortUrl({ url, validity = 30, shortcode }) {
  if (!url) throw { status: 400, message: 'URL is required' };

  if (!shortcode) {
    do {
      shortcode = generateShortcode();
    } while (db.has(shortcode));
  } else if (db.has(shortcode)) {
    throw { status: 409, message: 'Shortcode already exists' };
  }

  const createdAt = new Date().toISOString();
  const expiry = new Date(Date.now() + validity * 60000).toISOString();

  db.set(shortcode, { url, shortcode, createdAt, expiry });
  stats.set(shortcode, []);

  return {
    shortLink: `http://localhost:3000/${shortcode}`,
    expiry,
  };
}

export function getOriginalUrl(shortcode) {
  const record = db.get(shortcode);
  if (!record) throw { status: 404, message: 'Shortcode not found' };

  const now = new Date().toISOString();
  if (now > record.expiry) throw { status: 410, message: 'Shortcode expired' };

  return record.url;
}

export function logClick(shortcode, req) {
  if (!stats.has(shortcode)) stats.set(shortcode, []);
  stats.get(shortcode).push({
    timestamp: new Date().toISOString(),
    referrer: req.get('Referrer') || 'N/A',
    ip: req.ip,
  });
}

export function getStats(shortcode) {
  const record = db.get(shortcode);
  if (!record) throw { status: 404, message: 'Shortcode not found' };

  const clickData = stats.get(shortcode) || [];

  return {
    url: record.url,
    shortcode: record.shortcode,
    createdAt: record.createdAt,
    expiry: record.expiry,
    clicks: clickData.length,
    clickData,
  };
}
