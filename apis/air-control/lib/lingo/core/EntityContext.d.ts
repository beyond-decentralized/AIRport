import { IContext } from '@airport/di';
import { DbEntity, IAbstractQueryContext } from '@airport/ground-control';
export interface IEntityContext extends IContext {
    dbEntity?: DbEntity;
}
export interface IEntityQueryContext extends IAbstractQueryContext<any>, IEntityContext {
}
//# sourceMappingURL=EntityContext.d.ts.map