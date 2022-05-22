import { QApplication } from '@airport/aviation-communication';
import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IFieldsSelect, IQEntity } from '@airport/air-traffic-control';
import { DbEntity, EntityId as DbEntityId } from '@airport/ground-control';
/**
 * Data Manipulation object.
 */
export declare class Duo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdate extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> implements IDuo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdate, EntityId, EntityCascadeGraph, IQE> {
    select: IFieldsSelect<EntitySelect>;
    private dbEntity;
    constructor(dbEntityId: DbEntityId | DbEntity, qApplication?: QApplication);
    getIdStub(ids: number | string | number[] | string[]): EntityId;
    getIdStubs(ids: number[] | string[] | number[][] | string[][]): EntityId[];
}
//# sourceMappingURL=Duo.d.ts.map