import axios from 'axios';
import { getAccessToken } from '../middleware/auth.js';
import config from '../config/config.js';

export async function createOrder(orderData) {
    const accessToken = await getAccessToken([`${config.dynamicsUrl}/.default`]);
    await axios.post(`${config.dynamicsUrl}/api/data/v9.1/orders`, orderData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
}
