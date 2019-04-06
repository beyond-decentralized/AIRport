"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const fuel_hydrant_system_1 = require("@airport/fuel-hydrant-system");
const ground_control_1 = require("@airport/ground-control");
const landing_1 = require("@airport/landing");
const takeoff_1 = require("@airport/takeoff");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class DatabaseManager {
    constructor() {
    }
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
    async init(storeType) {
        await fuel_hydrant_system_1.setStoreDriver(storeType);
        const airDb = await di_1.DI.getP(air_control_1.AIR_DB);
        this.airDb = airDb;
        const transManager = await di_1.DI.getP(terminal_map_1.TRANSACTION_MANAGER);
        await transManager.initialize('airport');
        const storeDriver = await di_1.DI.getP(ground_control_1.STORE_DRIVER)
            .findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `SELECT tbl_name from sqlite_master WHERE type = '${tableName}'`, []);
        if (await storeDriver.doesTableExist('github_com___airport_territory__Package')) {
            const queryObjectInitializer = await di_1.DI.getP(takeoff_1.QUERY_OBJECT_INITIALIZER);
            await queryObjectInitializer.initialize();
        }
        else {
            await this.installAirportSchema();
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
    async installAirportSchema() {
        const blueprintFile = await Promise.resolve().then(() => require('@airport/blueprint'));
        const schemaInitializer = await di_1.DI.getP(landing_1.SCHEMA_INITIALIZER);
        await schemaInitializer.initialize(blueprintFile.BLUEPRINT, false);
    }
}
exports.DatabaseManager = DatabaseManager;
di_1.DI.set(diTokens_1.DATABASE_MANAGER, DatabaseManager);
//# sourceMappingURL=DatabaseManager.js.map