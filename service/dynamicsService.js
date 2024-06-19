import axios from 'axios';
import { config } from '../config/config.js';

export async function getAssets(token) {
  const response = await axios.get(`${config.dynamicsResourceUrl}/data/FixedAssets`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.value;
}
