/* import axios from 'axios';
import qs from 'qs';

const {
    TENANT_ID,
    CLIENT_ID,
    CLIENT_SECRET,
    RESOURCE_URL,
    ENTITY_ASSET_OBJECT,
    ENTITY_ASSET_COUNTER
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

export async function getAssetsFromD365() {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${RESOURCE_URL}/data/${ENTITY_ASSET_OBJECT}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Accept': 'application/json',
        }
    });
    return response.data.value;
}

export async function createAssetInD365(assetData) {
    const accessToken = await getAccessToken();
    const response = await axios.post(`${RESOURCE_URL}/data/${ENTITY_ASSET_OBJECT}`, assetData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export async function updateAssetInD365(assetId, assetData) {
    const accessToken = await getAccessToken();
    const response = await axios.patch(`${RESOURCE_URL}/data/${ENTITY_ASSET_OBJECT}(${assetId})`, assetData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

export async function deleteAssetInD365(assetId) {
    const accessToken = await getAccessToken();
    const response = await axios.delete(`${RESOURCE_URL}/data/${ENTITY_ASSET_OBJECT}(${assetId})`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return response.data;
}

export async function getAssetCountersFromD365(assetId) {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${RESOURCE_URL}/data/${ENTITY_ASSET_COUNTER}?$filter=AssetID eq '${assetId}'`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Accept': 'application/json',
        }
    });
    return response.data.value;
} */