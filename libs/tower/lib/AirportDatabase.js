"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
class AirportDatabase {
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
        this.find = new air_control_1.NonEntityFind();
        this.findOne = new air_control_1.NonEntityFindOne();
        this.search = new air_control_1.NonEntitySearch();
        this.searchOne = new air_control_1.NonEntitySearchOne();
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
                throw `Did not find database '${this.currentDbName}'`
            }
            return database
        }
    */
    addRepository(name, url, platform, platformConfig, distributionStrategy) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.addRepository(name, url, platform, platformConfig, distributionStrategy));
    }
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created (1 or 0)
     */
    create(dbEntity, entity) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.create(dbEntity, entity));
    }
    /**
     * Creates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records created
     */
    bulkCreate(dbEntity, entities, checkIfProcessed, // defaults to true
    cascade, // defaults to false
    ensureGeneratedValues // for internal use only, needed at initial schema
    // creation
    ) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.bulkCreate(dbEntity, entities, checkIfProcessed, cascade, ensureGeneratedValues));
    }
    insertColumnValues(dbEntity, rawInsertValues) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.insertColumnValues(dbEntity, rawInsertValues));
    }
    insertValues(dbEntity, rawInsertValues) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.insertValues(dbEntity, rawInsertValues));
    }
    insertColumnValuesGenerateIds(dbEntity, rawInsertValues) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.insertColumnValuesGenerateIds(dbEntity, rawInsertValues));
    }
    insertValuesGenerateIds(dbEntity, rawInsertValues) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.insertValuesGenerateIds(dbEntity, rawInsertValues));
    }
    /**
     * Deletes an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records deleted (1 or 0)
     */
    delete(dbEntity, entity) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.delete(dbEntity, entity));
    }
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    deleteWhere(dbEntity, rawDelete) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.deleteWhere(dbEntity, rawDelete));
    }
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    save(dbEntity, entity) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.save(dbEntity, entity));
    }
    /**
     * Updates an entity - internal API.  Use the API provided by the
     * IEntityDatabaseFacade.
     *
     * @return Number of records updated (1 or 0)
     */
    update(dbEntity, entity) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.update(dbEntity, entity));
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateColumnsWhere(dbEntity, rawUpdateColumns) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.updateColumnsWhere(dbEntity, rawUpdateColumns));
    }
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    updateWhere(dbEntity, rawUpdate) {
        return di_1.DI.get(air_control_1.DB_FACADE).then(dbFacade => dbFacade.updateWhere(dbEntity, rawUpdate));
    }
}
exports.AirportDatabase = AirportDatabase;
di_1.DI.set(air_control_1.AIR_DB, AirportDatabase);
//# sourceMappingURL=AirportDatabase.js.map