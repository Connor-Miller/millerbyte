// src/server/index.js
import express from 'express';
import cors from 'cors'; // Import the cors package
import { createHoloTacoAPIController } from './apiControllers/holoTacoAPIController.js';

const app = express();

// Use CORS middleware to allow all origins
app.use(cors());

app.use(express.json()); // Make sure to include this if you're handling JSON requests

// Use the router from the holoTacoAPIController
const holoTacoAPI = createHoloTacoAPIController();
app.use(holoTacoAPI.router);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
