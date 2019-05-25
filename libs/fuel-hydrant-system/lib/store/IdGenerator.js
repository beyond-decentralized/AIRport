"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const holding_pattern_1 = require("@airport/holding-pattern");
const diTokens_1 = require("../diTokens");
/**
 * Created by Papa on 9/2/2016.
 */
class IdGenerator {
    constructor() {
        this.transactionHistoryIdColumns = [];
        di_1.DI.get((airportDatabase, sequenceGenerator, utils) => {
            this.airDb = airportDatabase;
            this.utils = utils;
        }, air_control_1.AIR_DB, air_control_1.UTILS);
        this.sequenceGeneratorFuture = di_1.DI.laterP(diTokens_1.SEQUENCE_GENERATOR);
    }
    async init(domain) {
        this.sequenceGenerator = await this.sequenceGeneratorFuture();
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
}
exports.IdGenerator = IdGenerator;
di_1.DI.set(diTokens_1.ID_GENERATOR, IdGenerator);
//# sourceMappingURL=IdGenerator.js.map