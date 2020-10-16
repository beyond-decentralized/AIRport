"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const landing_1 = require("@airport/landing");
const tower_1 = require("@airport/tower");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const travel_document_checkpoint_1 = require("@airport/travel-document-checkpoint");
const tokens_1 = require("../tokens");
class DatabaseManager {
    // constructor() {
    // }
    /*
        async ensureInitialized(
            terminalName: string = dbConst.DEFAULT_DB,
            timeout: number      = 5000
        ): Promise<void> {
            return new Promise((
                resolve,
                reject
            ) => {
                this.doEnsureInitialized(terminalName, resolve, reject, timeout)
            })
        }


        async initializeAll(
            defaultStoreType: StoreType
        ): Promise<void> {
            AIR_DB
            throw new Error(`Implement!`)
                    const db = TQ.db(dbConst.DEFAULT_DB);
                    if (!TQ.isInitialized(dbConst.DEFAULT_DB)) {
                        await TQ.addDataStore(defaultStoreType, dbConst.DEFAULT_DB);
                        await db.entityManager.goOnline();
                    }

                    const dataStores = await db.dao.dataStore.findAsGraph();
                    for (let dataStore of dataStores) {
                        if (!TQ.isInitialized(dataStore.name)) {
                            await TQ.init(dataStore.storeType, dataStore.name);
                            await TQ.db(dataStore.name).entityManager.goOnline();
                        }
                    }
    }
*/
    isInitialized() {
        return !!this.airDb;
    }
    async init(domainName, ...schemas) {
        const airDb = await di_1.container(this).get(air_control_1.AIR_DB);
        this.airDb = airDb;
        const connector = await di_1.container(this).get(ground_control_1.TRANS_CONNECTOR);
        await connector.init();
        const storeDriver = await di_1.container(this).get(ground_control_1.STORE_DRIVER);
        /*
                await storeDriver.dropTable('air__airport_code', 'SEQUENCES')
                await storeDriver.dropTable('air__airport_code', 'TERMINAL_RUNS')
                await storeDriver.dropTable('air__holding_pattern', 'ACTOR_APPLICATION')
                await storeDriver.dropTable('air__holding_pattern', 'Actor')
                await storeDriver.dropTable('air__holding_pattern', 'Application')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_ACTORS')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_APPLICATION')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_OPERATION_HISTORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY_NEW_VALUES')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY_OLD_VALUES')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_SCHEMAS')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_TRANSACTION_HISTORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS')
                await storeDriver.dropTable('air__holding_pattern', 'TRANSACTION_HISTORY')
                await storeDriver.dropTable('air__territory', 'APPLICATIONS')
                await storeDriver.dropTable('air__territory', 'APPLICATION_PACKAGES')
                await storeDriver.dropTable('air__territory', 'DOMAINS')
                await storeDriver.dropTable('air__territory', 'PACKAGED_UNITS')
                await storeDriver.dropTable('air__territory', 'PACKAGES')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMAS')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_COLUMNS')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_ENTITIES')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_PROPERTIES')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_PROPERTY_COLUMNS')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_REFERENCES')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_RELATIONS')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_RELATION_COLUMNS')
                await storeDriver.dropTable('air__traffic_pattern', 'SCHEMA_VERSIONS')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'Agt')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'TERMINAL_AGTS')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'Terminal')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'USER_TERMINAL')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'USER_TERMINAL_AGT')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'User')
                */
        /*
                await storeDriver.dropTable('votecube_com__ecclesia', 'CONTINENTS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'COUNTIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'COUNTRIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'FACTORS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'FACTOR_POSITIONS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'LABELS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLLS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_CONTINENTS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_COUNTIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_COUNTRIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_FACTOR_POSITIONS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_LABELS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_STATES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_TOWNS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_TYPES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POSITIONS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'STATES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'THEMES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'TOWNS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'VOTES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'VOTE_FACTORS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'VOTE_FACTOR_TYPES')
        */
        const server = await di_1.container(this).get(tower_1.TRANS_SERVER);
        server.tempActor = new holding_pattern_1.Actor();
        const hydrate = await storeDriver.doesTableExist('air__territory', 'PACKAGES');
        await this.installAirportSchema(hydrate);
        if (!hydrate) {
            await this.initTerminal(domainName);
        }
        if (schemas && schemas.length) {
            await this.initFeatureSchemas(schemas);
        }
        server.tempActor = null;
        /*
                throw new Error(`Implement!`)
                let dbFacade: IDatabaseFacade = this.databaseMap[terminalName]
                if (!dbFacade) {
                    dbFacade                       = new DatabaseFacade(terminalName)
                    this.databaseMap[terminalName] = dbFacade
                    this.dbNames.push(terminalName)
                    this.dbNameSet[terminalName] = true
                }
                if (this.isInitialized(terminalName)) {
                    throw new Error(
                    `Database '${terminalName}' is already initialized`)
                }
                this.allDbsEntityData.forEach(
                    entityData => {
                        let entityName = MetadataStore.getEntityName(entityData.entityConstructor)
                        if (!dbFacade.qEntityMap[entityName]) {
                            let qEntity                     = new entityData.qEntityConstructor(entityData.qEntityConstructor, entityData.entityConstructor, entityName)
                            dbFacade.qEntityMap[entityName] = qEntity
                        }
                    })
                await dbFacade.init(storeType)
                */
    }
    async initFeatureSchemas(schemas) {
        const schemaDao = await di_1.container(this).get(traffic_pattern_1.SCHEMA_DAO);
        const schemaNames = [];
        for (const jsonSchema of schemas) {
            const schemaName = ground_control_1.getSchemaName(jsonSchema);
            schemaNames.push(schemaName);
        }
        const existingSchemaMap = await schemaDao.findMapByNames(schemaNames);
        const schemasToInitialize = [];
        for (const jsonSchema of schemas) {
            const schemaName = ground_control_1.getSchemaName(jsonSchema);
            if (!existingSchemaMap.has(schemaName)) {
                schemasToInitialize.push(jsonSchema);
            }
        }
        if (schemasToInitialize.length) {
            const schemaInitializer = await di_1.container(this).get(landing_1.SCHEMA_INITIALIZER);
            await schemaInitializer.initialize(schemas);
        }
    }
    async initTerminal(domainName) {
        await tower_1.transactional(async () => {
            const user = new travel_document_checkpoint_1.User();
            user.uniqueId = domainName;
            const userDao = await di_1.container(this).get(travel_document_checkpoint_1.USER_DAO);
            await userDao.save(user);
            const terminal = new travel_document_checkpoint_1.Terminal();
            terminal.name = domainName;
            terminal.owner = user;
            const terminalDao = await di_1.container(this).get(travel_document_checkpoint_1.TERMINAL_DAO);
            await terminalDao.save(terminal);
            const actor = new holding_pattern_1.Actor();
            actor.user = user;
            actor.terminal = terminal;
            actor.randomId = Math.random();
            const actorDao = await di_1.container(this).get(holding_pattern_1.ACTOR_DAO);
            await actorDao.save(actor);
        });
    }
    async installAirportSchema(hydrate) {
        const blueprintFile = await Promise.resolve().then(() => require('@airport/blueprint'));
        const schemaInitializer = await di_1.container(this).get(landing_1.SCHEMA_INITIALIZER);
        if (hydrate) {
            await schemaInitializer.hydrate(blueprintFile.BLUEPRINT);
        }
        else {
            await schemaInitializer.initialize(blueprintFile.BLUEPRINT, false);
        }
    }
}
exports.DatabaseManager = DatabaseManager;
di_1.DI.set(tokens_1.DATABASE_MANAGER, DatabaseManager);
//# sourceMappingURL=DatabaseManager.js.map