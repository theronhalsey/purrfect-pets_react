/**
 * Basic donfiguration for the Azure SQL database
 */

import * as dotenv from 'dotenv';
dotenv.config();

const server = process.env.NODE_AZURE_SQL_SERVER;
const database = process.env.NODE_AZURE_SQL_DATABASE;
const port = parseInt(process.env.NODE_AZURE_SQL_PORT);
const user = process.env.NODE_AZURE_SQL_USER;
const password = process.env.NODE_AZURE_SQL_PASSWORD;

export const config = {
    server,
    port,
    database,
    user,
    password,
    options: {
        encrypt: true
    }
};