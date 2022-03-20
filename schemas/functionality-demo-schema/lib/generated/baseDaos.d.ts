import { ILevel1 } from './level1';
import { Level1ESelect, Level1ECreateProperties, Level1EUpdateColumns, Level1EUpdateProperties, Level1EId, Level1Graph, QLevel1 } from './qlevel1';
import { ILevel2 } from './level2';
import { Level2ESelect, Level2ECreateProperties, Level2EUpdateColumns, Level2EUpdateProperties, Level2EId, Level2Graph, QLevel2 } from './qlevel2';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseLevel1Dao extends IDao<ILevel1, Level1ESelect, Level1ECreateProperties, Level1EUpdateColumns, Level1EUpdateProperties, Level1EId, Level1Graph, QLevel1> {
}
export declare class BaseLevel1Dao extends SQDIDao<ILevel1, Level1ESelect, Level1ECreateProperties, Level1EUpdateColumns, Level1EUpdateProperties, Level1EId, Level1Graph, QLevel1> implements IBaseLevel1Dao {
    static Find: DaoQueryDecorators<Level1ESelect>;
    static FindOne: DaoQueryDecorators<Level1ESelect>;
    static Search: DaoQueryDecorators<Level1ESelect>;
    static SearchOne: DaoQueryDecorators<Level1ESelect>;
    static Save(config: Level1Graph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseLevel2Dao extends IDao<ILevel2, Level2ESelect, Level2ECreateProperties, Level2EUpdateColumns, Level2EUpdateProperties, Level2EId, Level2Graph, QLevel2> {
}
export declare class BaseLevel2Dao extends SQDIDao<ILevel2, Level2ESelect, Level2ECreateProperties, Level2EUpdateColumns, Level2EUpdateProperties, Level2EId, Level2Graph, QLevel2> implements IBaseLevel2Dao {
    static Find: DaoQueryDecorators<Level2ESelect>;
    static FindOne: DaoQueryDecorators<Level2ESelect>;
    static Search: DaoQueryDecorators<Level2ESelect>;
    static SearchOne: DaoQueryDecorators<Level2ESelect>;
    static Save(config: Level2Graph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map