import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LOG_URL = 'http://20.244.56.144/evaluation-service/logs';
const token = process.env.ACCESS_TOKEN;

if (!token) {
  console.error('ACCESS_TOKEN not found in environment variables.');
}

export async function Log(stack, level, pkg, message) {
  try {
    const res = await axios.post(
      LOG_URL,
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Log sent:', res.data);
    return res.data;
  } catch (err) {
    const errorMessage = err.response?.data || err.message;
    console.error('Failed to send log:', errorMessage);
    return { status: 'Failed to send log', error: errorMessage };
  }
}

export default Log;
