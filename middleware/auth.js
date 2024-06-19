import { ConfidentialClientApplication } from '@azure/msal-node';
import { config } from '../config/config.js';

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: config.clientId,
    authority: `https://login.microsoftonline.com/${config.tenantId}`,
    clientSecret: config.clientSecret
  }
});

export async function getToken(req, res, next) {
  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: [`${config.dynamicsResourceUrl}/.default`]
    });
    req.token = authResponse.accessToken;
    next();
  } catch (error) {
    res.status(500).send('Authentication failed');
  }
}
