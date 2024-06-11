import { fetchOrderRequests } from '../model/sharepointmodel.js';
import { createOrder } from '../model/dynamicsmodel.js';

export async function getOrders(req, res) {
    try {
        const orders = await fetchOrderRequests();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Internal Server Error');
    }
}

export async function postOrder(req, res) {
    try {
        const orderData = req.body;
        await createOrder(orderData);
        res.status(201).send('Order created');
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Internal Server Error');
    }
}
