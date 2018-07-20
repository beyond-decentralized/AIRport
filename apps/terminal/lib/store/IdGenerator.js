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
const holding_pattern_1 = require("@airport/holding-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
/**
 * Created by Papa on 9/2/2016.
 */
let IdGenerator = class IdGenerator {
    constructor(airportDb, utils) {
        this.airportDb = airportDb;
        this.utils = utils;
    }
    generateTransHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('TransactionHistory');
    }
    generateRepoTransHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('RepositoryTransactionHistory');
    }
    generateOperationHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('OperationHistory');
    }
    generateRecordHistoryId( //
    ) {
        return this.generateHoldingPatternEntityId('RecordHistory');
    }
    generateHoldingPatternEntityId(holdingPatternEntityName) {
        const dbEntity = holding_pattern_1.Q.db.entityMapByName[holdingPatternEntityName];
        return this.generateEntityId(dbEntity);
    }
    generateEntityId(dbEntity, entity = null) {
        if (!this.lastIds) {
            throw `Id cache is not loaded.`;
            // await this.loadLatestIds();
        }
        let newId = ++this.lastIds[dbEntity.schema.index][dbEntity.index];
        if (!entity) {
            return newId;
        }
        const recordWithId = {
            ...entity,
        };
        let columnName = dbEntity.idColumns[0].name;
        recordWithId[columnName] = newId;
        return recordWithId;
    }
    /**
     * Ids are tracked on per-Entity basis.  Id's are assigned optimistically can be
     * retroactively updated if sync conflicts arise.  At load time latest ids
     * are loaded into memory and then are maintained in memory for the uptime of the
     * db server.
     * @returns {Promise<void>}
     */
    async loadLatestIds( //
    ) {
        const maxIdRecords = await this.airportDb.db.find.sheet(this.getMaxIdQueries());
        this.lastIds = [];
        for (const maxIdRecord of maxIdRecords) {
            const schemaLastIds = this.utils.ensureChildArray(this.lastIds, maxIdRecord[0]);
            let id = maxIdRecord[2];
            if (!id) {
                id = 0;
            }
            schemaLastIds[maxIdRecord[1]] = id;
        }
    }
    generateByHoldingPatternEntityName(entityName) {
        const dbEntity = holding_pattern_1.Q.db.entityMapByName[entityName];
        return this.generateEntityId(dbEntity);
    }
    getMaxIdQueries() {
        const idQueries = [];
        for (const schema of this.airportDb.schemas) {
            const qSchema = this.airportDb.qSchemas[schema.index];
            for (const entity of schema.entities) {
                if (entity.idColumns.length > 1) {
                    continue;
                }
                const idColumn = entity.idColumns[0];
                if (!idColumn.isGenerated) {
                    continue;
                }
                const qEntity = qSchema[entity.name];
                const select = [];
                select.push(schema.index);
                select.push(entity.index);
                select.push(air_control_1.max(qEntity[idColumn.name]));
                let query = {
                    select,
                    from: [qEntity],
                };
                idQueries.push(query);
            }
        }
        return air_control_1.unionAll(...idQueries);
    }
    ;
};
IdGenerator = __decorate([
    typedi_1.Service(InjectionTokens_1.IdGeneratorToken),
    __param(0, typedi_1.Inject(_ => air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(_ => air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object])
], IdGenerator);
exports.IdGenerator = IdGenerator;
//# sourceMappingURL=IdGenerator.js.map