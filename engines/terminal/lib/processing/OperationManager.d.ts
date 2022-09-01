import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control';
import { IApplicationUtils } from '@airport/tarmaq-query';
import { IEntityStateManager, IRootTransaction, ISaveResult } from '@airport/ground-control';
import { IActor, IAirEntity } from '@airport/holding-pattern';
import { ICascadeGraphVerifier, IDeleteManager, IDependencyGraphResolver, IEntityGraphReconstructor, IInsertManager, IOperationContext, IOperationManager, IStructuralEntityValidator, ITransaction, ITransactionContext, IUpdateManager } from '@airport/terminal-map';
import { IQueryFacade } from '@airport/tarmaq-dao';
import { IRepositoryManager } from '@airport/holding-pattern/lib/core/RepositoryManager';
/**
 * Created by Papa on 11/15/2016.
 */
export declare class OperationManager implements IOperationManager {
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    cascadeGraphVerifier: ICascadeGraphVerifier;
    deleteManager: IDeleteManager;
    dependencyGraphResolver: IDependencyGraphResolver;
    entityGraphReconstructor: IEntityGraphReconstructor;
    entityStateManager: IEntityStateManager;
    insertManager: IInsertManager;
    qMetadataUtils: IQMetadataUtils;
    queryFacade: IQueryFacade;
    repositoryManager: IRepositoryManager;
    structuralEntityValidator: IStructuralEntityValidator;
    updateManager: IUpdateManager;
    utils: IUtils;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    performSave<E extends IAirEntity, T = E | E[]>(entities: T, actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext & ITransactionContext): Promise<ISaveResult>;
    protected internalCreate<E extends IAirEntity>(entities: E[], actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, saveResult: ISaveResult, context: IOperationContext, ensureGeneratedValues?: boolean): Promise<void>;
    /**
     * On an UPDATE operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    protected internalUpdate<E extends IAirEntity>(entities: E[], actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, saveResult: ISaveResult, context: IOperationContext): Promise<void>;
    protected internalDelete<E extends IAirEntity>(entities: E[], actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, saveResult: ISaveResult, context: IOperationContext): Promise<void>;
}
//# sourceMappingURL=OperationManager.d.ts.map