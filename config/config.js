import dotenv from 'dotenv';

dotenv.config();

export const config = {
  clientId: process.env.CLIENT_ID,
  tenantId: process.env.TENANT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  dynamicsResourceUrl: process.env.DYNAMICS_RESOURCE_URL
};
