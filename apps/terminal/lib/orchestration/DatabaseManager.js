"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const fuel_hydrant_system_1 = require("@airport/fuel-hydrant-system");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const landing_1 = require("@airport/landing");
const takeoff_1 = require("@airport/takeoff");
const tower_1 = require("@airport/tower");
const travel_document_checkpoint_1 = require("@airport/travel-document-checkpoint");
const diTokens_1 = require("../diTokens");
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
            throw `Implement!`
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
    async init(domainName, storeType) {
        await fuel_hydrant_system_1.setStoreDriver(storeType);
        const airDb = await di_1.DI.getP(air_control_1.AIR_DB);
        this.airDb = airDb;
        const connector = await di_1.DI.getP(ground_control_1.TRANS_CONNECTOR);
        await connector.init();
        const storeDriver = await di_1.DI.getP(ground_control_1.STORE_DRIVER);
        await storeDriver.dropTable('github_com___airport__airport_code__SEQUENCES');
        await storeDriver.dropTable('github_com___airport__airport_code__SEQUENCE_BLOCKS');
        await storeDriver.dropTable('github_com___airport__airport_code__SEQUENCE_CONSUMERS');
        await storeDriver.dropTable('github_com___airport__holding_pattern__ACTOR_APPLICATION');
        await storeDriver.dropTable('github_com___airport__holding_pattern__Actor');
        await storeDriver.dropTable('github_com___airport__holding_pattern__Application');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_ACTORS');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_APPLICATION');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_OPERATION_HISTORY');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_RECORD_HISTORY');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_RECORD_HISTORY_NEW_VALUES');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_RECORD_HISTORY_OLD_VALUES');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_SCHEMAS');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPOSITORY_TRANSACTION_HISTORY');
        await storeDriver.dropTable('github_com___airport__holding_pattern__REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS');
        await storeDriver.dropTable('github_com___airport__holding_pattern__TRANSACTION_HISTORY');
        await storeDriver.dropTable('github_com___airport__territory__APPLICATIONS');
        await storeDriver.dropTable('github_com___airport__territory__APPLICATION_PACKAGES');
        await storeDriver.dropTable('github_com___airport__territory__DOMAINS');
        await storeDriver.dropTable('github_com___airport__territory__PACKAGED_UNITS');
        await storeDriver.dropTable('github_com___airport__territory__PACKAGES');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMAS');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_COLUMNS');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_COLUMN_PROPERTIES');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_ENTITIES');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_PROPERTIES');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_REFERENCES');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_RELATIONS');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_RELATION_COLUMNS');
        await storeDriver.dropTable('github_com___airport__traffic_pattern__SCHEMA_VERSIONS');
        await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__Agt');
        await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__TERMINAL_AGTS');
        await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__Terminal');
        await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__USER_TERMINAL');
        await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__USER_TERMINAL_AGT');
        await storeDriver.dropTable('github_com___airport__travel_document_checkpoint__User');
        if (await storeDriver.doesTableExist('github_com___airport_territory__PACKAGES')) {
            const queryObjectInitializer = await di_1.DI.getP(takeoff_1.QUERY_OBJECT_INITIALIZER);
            await queryObjectInitializer.initialize();
        }
        else {
            const server = await di_1.DI.getP(tower_1.TRANS_SERVER);
            server.tempActor = new holding_pattern_1.Actor();
            await this.installAirportSchema();
            await this.initTerminal(domainName);
            server.tempActor = null;
        }
        /*
                throw `Implement!`
                let dbFacade: IDatabaseFacade = this.databaseMap[terminalName]
                if (!dbFacade) {
                    dbFacade                       = new DatabaseFacade(terminalName)
                    this.databaseMap[terminalName] = dbFacade
                    this.dbNames.push(terminalName)
                    this.dbNameSet[terminalName] = true
                }
                if (this.isInitialized(terminalName)) {
                    throw `Database '${terminalName}' is already initialized`
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
    async initTerminal(domainName) {
        await tower_1.transactional(async () => {
            const user = new travel_document_checkpoint_1.User();
            user.uniqueId = domainName;
            const userDao = await di_1.DI.getP(travel_document_checkpoint_1.USER_DAO);
            await userDao.save(user);
            const terminal = new travel_document_checkpoint_1.Terminal();
            terminal.name = domainName;
            terminal.owner = user;
            const terminalDao = await di_1.DI.getP(travel_document_checkpoint_1.TERMINAL_DAO);
            await terminalDao.save(terminal);
            const actor = new holding_pattern_1.Actor();
            actor.user = user;
            actor.terminal = terminal;
            actor.randomId = Math.random();
            const actorDao = await di_1.DI.getP(holding_pattern_1.ACTOR_DAO);
            await actorDao.save(actor);
        });
    }
    async bulkCreate(dao, entities) {
        const entityDbFacade = dao.db;
        const dbFacade = entityDbFacade.common;
        await dbFacade.bulkCreate(entityDbFacade.dbEntity, entities, false, false, false);
    }
    async installAirportSchema() {
        const blueprintFile = await Promise.resolve().then(() => require('@airport/blueprint'));
        const schemaInitializer = await di_1.DI.getP(landing_1.SCHEMA_INITIALIZER);
        await schemaInitializer.initialize(blueprintFile.BLUEPRINT, false);
    }
}
exports.DatabaseManager = DatabaseManager;
di_1.DI.set(diTokens_1.DATABASE_MANAGER, DatabaseManager);
//# sourceMappingURL=DatabaseManager.js.map