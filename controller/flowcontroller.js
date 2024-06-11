import { triggerFlow } from '../middleware/powerautomate.js';

export async function postTriggerFlow(req, res) {
    try {
        const { flowUrl, data } = req.body;
        await triggerFlow(flowUrl, data);
        res.status(200).send('Flow triggered');
    } catch (error) {
        console.error('Error triggering flow:', error);
        res.status(500).send('Internal Server Error');
    }
}
