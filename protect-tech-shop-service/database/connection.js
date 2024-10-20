const { Pool } = require("pg");
require('dotenv').config();


// A05 Fail - Security Misconfiguration - This code contains several security misconfigurations that can expose the application to risks.
// 1. Hardcoded Database Connection String
// The connection string is hardcoded and exposed in the code. This reveals sensitive credentials (e.g., username, password) 
// which could be used to access the database if someone gains access to the source code. In a production environment, this should 
// be stored securely in environment variables or a secrets management system.

const connectionString = 'postgresql://postgres.yhpzkjirmmmsnmezzrdh:4_UC!Bf4f2b7mXL@aws-0-us-west-1.pooler.supabase.com:6543/postgres'

let connectionParams;

const useLocalhost = process.env.USE_LOCALHOST === 'true';

if (useLocalhost) {
    console.log("Inside local");
    connectionParams = {
        user: "root",
        host: "localhost",
        password: "",
        database: "e_commerce",
        port: 5432
    };
} else {
    connectionParams = {
        connectionString, 
        ssl: {
            rejectUnauthorized: false
        }
    };
}

const pool = new Pool(connectionParams);

pool.connect((err) => {
    if (err) console.log(err.message);
    else console.log("DB Connection Done");
});

module.exports = pool;
