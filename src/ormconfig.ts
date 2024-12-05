import { DataSource } from 'typeorm';
import { dbconfig } from './db.config';

export default new DataSource({
    ...dbconfig,
    type: 'postgres',
    migrations: ['./src/migrations/*.ts'],
});