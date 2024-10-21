import { addNewBottle, getAllBottlesByEmail, getBottleById, updateBottle, deleteBottle } from '../holoTaco/holoTacoBottleQueries.js';
import { Router } from 'express';
import { addNewCollector, deleteCollector, getCollectorByEmail, updateCollector } from '../holoTaco/holoTacoCollectorQueries.js';
import { getAllPolishes, getPolishByName, addNewPolish, updatePolish, deletePolish } from '../holoTaco/holoTacoPolishQueries.js';  


export function createHoloTacoAPIController() {
    return new holoTacoAPIController();
}

/**
 * The controller for the holoTaco API
 */
class holoTacoAPIController {

    constructor() {
        this.router = Router(); // Initialize the router
        this.initializeRoutes(); // Set up routes
    }

    initializeRoutes() {
        this.router.get('/api/bottles', this.getAllBottlesByEmail);
        this.router.post('/api/bottles', this.addNewBottle);
        this.router.get('/api/bottles/:bottleId', this.getBottleById);
        this.router.put('/api/bottles', this.updateBottle);
        this.router.delete('/api/bottles/:bottleId', this.deleteBottle);

        this.router.post('/api/collectors', this.addNewCollector);
        this.router.get('/api/collectors', this.getCollectorByEmail);
        this.router.put('/api/collectors', this.updateCollector);
        this.router.delete('/api/collectors', this.deleteCollector);

        this.router.get('/api/polishes', this.getAllPolishes);
        this.router.get('/api/polishes/:polishName', this.getPolishByName);
        this.router.post('/api/polishes', this.addNewPolish);
        this.router.put('/api/polishes', this.updatePolish);
        this.router.delete('/api/polishes/:polishName', this.deletePolish);
    }

    addNewBottle = async (req, res) => {
        const bottle = req.body; // Get bottle data from request body
        try {
            const result = await addNewBottle(bottle);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding new bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getAllBottlesByEmail = async (req, res) => {
        const email = req.query.email; // Get email from query parameters
        try {
            const result = await getAllBottlesByEmail(email);
            res.json(result?.rows);
        } catch (error) {
            console.error('Error fetching bottles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getBottleById = async (req, res) => {
        const bottleId = req.params.bottleId; // Get bottleId from request parameters
        try {
            const result = await getBottleById(bottleId);
            res.json(result?.rows[0]);
        } catch (error) {
            console.error('Error fetching bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    updateBottle = async (req, res) => {
        const bottle = req.body; // Get bottle data from request body
        try {
            const result = await updateBottle(bottle);
            res.json(result);
        } catch (error) {
            console.error('Error updating bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    deleteBottle = async (req, res) => {
        const bottleId = req.params.bottleId; // Get bottleId from request parameters
        try {
            const result = await deleteBottle(bottleId);
            res.json(result);
        } catch (error) {
            console.error('Error deleting bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    addNewCollector = async (req, res) => {
        const collector = req.body; // Get collector data from request body
        try {
            const result = await addNewCollector(collector);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding new collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getCollectorByEmail = async (req, res) => {
        const email = req.query.email; // Get email from query parameters
        try {
            const result = await getCollectorByEmail(email);
            res.json(result?.rows[0]);
        } catch (error) {
            console.error('Error fetching collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    updateCollector = async (req, res) => {
        const collector = req.body; // Get collector data from request body
        try {
            const result = await updateCollector(collector);
            res.json(result);
        } catch (error) {
            console.error('Error updating collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    deleteCollector = async (req, res) => {
        const email = req.query.email; // Get email from query parameters
        try {
            const result = await deleteCollector(email);
            res.json(result);
        } catch (error) {
            console.error('Error deleting collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    getAllPolishes = async (req, res) => {
        try {
            const result = await getAllPolishes();
            res.json(result?.rows);
        } catch (error) {
            console.error('Error fetching polishes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    getPolishByName = async (req, res) => {
        const polishName = req.query.polishName; // Get polishName from query parameters
        try {
            const result = await getPolishByName(polishName);
            res.json(result?.rows[0]);
        } catch (error) {
            console.error('Error fetching polish:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    addNewPolish = async (req, res) => {
        const polish = req.body; // Get polish data from request body
        try {
            const result = await addNewPolish(polish);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding new polish:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    updatePolish = async (req, res) => {
        const polish = req.body; // Get polish data from request body
        try {
            const result = await updatePolish(polish);
            res.json(result);
        } catch (error) {
            console.error('Error updating polish:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    deletePolish = async (req, res) => {
        const polishName = req.query.polishName; // Get polishName from query parameters
        try {
            const result = await deletePolish(polishName);
            res.json(result);
        } catch (error) {
            console.error('Error deleting polish:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

// Export an instance of the controller
export default holoTacoAPIController;
