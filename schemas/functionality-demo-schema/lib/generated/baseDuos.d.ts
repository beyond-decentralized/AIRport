import { IChild } from './child';
import { ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild } from './qchild';
import { IParent } from './parent';
import { ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent } from './qparent';
import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseChildDuo extends IDuo<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild> {
}
export declare class BaseChildDuo extends SQDIDuo<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild> implements IBaseChildDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseParentDuo extends IDuo<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent> {
}
export declare class BaseParentDuo extends SQDIDuo<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent> implements IBaseParentDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map