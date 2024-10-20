import { TacoBottle, TacoCollector, TacoPolish } from '../../utils/holoTacoTypes';
import { addNewBottle, getAllBottlesByEmail, getBottleById, updateBottle, deleteBottle } from '../holoTaco/holoTacoBottleQueries';
import { Request, Response, Router } from 'express';
import { addNewCollector, deleteCollector, getCollectorByEmail, updateCollector } from '../holoTaco/holoTacoCollectorQueries';
import { getAllPolishes, getPolishByName, addNewPolish, updatePolish, deletePolish } from '../holoTaco/holoTacoPolishQueries';

class HoloTacoAPIController {
    public router: Router;

    constructor() {
        this.router = Router(); // Initialize the router
        this.initializeRoutes(); // Set up routes
    }

    private initializeRoutes() {
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

    public addNewBottle = async (req: Request, res: Response) => {
        const bottle: TacoBottle = req.body; // Get bottle data from request body
        try {
            const result = await addNewBottle(bottle);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding new bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public getAllBottlesByEmail = async (req: Request, res: Response) => {
        const email = req.query.email as string; // Get email from query parameters
        try {
            const result = await getAllBottlesByEmail(email);
            res.json(result?.rows);
        } catch (error) {
            console.error('Error fetching bottles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public getBottleById = async (req: Request, res: Response) => {
        const bottleId = req.params.bottleId; // Get bottleId from request parameters
        try {
            const result = await getBottleById(bottleId);
            res.json(result?.rows[0]);
        } catch (error) {
            console.error('Error fetching bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public updateBottle = async (req: Request, res: Response) => {
        const bottle: TacoBottle = req.body; // Get bottle data from request body
        try {
            const result = await updateBottle(bottle);
            res.json(result);
        } catch (error) {
            console.error('Error updating bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public deleteBottle = async (req: Request, res: Response) => {
        const bottleId = req.params.bottleId; // Get bottleId from request parameters
        try {
            const result = await deleteBottle(bottleId);
            res.json(result);
        } catch (error) {
            console.error('Error deleting bottle:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public addNewCollector = async (req: Request, res: Response) => {
        const collector: TacoCollector = req.body; // Get collector data from request body
        try {
            const result = await addNewCollector(collector);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding new collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public getCollectorByEmail = async (req: Request, res: Response) => {
        const email = req.query.email as string; // Get email from query parameters
        try {
            const result = await getCollectorByEmail(email);
            res.json(result?.rows[0]);
        } catch (error) {
            console.error('Error fetching collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public updateCollector = async (req: Request, res: Response) => {
        const collector: TacoCollector = req.body; // Get collector data from request body
        try {
            const result = await updateCollector(collector);
            res.json(result);
        } catch (error) {
            console.error('Error updating collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public deleteCollector = async (req: Request, res: Response) => {
        const email = req.query.email as string; // Get email from query parameters
        try {
            const result = await deleteCollector(email);
            res.json(result);
        } catch (error) {
            console.error('Error deleting collector:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    public getAllPolishes = async (req: Request, res: Response) => {
        try {
            const result = await getAllPolishes();
            res.json(result?.rows);
        } catch (error) {
            console.error('Error fetching polishes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public getPolishByName = async (req: Request, res: Response) => {
        const polishName = req.query.polishName as string; // Get polishName from query parameters
        try {
            const result = await getPolishByName(polishName);
            res.json(result?.rows[0]);
        } catch (error) {
            console.error('Error fetching polish:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public addNewPolish = async (req: Request, res: Response) => {
        const polish: TacoPolish = req.body; // Get polish data from request body
        try {
            const result = await addNewPolish(polish);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding new polish:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public updatePolish = async (req: Request, res: Response) => {
        const polish: TacoPolish = req.body; // Get polish data from request body
        try {
            const result = await updatePolish(polish);
            res.json(result);
        } catch (error) {
            console.error('Error updating polish:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public deletePolish = async (req: Request, res: Response) => {
        const polishName = req.query.polishName as string; // Get polishName from query parameters
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
export const holoTacoAPIController = new HoloTacoAPIController();
