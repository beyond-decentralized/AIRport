import { startDb } from '@airport/postgres';
import pg from 'pg';
import { ScyllaDbServer } from '.';
const Pool = pg.Pool;
export class ScyllaDbVespaServer extends ScyllaDbServer {
    async doStartResources() {
        await super.doStartResources();
        await this.initVespa();
    }
    async initFramework() {
        // TODO: implement startDb in postgreSQL driver
        await startDb('votecube', 'postgres://root@localhost:26257/votecube?sslmode=disable');
    }
    initVespa() {
        // TODO: implement Vespa Initialization
    }
    async shutdownAdditionalResources() {
        await this.shutdownCockroachDb();
        await this.shutdownVespa();
        process.exit(0);
    }
    async shutdownVespa() {
        // TODO: implement Vespa teardown
    }
    async shutdownCockroachDb() {
        await this.pool.end();
    }
}
//# sourceMappingURL=ScyllaDbVespaServer.js.map