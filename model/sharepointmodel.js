import axios from 'axios';
import { getAccessToken } from '../middleware/auth.js';
import config from '../config/config.js';

export async function fetchOrderRequests() {
    const accessToken = await getAccessToken(['https://graph.microsoft.com/.default']);
    const response = await axios.get(`${config.sharePointSite}/_api/web/lists/getbytitle('OrderRequests')/items`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json;odata=verbose',
        },
    });
    return response.data.d.results;
}
