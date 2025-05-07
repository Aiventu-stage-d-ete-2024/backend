import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Server } from 'socket.io';
import http from 'http';

import connectToDatabase from './database.js';

import assetsRoute from './route/assetsRoute.js';
import maintenanceRequestsRoute from './route/maintenanceRequestsRoute.js';
import userRoute from './route/userRoute.js';
import counterRoute from './route/countersRoute.js';
import notificationsRoute from './route/notificationsRoute.js';


dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


app.set('io', io);

connectToDatabase();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get('/', (req, res) => {
  res.send('Welcome to Aiventu backend!');
});


app.use('/api/assets', assetsRoute);
app.use('/api/maintenanceRequests', maintenanceRequestsRoute);
app.use('/api/users', userRoute);
app.use('/api/counters', counterRoute);
app.use('/api/notifications', notificationsRoute);


io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});

export { io };

/* 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Server } from 'socket.io';

import connectToDatabase from './database.js';

import assetsRoute from './route/assetsRoute.js';
import maintenanceRequestsRoute from './route/maintenanceRequestsRoute.js';
import userRoute from './route/userRoute.js';
import counterRoute from './route/countersRoute.js';
import notificationsRoute from './route/notificationsRoute.js';

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
app.use('/api/notifications', notificationsRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {  
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
}); */