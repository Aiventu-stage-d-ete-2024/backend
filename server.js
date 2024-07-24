import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectToDatabase from './database.js';
import assetsRoute from './route/assetsRoute.js';
import maintenanceRequestsRoute from './route/maintenanceRequestsRoute.js';
import userRoute from './route/userRoute.js';
import counterRoute from './route/countersRoute.js';

dotenv.config();
const app = express();
connectToDatabase();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to Aiventu backend!');
});
app.use('/api/assets', assetsRoute);
app.use('/api/maintenanceRequests', maintenanceRequestsRoute);
app.use('/api/users',userRoute);
app.use('/api/counters',counterRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});