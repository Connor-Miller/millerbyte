import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

class PostgresService {
    private client: Client;

    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });
        console.log('PostgresService constructor called');
        console.log(this.client);
        this.connectToDatabase();
    }

    private async connectToDatabase() {
        try {
            await this.client.connect();
            console.log('Connected to PostgreSQL database');
        } catch (error) {
            console.error('Connection to PostgreSQL database failed', error);
        }
    }

    public async performQuery(query: string, values: any[]) {
        try {
            return this.client.query(query, values);
        } catch (error) {
            console.error('Error performing query', error);
        }
    }

}

export default PostgresService;
