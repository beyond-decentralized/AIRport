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
    async addRepository(name, url, platform, platformConfig, distributionStrategy) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.addRepository(name, url, platform, platformConfig, distributionStrategy);
    }
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created (1 or 0)
     */
    async create(dbEntity, entity) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.create(dbEntity, entity);
    }
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created
     */
    async bulkCreate(dbEntity, entities, checkIfProcessed, // defaults to true
    cascadeOverwrite, // defaults to false
    ensureGeneratedValues // for internal use only, needed at initial schema
    // creation
    ) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.bulkCreate(dbEntity, entities, checkIfProcessed, cascadeOverwrite, ensureGeneratedValues);
    }
    async insertColumnValues(dbEntity, rawInsertValues) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.insertColumnValues(dbEntity, rawInsertValues);
    }
    async insertValues(dbEntity, rawInsertValues) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.insertValues(dbEntity, rawInsertValues);
    }
    async insertColumnValuesGenerateIds(dbEntity, rawInsertValues) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.insertColumnValuesGenerateIds(dbEntity, rawInsertValues);
    }
    async insertValuesGenerateIds(dbEntity, rawInsertValues) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.insertValuesGenerateIds(dbEntity, rawInsertValues);
    }
    /**
     * Deletes an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records deleted (1 or 0)
     */
    async delete(dbEntity, entity) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.delete(dbEntity, entity);
    }
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    async deleteWhere(dbEntity, rawDelete) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.deleteWhere(dbEntity, rawDelete);
    }
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    async save(dbEntity, entity) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.save(dbEntity, entity);
    }
    /**
     * Updates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records updated (1 or 0)
     */
    async update(dbEntity, entity) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.update(dbEntity, entity);
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(dbEntity, rawUpdateColumns) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.updateColumnsWhere(dbEntity, rawUpdateColumns);
    }
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateWhere(dbEntity, rawUpdate) {
        const dbFacade = await container(this).get(DB_FACADE);
        return await dbFacade.updateWhere(dbEntity, rawUpdate);
    }
}
DI.set(AIR_DB, AirportDatabase);
//# sourceMappingURL=AirportDatabase.js.map