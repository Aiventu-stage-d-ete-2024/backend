import axios from 'axios';
import { getAccessToken } from '../middleware/auth.js';

export async function triggerFlow(flowUrl, data) {
    const accessToken = await getAccessToken(['https://graph.microsoft.com/.default']);
    await axios.post(flowUrl, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
}
