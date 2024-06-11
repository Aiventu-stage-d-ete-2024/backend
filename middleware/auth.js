import { ConfidentialClientApplication } from '@azure/msal-node';
import config from '../config/config.js';

const msalConfig = {
    auth: {
        clientId: config.clientId,
        authority: `https://login.microsoftonline.com/${config.tenantId}`,
        clientSecret: config.clientSecret,
    },
};

const cca = new ConfidentialClientApplication(msalConfig);

export async function getAccessToken(scopes) {
    const result = await cca.acquireTokenByClientCredential({
        scopes: scopes,
    });
    return result.accessToken;
}
