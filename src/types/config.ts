import { LoggerOptions } from "typeorm/logger/LoggerOptions";

export interface tDatabaseConfig {
    database: string,
    username: string,
    password: string,
    host: string,
    port: number,
    prefix?: string,
    logging: LoggerOptions
}

export interface tAutoload {
    interval_m: number
    amount: number
}

export interface tConfig {
    database: tDatabaseConfig,
    autoload: tAutoload
}

export interface tLoadKms {
    loadOnstart: boolean
    amount?: number,
    afterId?: number
}
