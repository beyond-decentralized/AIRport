import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { container, DI } from '@airport/di';
import { Q } from '@airport/holding-pattern';
import { ID_GENERATOR } from '../tokens';
/**
 * Created by Papa on 9/2/2016.
 */
export class IdGenerator {
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
            const transHistoryDbEntity = this.getHoldingPatternDbEntity('TransactionHistory');
            const repoTransHistoryDbEntity = this.getHoldingPatternDbEntity('RepositoryTransactionHistory');
            const operationHistoryDbEntity = this.getHoldingPatternDbEntity('OperationHistory');
            const recordHistoryDbEntity = this.getHoldingPatternDbEntity('RecordHistory');
            this.transactionHistoryIdColumns.push(transHistoryDbEntity.idColumns[0]);
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
        const sequenceGenerator = await container(this).get(SEQUENCE_GENERATOR);
        let generatedSequenceNumbers = await sequenceGenerator.generateSequenceNumbers(this.transactionHistoryIdColumns, [
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
}
DI.set(ID_GENERATOR, IdGenerator);
//# sourceMappingURL=IdGenerator.js.map