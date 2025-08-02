import fs from 'fs';
const filePath = './data.json';

export function readData() {
  try {
    if (!fs.existsSync(filePath)) return [];

    const raw = fs.readFileSync(filePath, 'utf-8').trim();
    if (!raw) return [];

    return JSON.parse(raw);
  } catch (err) {
    console.error("Read Error:", err);
    return [];
  }
}

export function writeData(data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Write Error:", err);
  }
}
