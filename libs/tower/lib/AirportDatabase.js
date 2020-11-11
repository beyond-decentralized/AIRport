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
    async addRepository(name, url, platform, platformConfig, distributionStrategy, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.addRepository(name, url, platform, platformConfig, distributionStrategy, ctx);
    }
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created (1 or 0)
     */
    async create(entity, ctx, operationName) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.create(entity, ctx, operationName);
    }
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created
     */
    async bulkCreate(entities, checkIfProcessed, // defaults to true
    ctx, operationName, ensureGeneratedValues // for internal use only, needed at initial schema
    // creation
    ) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.bulkCreate(entities, ctx, checkIfProcessed, operationName, ensureGeneratedValues);
    }
    async insertColumnValues(rawInsertValues, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertColumnValues(rawInsertValues, ctx);
    }
    async insertValues(rawInsertValues, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertValues(rawInsertValues, ctx);
    }
    async insertColumnValuesGenerateIds(rawInsertValues, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertColumnValuesGenerateIds(rawInsertValues, ctx);
    }
    async insertValuesGenerateIds(rawInsertValues, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.insertValuesGenerateIds(rawInsertValues, ctx);
    }
    /**
     * Deletes an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records deleted (1 or 0)
     */
    async delete(entity, ctx, operationName) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.delete(entity, ctx);
    }
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    async deleteWhere(rawDelete, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.deleteWhere(rawDelete, ctx);
    }
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    async save(entity, ctx, operationName) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.save(entity, ctx);
    }
    /**
     * Updates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records updated (1 or 0)
     */
    async update(entity, ctx, operationName) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.update(entity, ctx);
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdateColumns, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.updateColumnsWhere(rawUpdateColumns, ctx);
    }
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateWhere(rawUpdate, ctx) {
        const dbFacade = await container(this)
            .get(DB_FACADE);
        return await dbFacade.updateWhere(rawUpdate, ctx);
    }
}
DI.set(AIR_DB, AirportDatabase);
export function injectAirportDatabase() {
    console.log('Injecting AirportDatabase');
}
//# sourceMappingURL=AirportDatabase.js.map