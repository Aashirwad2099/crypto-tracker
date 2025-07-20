import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { connect } from './config/database.js'; // Include `.js` if using ES modules

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connect();

import { fetchData } from './controller/Crypto.js';

import cryptoRoutes from './Routes/CryptoRoutes.js';

// Initial fetch
fetchData();

app.use('/api', cryptoRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
