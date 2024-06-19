import { getAssets } from '../service/dynamicsService.js';

export async function listAssets(req, res) {
  try {
    const assets = await getAssets(req.token);
    res.json(assets);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
