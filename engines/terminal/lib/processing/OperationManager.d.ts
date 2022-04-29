import { IAirportDatabase, IApplicationUtils, IQMetadataUtils, IQueryFacade } from '@airport/air-control';
import { IEntityStateManager, IRootTransaction, ISaveResult } from '@airport/ground-control';
import { IActor } from '@airport/holding-pattern';
import { ICascadeGraphVerifier, IDeleteManager, IDependencyGraphResolver, IEntityGraphReconstructor, IInsertManager, IOperationContext, IOperationManager, IStructuralEntityValidator, ITransaction, IUpdateManager } from '@airport/terminal-map';
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
    structuralEntityValidator: IStructuralEntityValidator;
    updateManager: IUpdateManager;
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    performSave<E>(entities: E | E[], actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, context: IOperationContext): Promise<ISaveResult>;
    protected internalCreate<E>(entities: E[], actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, saveResult: ISaveResult, context: IOperationContext, ensureGeneratedValues?: boolean): Promise<void>;
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    protected internalUpdate<E>(entities: E[], actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, saveResult: ISaveResult, context: IOperationContext): Promise<void>;
    protected internalDelete<E>(entities: E[], actor: IActor, transaction: ITransaction, rootTransaction: IRootTransaction, saveResult: ISaveResult, context: IOperationContext): Promise<void>;
}
//# sourceMappingURL=OperationManager.d.ts.map