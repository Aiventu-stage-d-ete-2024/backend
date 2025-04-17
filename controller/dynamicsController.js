import axios from 'axios';
import qs from 'qs';

const {
    TENANT_ID,
    CLIENT_ID,
    CLIENT_SECRET,
    RESOURCE_URL,
} = process.env;

const OAUTH_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

export async function getAccessToken() {
    const tokenData = {
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: `${RESOURCE_URL}/.default`,
    };

    const response = await axios.post(OAUTH_URL, qs.stringify(tokenData), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.access_token;
}


export async function postToDynamics(req, res) {
    try {
        const { entity } = req.params;
        const payload = req.body;
        const accessToken = await getAccessToken();

        const url = `${RESOURCE_URL}/data/${entity}`;
        const response = await axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        res.status(201).json({
            message: 'Data sent to Dynamics 365 successfully',
            result: response.data,
        });
    } catch (error) {
        console.error('D365 POST error:', error.response?.data || error.message);
        res.status(500).json({ message: 'D365 POST failed', error: error.response?.data || error.message });
    }
}


export async function getFromDynamics(req, res) {
    try {
        const { entity } = req.params;
        const accessToken = await getAccessToken();

        const url = `${RESOURCE_URL}/data/${entity}`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('D365 GET error:', error.response?.data || error.message);
        res.status(500).json({ message: 'D365 GET failed', error: error.response?.data || error.message });
    }
}
