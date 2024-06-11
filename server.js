import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import orderRoutes from './route/orderroutes.js';
import flowRoutes from './route/flowroutes.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', orderRoutes);
app.use('/api', flowRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});