"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    constructor(airportDb, sequenceGenerator, utils) {
        this.airportDb = airportDb;
        this.sequenceGenerator = sequenceGenerator;
        this.utils = utils;
        this.transactionHistoryIdColumns = [];
    }
    async init(domain) {
        await this.sequenceGenerator.init(domain);
        const transHistoryDbEntity = this.getHoldingPatternDbEntity('TransactionHistory');
        const repoTransHistoryDbEntity = this.getHoldingPatternDbEntity('RepositoryTransactionHistory');
        const operationHistoryDbEntity = this.getHoldingPatternDbEntity('OperationHistory');
        const recordHistoryDbEntity = this.getHoldingPatternDbEntity('RecordHistory');
        this.transactionHistoryIdColumns.push(transHistoryDbEntity.idColumns[0]);
        this.transactionHistoryIdColumns.push(repoTransHistoryDbEntity.idColumns[0]);
        this.transactionHistoryIdColumns.push(operationHistoryDbEntity.idColumns[0]);
        this.transactionHistoryIdColumns.push(recordHistoryDbEntity.idColumns[0]);
    }
    async generateTransactionHistoryIds(numRepositoryTransHistories, numOperationTransHistories, numRecordHistories) {
        const generatedSequenceNumbers = await this.sequenceGenerator.generateSequenceNumbers(this.transactionHistoryIdColumns, [
            1,
            numRepositoryTransHistories,
            numOperationTransHistories,
            numRecordHistories
        ]);
        return {
            operationHistoryIds: generatedSequenceNumbers[2],
            recordHistoryIds: generatedSequenceNumbers[3],
            repositoryHistoryIds: generatedSequenceNumbers[1],
            transactionHistoryId: generatedSequenceNumbers[0][0]
        };
    }
    async generateEntityIds() {
    }
    getHoldingPatternDbEntity(holdingPatternEntityName) {
        return holding_pattern_1.Q.db.currentVersion.entityMapByName[holdingPatternEntityName];
    }
};
IdGenerator = __decorate([
    typedi_1.Service(InjectionTokens_1.ID_GENERATOR),
    __param(0, typedi_1.Inject(air_control_1.AirportDatabaseToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.SEQUENCE_GENERATOR)),
    __param(2, typedi_1.Inject(air_control_1.UtilsToken))
], IdGenerator);
exports.IdGenerator = IdGenerator;
//# sourceMappingURL=IdGenerator.js.map