var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { abs, add, and, avg, bool, concat, count, date, distinct, divide, exists, format, Inject, Injected, intersect, lcase, len, max, mid, min, minus, modulus, multiply, NonEntityFind, NonEntityFindOne, NonEntitySearch, NonEntitySearchOne, not, now, num, or, replace, round, str, subtract, sum, trim, ucase, union, unionAll, wrapPrimitive, } from '@airport/air-control';
class EntityAccumulator {
    constructor(applicationDomain, applicationName, entityMap) {
        this.applicationDomain = applicationDomain;
        this.applicationName = applicationName;
        this.entityMap = entityMap;
    }
    add(clazz, index) {
        this.entityMap.set(clazz, {
            entity: {
                index,
                name: clazz.name,
            },
            application: {
                domain: this.applicationDomain,
                name: this.applicationName,
            },
        });
    }
}
let AirportDatabase = class AirportDatabase {
    // private databaseMap: { [databaseName: string]: IDatabaseFacade } = {}
    // private dbNames: string[]                                        = []
    // private dbNameSet: { [databaseName: string]: boolean }           = {}
    // private currentDbName = dbConst.DEFAULT_DB
    constructor() {
        this.entityMap = new Map();
        this.functions = {
            abs,
            avg,
            count,
            max,
            min,
            sum,
            ucase,
            lcase,
            mid,
            len,
            round,
            now,
            format,
            replace,
            trim,
            distinct,
            exists,
            divide,
            subtract,
            modulus,
            multiply,
            add,
            concat,
            union,
            unionAll,
            intersect,
            minus,
            // logical operators
            and,
            not,
            or,
            // primitive wrappers
            bool,
            date,
            num,
            str,
            wrapPrimitive,
        };
        this.applications = [];
        this.qApplications = [];
        this.QM = {};
        this.S = this.applications;
        this.Q = this.qApplications;
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

        async registerQApplications(
            qApplications: QApplication[]
        ) {
            for (const qApplication of qApplications) {
                const fullApplicationName    = getFullApplicationName(qApplication)
                this.QM[fullApplicationName] = qApplication
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
    getAccumulator(applicationDomain, applicationName) {
        return new EntityAccumulator(applicationDomain, applicationName, this.entityMap);
    }
    async addRepository(
    // url: string,
    // platform: PlatformType,
    // platformConfig: string,
    // distributionStrategy: DistributionStrategy,
    context) {
        return await this.databaseFacade.addRepository(
        // url, platform, platformConfig, distributionStrategy, 
        context);
    }
    async insertColumnValues(rawInsertValues, context) {
        return await this.databaseFacade.insertColumnValues(rawInsertValues, context);
    }
    async insertValues(rawInsertValues, context) {
        return await this.databaseFacade.insertValues(rawInsertValues, context);
    }
    async insertColumnValuesGenerateIds(rawInsertValues, context) {
        return await this.databaseFacade.insertColumnValuesGenerateIds(rawInsertValues, context);
    }
    async insertValuesGenerateIds(rawInsertValues, context) {
        return await this.databaseFacade.insertValuesGenerateIds(rawInsertValues, context);
    }
    /**
     * Creates an entity with a where clause - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records deleted
     */
    async deleteWhere(rawDelete, context) {
        return await this.databaseFacade.deleteWhere(rawDelete, context);
    }
    /**
     * Ether creates or updates an entity - internal API.  Use the
     *  API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records saved (1 or 0)
     */
    async save(entity, context, operationName) {
        return await this.databaseFacade.save(entity, context);
    }
    /**
     * Updates an entity with a where clause, using a column based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateColumnsWhere(rawUpdateColumns, context) {
        return await this.databaseFacade.updateColumnsWhere(rawUpdateColumns, context);
    }
    /**
     * Updates an entity with a where clause, using a property based set clause
     * - internal API.  Use the API provided by the IEntityDatabaseFacade.
     *
     * @return Number of records updated
     */
    async updateWhere(rawUpdate, context) {
        return await this.databaseFacade.updateWhere(rawUpdate, context);
    }
};
__decorate([
    Inject()
], AirportDatabase.prototype, "databaseFacade", void 0);
AirportDatabase = __decorate([
    Injected()
], AirportDatabase);
export { AirportDatabase };
export function injectAirportDatabase() {
    console.log('Injecting AirportDatabase');
}
//# sourceMappingURL=AirportDatabase.js.map