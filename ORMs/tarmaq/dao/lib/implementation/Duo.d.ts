import { QApplication } from '@airport/aviation-communication';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
import { DbEntity, ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
import { IDuo, IFieldsSelect } from '../definition/Duo';
/**
 * Data Manipulation object.
 */
export declare class Duo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdate extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> implements IDuo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdate, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    SELECT: IFieldsSelect<EntitySelect>;
    private dbEntity;
    constructor(dbEntityId: DbEntityId | DbEntity, qApplication?: QApplication);
    getLocalIdStub(_localIds: number | string | number[] | string[]): ApplicationEntity_LocalId;
    getLocalIdStubs(_localIds: number[] | string[] | number[][] | string[][]): ApplicationEntity_LocalId[];
}
//# sourceMappingURL=Duo.d.ts.map