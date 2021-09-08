import { IChild } from './child';
import { ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild } from './qchild';
import { IParent } from './parent';
import { ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent } from './qparent';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity<Entity>> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseChildDao extends IDao<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild> {
}
export declare class BaseChildDao extends SQDIDao<IChild, ChildESelect, ChildECreateProperties, ChildEUpdateColumns, ChildEUpdateProperties, ChildEId, ChildGraph, QChild> implements IBaseChildDao {
    static Find: DaoQueryDecorators<ChildESelect>;
    static FindOne: DaoQueryDecorators<ChildESelect>;
    static Search: DaoQueryDecorators<ChildESelect>;
    static SearchOne: DaoQueryDecorators<ChildESelect>;
    static Save(config: ChildGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseParentDao extends IDao<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent> {
}
export declare class BaseParentDao extends SQDIDao<IParent, ParentESelect, ParentECreateProperties, ParentEUpdateColumns, ParentEUpdateProperties, ParentEId, ParentGraph, QParent> implements IBaseParentDao {
    static Find: DaoQueryDecorators<ParentESelect>;
    static FindOne: DaoQueryDecorators<ParentESelect>;
    static Search: DaoQueryDecorators<ParentESelect>;
    static SearchOne: DaoQueryDecorators<ParentESelect>;
    static Save(config: ParentGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map