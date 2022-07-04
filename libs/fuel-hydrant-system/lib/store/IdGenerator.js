var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { Q } from '@airport/holding-pattern';
/**
 * Created by Papa on 9/2/2016.
 */
let IdGenerator = class IdGenerator {
    constructor() {
        this.transactionHistory_LocalIdColumns = [];
    }
    async init() {
        this.populateTransactionHistory_LocalIdColumns().then();
    }
    populateTransactionHistory_LocalIdColumns() {
        return new Promise((resolve, _reject) => {
            this.doPopulateTransactionHistory_LocalIdColumns(resolve);
        });
    }
    doPopulateTransactionHistory_LocalIdColumns(resolve) {
        if (Q.__dbApplication__ && Q.__dbApplication__.currentVersion) {
            const transactionHistoryDbEntity = this.getHoldingPatternDbEntity('TransactionHistory');
            const repoTransHistoryDbEntity = this.getHoldingPatternDbEntity('RepositoryTransactionHistory');
            const operationHistoryDbEntity = this.getHoldingPatternDbEntity('OperationHistory');
            const recordHistoryDbEntity = this.getHoldingPatternDbEntity('RecordHistory');
            this.transactionHistory_LocalIdColumns.push(transactionHistoryDbEntity.idColumns[0]);
            this.transactionHistory_LocalIdColumns.push(repoTransHistoryDbEntity.idColumns[0]);
            this.transactionHistory_LocalIdColumns.push(operationHistoryDbEntity.idColumns[0]);
            this.transactionHistory_LocalIdColumns.push(recordHistoryDbEntity.idColumns[0]);
            resolve();
        }
        else {
            setTimeout(() => {
                this.doPopulateTransactionHistory_LocalIdColumns(resolve);
            }, 100);
        }
    }
    async generateTransactionHistory_LocalIds(numRepositoryTransHistories, numOperationTransHistories, numRecordHistories) {
        let generatedSequenceNumbers = await this.sequenceGenerator
            .generateSequenceNumbers(this.transactionHistory_LocalIdColumns, [
            1,
            numRepositoryTransHistories,
            numOperationTransHistories,
            numRecordHistories
        ]);
        return {
            operationHistory_LocalIds: generatedSequenceNumbers[2],
            recordHistory_LocalIds: generatedSequenceNumbers[3],
            repositoryHistory_LocalIds: generatedSequenceNumbers[1],
            transactionHistory_LocalId: generatedSequenceNumbers[0][0]
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