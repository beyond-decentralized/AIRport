"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const diTokens_1 = require("./diTokens");
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
    async findAsField(rawFieldQuery) {
        return await this.find(rawFieldQuery, air_control_1.SheetQuery, ground_control_1.QueryResultType.FIELD, false);
    }
    async findOneAsField(rawFieldQuery) {
        return await this.find(rawFieldQuery, air_control_1.SheetQuery, ground_control_1.QueryResultType.FIELD, true);
    }
    async findAsSheet(rawSheetQuery, cursorSize, callback) {
        if (cursorSize || callback) {
            throw `Implement!`;
        }
        return await this.find(rawSheetQuery, air_control_1.SheetQuery, ground_control_1.QueryResultType.SHEET, false);
    }
    async findOneAsSheet(rawSheetQuery, cursorSize, callback) {
        if (cursorSize || callback) {
            throw `Implement!`;
        }
        return await this.find(rawSheetQuery, air_control_1.SheetQuery, ground_control_1.QueryResultType.SHEET, true);
    }
    async findAsTree(rawTreeQuery) {
        return await this.find(rawTreeQuery, air_control_1.TreeQuery, ground_control_1.QueryResultType.TREE, false);
    }
    async findOneAsTree(rawTreeQuery) {
        return await this.find(rawTreeQuery, air_control_1.TreeQuery, ground_control_1.QueryResultType.TREE, true);
    }
    searchAsField(rawFieldQuery) {
        return observe_1.Observable.from(this.search(rawFieldQuery, air_control_1.FieldQuery, ground_control_1.QueryResultType.FIELD, false));
    }
    searchOneAsField(rawFieldQuery) {
        return observe_1.Observable.from(this.search(rawFieldQuery, air_control_1.FieldQuery, ground_control_1.QueryResultType.FIELD, true));
    }
    searchAsSheet(rawSheetQuery, cursorSize, callback) {
        if (cursorSize || callback) {
            throw `Implement!`;
        }
        return observe_1.Observable.from(this.search(rawSheetQuery, air_control_1.SheetQuery, ground_control_1.QueryResultType.SHEET, false));
    }
    searchOneAsSheet(rawSheetQuery, cursorSize, callback) {
        if (cursorSize || callback) {
            throw `Implement!`;
        }
        return observe_1.Observable.from(this.search(rawSheetQuery, air_control_1.SheetQuery, ground_control_1.QueryResultType.SHEET, true));
    }
    searchAsTree(rawTreeQuery) {
        return observe_1.Observable.from(this.search(rawTreeQuery, air_control_1.TreeQuery, ground_control_1.QueryResultType.TREE, false));
    }
    searchOneAsTree(rawTreeQuery) {
        return observe_1.Observable.from(this.search(rawTreeQuery, air_control_1.TreeQuery, ground_control_1.QueryResultType.TREE, true));
    }
    async find(rawQuery, NonEntityQuery, queryResultType, findOne) {
        const [entityUtils, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.ENTITY_UTILS, air_control_1.FIELD_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, diTokens_1.UPDATE_CACHE);
        rawQuery = entityUtils.getQuery(rawQuery);
        const nonEntityQuery = new NonEntityQuery(rawQuery);
        if (findOne) {
            return await queryFacade.findOne(null, nonEntityQuery, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache);
        }
        return await queryFacade.find(null, nonEntityQuery, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache);
    }
    async search(rawNonEntityQuery, QueryClass, queryResultType, searchOne) {
        const [entityUtils, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.ENTITY_UTILS, air_control_1.FIELD_UTILS, air_control_1.QUERY_FACADE, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, diTokens_1.UPDATE_CACHE);
        const rawQuery = entityUtils.getQuery(rawNonEntityQuery);
        const query = new QueryClass(rawQuery);
        if (searchOne) {
            return await queryFacade.searchOne(null, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache);
        }
        return await queryFacade.search(null, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache);
    }
}
exports.AirportDatabase = AirportDatabase;
di_1.DI.set(air_control_1.AIR_DB, AirportDatabase);
//# sourceMappingURL=AirportDatabase.js.map