import { AIR_DB, DB_FACADE, NonEntityFind, NonEntityFindOne, NonEntitySearch, NonEntitySearchOne } from '@airport/air-control';
import { container, DI } from '@airport/di';
export class AirportDatabase {
    // private databaseMap: { [databaseName: string]: IDatabaseFacade } = {}
    // private dbNames: string[]                                        = []
    // private dbNameSet: { [databaseName: string]: boolean }           = {}
    // private currentDbName = dbConst.DEFAULT_DB
    constructor() {
        this.schemas = [];
        this.qSchemas = [];
        this.QM = {};
        this.S = this.schemas;
        this.Q = this.qSchemas;
        this.find = new NonEntityFind();
        this.findOne = new NonEntityFindOne();
        this.search = new NonEntitySearch();
        this.searchOne = new NonEntitySearchOne();
    }
    /*
        registerDatabase(
            facade: IDatabaseFacade
        ) {
            if (!this.dbNameSet[facade.name]) {
                this.dbNames.push(facade.name)
            }
            this.databaseMap[facade.name] = facade
            this.dbNameSet[facade.name]   = true
        }

        async registerQSchemas(
            qSchemas: QSchema[]
        ) {
            for (const qSchema of qSchemas) {
                const schemaName    = getSchemaName(qSchema)
                this.QM[schemaName] = qSchema
            }
        }

        setCurrentDb(
            dbName: string = dbConst.DEFAULT_DB
        ): void {
            this.currentDbName = dbName
        }

        getDbNames(): string[] {
            return this.dbNames
        }

        getDbNameSet(): { [databaseName: string]: boolean } {
            return this.dbNameSet
        }

        get db(): IDatabaseFacade {
            let database = this.databaseMap[this.currentDbName]
            if (!database) {
                throw new Error(`Did not find database '${this.currentDbName}'`)
            }
            return database
        }
    */
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.addRepository(name, url, platform, platformConfig, distributionStrategy, context);
    }
    async insertColumnValues(rawInsertValues, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertColumnValues(rawInsertValues, context);
    }
    async insertValues(rawInsertValues, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertValues(rawInsertValues, context);
    }
    async insertColumnValuesGenerateIds(rawInsertValues, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertColumnValuesGenerateIds(rawInsertValues, context);
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertValuesGenerateIds(rawInsertValues, context);
    }
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    async deleteWhere(rawDelete, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.deleteWhere(rawDelete, context);
    }
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    async save(entity, context, operationName) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.save(entity, context);
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdateColumns, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.updateColumnsWhere(rawUpdateColumns, context);
    }
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateWhere(rawUpdate, context) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.updateWhere(rawUpdate, context);
    }
}
DI.set(AIR_DB, AirportDatabase);
export function injectAirportDatabase() {
    console.log('Injecting AirportDatabase');
}
//# sourceMappingURL=AirportDatabase.js.map