import { IContext } from '@airport/direction-indicator';
import { ISequenceGenerator } from '@airport/ground-control';
import { OperationHistory_LocalId, RecordHistory_LocalId, RepositoryTransactionHistory_LocalId, TransactionHistory_LocalId } from '@airport/holding-pattern';
export declare type NumRepositoryTransHistories = number;
export declare type NumOperationTransHistories = number;
export declare type NumRecordHistories = number;
export interface TransactionHistory_LocalIds {
    operationHistory_LocalIds: OperationHistory_LocalId[];
    recordHistory_LocalIds: RecordHistory_LocalId[];
    repositoryHistory_LocalIds: RepositoryTransactionHistory_LocalId[];
    transactionHistory_LocalId: TransactionHistory_LocalId;
}
export interface IIdGenerator {
    init(): Promise<void>;
    generateTransactionHistory_LocalIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): Promise<TransactionHistory_LocalIds>;
}
export interface IIdGeneratorContext extends IContext {
    di: {
        sequenceGenerator: ISequenceGenerator;
    };
    isServer: boolean;
}
/**
 * Created by Papa on 9/2/2016.
 */
export declare class IdGenerator implements IIdGenerator {
    sequenceGenerator: ISequenceGenerator;
    private transactionHistory_LocalIdColumns;
    init(): Promise<void>;
    populateTransactionHistory_LocalIdColumns(): Promise<void>;
    doPopulateTransactionHistory_LocalIdColumns(resolve: any): void;
    generateTransactionHistory_LocalIds(numRepositoryTransHistories: NumRepositoryTransHistories, numOperationTransHistories: NumOperationTransHistories, numRecordHistories: NumRecordHistories): Promise<TransactionHistory_LocalIds>;
    generateEntityIds(): Promise<void>;
    private getHoldingPatternDbEntity;
}
//# sourceMappingURL=IdGenerator.d.ts.map