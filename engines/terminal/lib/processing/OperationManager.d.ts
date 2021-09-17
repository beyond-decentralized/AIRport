import { ISaveResult } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { IOperationContext, IOperationManager, ITransaction } from '@airport/terminal-map';
/**
 * Created by Papa on 11/15/2016.
 */
export declare class OperationManager implements IOperationManager {
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    performSave<E>(entities: E | E[], actor: IActor, transaction: ITransaction, context: IOperationContext): Promise<ISaveResult>;
    protected internalCreate<E>(entities: E[], actor: IActor, transaction: ITransaction, saveResult: ISaveResult, context: IOperationContext, ensureGeneratedValues?: boolean): Promise<void>;
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    protected internalUpdate<E>(entities: E[], actor: IActor, transaction: ITransaction, saveResult: ISaveResult, context: IOperationContext): Promise<void>;
    protected internalDelete<E>(entities: E[], actor: IActor, transaction: ITransaction, saveResult: ISaveResult, context: IOperationContext): Promise<void>;
}
//# sourceMappingURL=OperationManager.d.ts.map