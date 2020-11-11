import { IContext } from '@airport/di';
import { DbEntity } from '@airport/ground-control';
export interface IEntityContext extends IContext {
    dbEntity: DbEntity;
}
export interface IEntityOperationContext extends IEntityContext {
}
//# sourceMappingURL=EntityContext.d.ts.map