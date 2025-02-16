import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import urlRoute from './routes/urlRoutes.js'

dotenv.config();
const app = express();


app.use(express.json());
app.use(cors({
  origin: 'https://shortifymylink.netlify.app',
  methods: ['GET', 'POST'],
  maxAge: 86400,
  preflightContinue: true,
}));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: 'shorturl',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

connectDB();

app.use('/', urlRoute);

app.get('/HealthCheck', (req, res) => {
  res.send('Working Fine ...😇');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});