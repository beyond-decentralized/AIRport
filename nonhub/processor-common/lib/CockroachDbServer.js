import { BasicServer } from '@airport/nonhub-types';
import { startDb } from '@airport/postgres';
import pg from 'pg';
import { parse } from "pg-connection-string";
const Pool = pg.Pool;
export class CockroachDbServer extends BasicServer {
    async doStartResources() {
        // TODO: make connection secure when needed
        // Number of cores will be 3*3 (or eventually 3*5) but to allow 
        // for scaling of write services
        // only 3 core per Node.js process is allocated
        let numberOfCrdbCores = 3;
        // Best practice - 4 connections per core
        pg.defaults.poolSize = numberOfCrdbCores * 4;
        let connectionString = "postgres://root@localhost:26257/votecube?sslmode=disable";
        // Expand $env:appdata environment variable in Windows connection string
        if (connectionString.includes("env:appdata")) {
            connectionString = await connectionString.replace("$env:appdata", process.env.APPDATA);
        }
        // Expand $HOME environment variable in UNIX connection string
        else if (connectionString.includes("HOME")) {
            connectionString = await connectionString.replace("$HOME", process.env.HOME);
        }
        var config = parse(connectionString);
        config.port = '26257';
        config.database = "votecube";
        this.pool = new Pool(config);
        // TODO: implement startDb in postgreSQL driver
        await startDb('votecube', 'postgres://root@localhost:26257/votecube?sslmode=disable');
    }
    async shutdownResources() {
        await this.pool.end();
        await super.shutdownResources();
    }
}
//# sourceMappingURL=CockroachDbServer.js.map