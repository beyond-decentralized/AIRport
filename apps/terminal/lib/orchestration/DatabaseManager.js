"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let DatabaseManager = class DatabaseManager {
    constructor(airportDb) {
        this.airportDb = airportDb;
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
        /*		let database = this.databaseMap[terminalName];
                if (!database) {
                    return false;
                }
                return !!database.entityManager;*/
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
};
DatabaseManager = __decorate([
    typedi_1.Service(InjectionTokens_1.DatabaseManagerToken),
    __param(0, typedi_1.Inject(_ => air_control_1.AirportDatabaseToken)),
    __metadata("design:paramtypes", [Object])
], DatabaseManager);
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=DatabaseManager.js.map