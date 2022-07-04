// import { startDb } from '@airport/postgres'
import pg from 'pg'
import { parse } from "pg-connection-string"
import { v4 as guidv4 } from 'uuid'
import { ScyllaDbServer } from './ScyllaDbServer'

const Pool = pg.Pool

export class ScyllaDbVespaServer
    extends ScyllaDbServer {

    pool: pg.Pool

    protected async doStartResources() {
        await super.doStartResources()
        await this.initVespa()
    }

    protected async initFramework() {
        // TODO: implement startDb in postgreSQL driver
        // await startDb('votecube', 'postgres://root@localhost:26257/votecube?sslmode=disable')
    }

    protected initVespa() {
        // TODO: implement Vespa Initialization
    }


    protected async shutdownAdditionalResources() {
        await this.shutdownCockroachDb()
        await this.shutdownVespa()
        process.exit(0)
    }

    protected async shutdownVespa() {
        // TODO: implement Vespa teardown
    }

    protected async shutdownCockroachDb() {
        await this.pool.end()
    }

}