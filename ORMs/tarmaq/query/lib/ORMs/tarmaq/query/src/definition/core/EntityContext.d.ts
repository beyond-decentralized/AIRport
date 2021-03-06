import { IContext } from '@airport/direction-indicator';
import { DbEntity, IAbstractQueryContext } from '@airport/ground-control';
export interface IEntityContext extends IContext {
    dbEntity?: DbEntity;
}
export interface IEntityQueryContext extends IAbstractQueryContext, IEntityContext {
}
//# sourceMappingURL=EntityContext.d.ts.map