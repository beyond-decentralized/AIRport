"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
class DatabaseManager {
    constructor() {
        di_1.DI.get((airportDatabase) => {
            this.airDb = airportDatabase;
        }, air_control_1.AIR_DB);
    }
    async ensureInitialized(terminalName = air_control_1.dbConst.DEFAULT_DB, timeout = 5000) {
        return new Promise((resolve, reject) => {
            this.doEnsureInitialized(terminalName, resolve, reject, timeout);
        });
    }
    async initializeAll(defaultStoreType) {
        throw `Implement!`;
        /*		const db = TQ.db(dbConst.DEFAULT_DB);
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
                }*/
    }
    isInitialized(terminalName) {
        throw `Implement!`;
        /*		let terminal = this.databaseMap[terminalName];
                if (!terminal) {
                    return false;
                }
                return !!terminal.entityManager;*/
    }
    async init(storeType, terminalName) {
        throw `Implement!`;
        /*		let dbFacade: IDatabaseFacadeInternal = this.databaseMap[terminalName];
                if (!dbFacade) {
                    dbFacade = new DatabaseFacade(terminalName);
                    this.databaseMap[terminalName] = dbFacade;
                    this.dbNames.push(terminalName);
                    this.dbNameSet[terminalName] = true;
                }
                if (this.isInitialized(terminalName)) {
                    throw `Database '${terminalName}' is already initialized`;
                }
                this.allDbsEntityData.forEach(
                    entityData => {
                        let entityName = MetadataStore.getEntityName(entityData.entityConstructor);
                        if (!dbFacade.qEntityMap[entityName]) {
                            let qEntity = new entityData.qEntityConstructor(entityData.qEntityConstructor, entityData.entityConstructor, entityName);
                            dbFacade.qEntityMap[entityName] = qEntity;
                        }
                    });
                await dbFacade.init(storeType);*/
    }
    /*
    static async addDataStore(
        storeType: StoreType,
        terminalName: string
    ): Promise<void> {
        if (this.isInitialized(terminalName)) {
            throw `Database '${terminalName}' is already initialized`;
        }
        const newDataStore = await QDataStore.db(dbConst.DEFAULT_DB).save({
            name: terminalName,
            storeType: storeType
        });
        await TQ.init(storeType, terminalName);
    }
    */
    doEnsureInitialized(terminalName, resolve, reject, remainingTimeout) {
        if (this.isInitialized(terminalName)) {
            resolve();
        }
        if (remainingTimeout <= 0) {
            reject(`Timeout out waiting for initialization of DB: [${terminalName}]`);
        }
        remainingTimeout -= 100;
        setTimeout(() => {
            this.doEnsureInitialized(terminalName, resolve, reject, remainingTimeout);
        }, 100);
    }
}
exports.DatabaseManager = DatabaseManager;
di_1.DI.set(diTokens_1.DATABASE_MANAGER, DatabaseManager);
//# sourceMappingURL=DatabaseManager.js.map