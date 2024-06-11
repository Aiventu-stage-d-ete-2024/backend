import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

async function connectToDatabase() {
  console.log('Connected to the database successfully!');
}

function notFoundError(req, res, next) {
  res.status(404).json({ message: 'Route not found' });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'An error occurred', error: err.message });
}

/*app.get('/', (req, res) => {
  res.send('Hello, world!');
});*/

app.use(notFoundError);
app.use(errorHandler);

connectToDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  }).catch(err => {
    console.error('Failed to connect to the database:', err);
  });
