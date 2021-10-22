import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { DATABASE_MANAGER } from '@airport/terminal';
import pg from 'pg'
import { parse } from "pg-connection-string"
import { v4 as uuidv4 } from 'uuid'

const Pool = pg.Pool

export * from './DDLManager'
export * from './PostgreSqlDriver'
export * from './PostgreSqlSchemaBuilder'
export * from './SequenceDao'

export async function startDb(
    domainName: string,
) {
    // TODO: make connection secure when needed
    // Number of cores will be 3*3 (or eventually 3*5) but to allow 
    // for scaling of write services
    // only 3 core per Node.js process is allocated
    let numberOfCrdbCores = 3

    // Best practice - 4 connections per core
    pg.defaults.poolSize = numberOfCrdbCores * 4

    let connectionString = "postgres://root@localhost:26257/votecube?sslmode=disable"
    // Expand $env:appdata environment variable in Windows connection string
    if (connectionString.includes("env:appdata")) {
        connectionString = await connectionString.replace(
            "$env:appdata",
            process.env.APPDATA
        );
    }
    // Expand $HOME environment variable in UNIX connection string
    else if (connectionString.includes("HOME")) {
        connectionString = await connectionString.replace(
            "$HOME",
            process.env.HOME
        );
    }
    var config = parse(connectionString);
    config.port = '26257';
    config.database = "votecube";
    this.pool = new Pool(config as any);
    
    await DI.db().get(AIRPORT_DATABASE);
    const dbManager = await DI.db().get(DATABASE_MANAGER);
    await dbManager.initWithDb(domainName, {});
}

export async function closeDb() {

}
