import { tConfig } from "./types/config";
import { createCipher } from "crypto";

let tConfig: tConfig = {
    database: {
        database: 'dev_ceve_kb',
        username: 'dev_ceve_kb',
        password: 'm5948qv1f0d18s5xs16l',
        host: '10.8.32.195',
        port: 5432,
        logging: ["error", "schema", "warn", "info", "log"]
    },
    loadKms:{
    }
}

//** load database config from env */
if (process.env.DB_HOST && (process.env.DB_HOST.length > 0)) {
    tConfig.database.host = process.env.DB_HOST;
    console.log(`read DB_HOST from env`);
}

if (process.env.DB_PORT && (process.env.DB_PORT.length > 0)) {
    try {
        let port = parseInt(process.env.DB_PORT);
        if (port > 0) {
            tConfig.database.port = port
            console.log(`read DB_PORT from env`);
        }
    } catch (e) { }
}

if (process.env.DB_DATABASE && (process.env.DB_DATABASE.length > 0)) {
    tConfig.database.database = process.env.DB_DATABASE;
    console.log(`read DB_DATABASE from env`);
}

if (process.env.DB_USERNAME && (process.env.DB_USERNAME.length > 0)) {
    tConfig.database.username = process.env.DB_USERNAME;
    console.log(`read DB_USERNAME from env`);
}

if (process.env.DB_PASSWORD && (process.env.DB_PASSWORD.length > 0)) {
    tConfig.database.password = process.env.DB_PASSWORD;
    console.log(`read DB_PASSWORD from env`);
}

if (process.env.LOADKMS_AMOUNT && (process.env.LOADKMS_AMOUNT.length > 0)) {
    try {
        let i = parseInt(process.env.LOADKMS_AMOUNT);
        tConfig.loadKms.amount = i;
        console.log(`read LOADKMS_AMOUNT [${tConfig.loadKms.amount}] from env`);
    }catch(e){}
}

if (process.env.LOADKMS_AFTERID && (process.env.LOADKMS_AFTERID.length > 0)) {
    try {
        let i = parseInt(process.env.LOADKMS_AFTERID);
        tConfig.loadKms.afterId = i;
        console.log(`read LOADKMS_AFTERID [${tConfig.loadKms.afterId}] from env`);
    }catch(e){}
}

export let config = tConfig