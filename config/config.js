import dotenv from 'dotenv';

dotenv.config();

export default {
    tenantId: process.env.TENANT_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    sharePointSite: process.env.SHAREPOINT_SITE,
    dynamicsUrl: process.env.DYNAMICS_URL,
};
