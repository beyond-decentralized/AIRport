var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { Q } from '@airport/holding-pattern-runtime';
/**
 * Created by Papa on 9/2/2016.
 */
let IdGenerator = class IdGenerator {
    constructor() {
        this.transactionHistoryIdColumns = [];
    }
    async init() {
        this.populateTransactionHistoryIdColumns().then();
    }
    populateTransactionHistoryIdColumns() {
        return new Promise((resolve, _reject) => {
            this.doPopulateTransactionHistoryIdColumns(resolve);
        });
    }
    doPopulateTransactionHistoryIdColumns(resolve) {
        if (Q.__dbApplication__ && Q.__dbApplication__.currentVersion) {
            const transactionHistoryDbEntity = this.getHoldingPatternDbEntity('TransactionHistory');
            const repoTransHistoryDbEntity = this.getHoldingPatternDbEntity('RepositoryTransactionHistory');
            const operationHistoryDbEntity = this.getHoldingPatternDbEntity('OperationHistory');
            const recordHistoryDbEntity = this.getHoldingPatternDbEntity('RecordHistory');
            this.transactionHistoryIdColumns.push(transactionHistoryDbEntity.idColumns[0]);
            this.transactionHistoryIdColumns.push(repoTransHistoryDbEntity.idColumns[0]);
            this.transactionHistoryIdColumns.push(operationHistoryDbEntity.idColumns[0]);
            this.transactionHistoryIdColumns.push(recordHistoryDbEntity.idColumns[0]);
            resolve();
        }
        else {
            setTimeout(() => {
                this.doPopulateTransactionHistoryIdColumns(resolve);
            }, 100);
        }
    }
    async generateTransactionHistoryIds(numRepositoryTransHistories, numOperationTransHistories, numRecordHistories) {
        let generatedSequenceNumbers = await this.sequenceGenerator
            .generateSequenceNumbers(this.transactionHistoryIdColumns, [
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
        return Q.__dbApplication__.currentVersion[0].applicationVersion
            .entityMapByName[holdingPatternEntityName];
    }
};
__decorate([
    Inject()
], IdGenerator.prototype, "sequenceGenerator", void 0);
IdGenerator = __decorate([
    Injected()
], IdGenerator);
export { IdGenerator };
//# sourceMappingURL=IdGenerator.js.map