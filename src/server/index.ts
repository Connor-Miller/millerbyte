// src/server/index.ts
import express from 'express';
import { holoTacoAPIController } from './apiControllers/holoTacoAPIController'; // Import the controller

const app = express();

// Use the router from the holoTacoAPIController
app.use(holoTacoAPIController.router);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
