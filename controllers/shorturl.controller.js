import { readData, writeData } from '../utils/fileHandler.js';
import { generateShortcode } from '../utils/generateCode.js';


export const createShortUrl = (req, res) => {
  const { url, shortcode, validity = 30 } = req.body;

  if (!url) return res.status(400).json({ message: "URL is required" });

  const data = readData();
  let newCode = shortcode || generateShortcode();


  if (data.find(entry => entry.shortcode === newCode)) {
    return res.status(409).json({ message: "Shortcode already exists" });
  }

  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + validity * 24 * 60 * 60 * 1000).toISOString();

  const newEntry = {
    url: url.startsWith("http") ? url : `https://${url}`,
    shortcode: newCode,
    createdAt,
    expiresAt
  };

  data.push(newEntry);
  writeData(data);

  res.status(201).json({
    message: "Short URL created",
    shortcode: newCode,
    shortUrl: `http://localhost:3000/${newCode}`,
    expiresAt
  });
};


export const getAllUrls = (req, res) => {
  const urls = readData();

  if (!Array.isArray(urls)) {
    return res.status(500).json({ message: "Invalid data format" });
  }

  res.json(urls);
};

export const redirectShortUrl = (req, res) => {
  const { shortcode } = req.params;
  const data = readData();

  const entry = data.find(e => e.shortcode === shortcode);
  if (!entry) return res.status(404).json({ message: "Shortcode not found" });

  const now = new Date();
  if (now > new Date(entry.expiresAt)) {
    return res.status(410).json({ message: "Shortcode expired" });
  }

  
  const redirectTo = entry.url.startsWith("http") ? entry.url : `https://${entry.url}`;
  res.redirect(redirectTo);
};
