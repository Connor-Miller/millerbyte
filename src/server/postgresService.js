import pkg from 'pg'; // Import the entire module as pkg
const { Client } = pkg; // Destructure Client from pkg
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

class PostgresService {
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

    async connectToDatabase() {
        try {
            await this.client.connect();
            console.log('Connected to PostgreSQL database');
        } catch (error) {
            console.error('Connection to PostgreSQL database failed', error);
            this.closeConnection();
        }
    }

    async performQuery(query, values) {
        try {
            const result = await this.client.query(query, values);
            this.closeConnection(); // Close connection after query execution
            return result;
        } catch (error) {
            console.error('Error performing query', error);
            this.closeConnection();
        }
    }

    closeConnection() {
        this.client.end(); // Close the database connection
        console.log('Database connection closed');
    }
}

export default PostgresService;
