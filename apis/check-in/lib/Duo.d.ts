import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity, QSchema } from '@airport/air-control';
import { DbEntity } from '@airport/ground-control';
/**
 * Created by Papa on 8/26/2017.
 */
/**
 * Data Manipulation object.
 */
export declare class Duo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdate extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> implements IDuo<Entity, EntitySelect, EntityCreate, EntityUpdate, EntityId, IQE> {
    private dbEntity;
    constructor(dbEntityName: string | DbEntity, qSchema?: QSchema);
    getIdStub(ids: number | string | number[] | string[]): EntityId;
    getIdStubs(ids: number[] | string[] | number[][] | string[][]): EntityId[];
    getAllFieldsSelect(): EntitySelect;
    getIdFieldsSelect(): EntityId;
    getNonIdFieldsSelect(): EntityUpdate;
    getMaxIdsSelectPerRepository(): void;
    getMaxIdSelect(): void;
    getAllManyToOnesSelect(): EntitySelect;
    getAllManyToOneIdStubsSelect(): EntitySelect;
    getAllOneToManysSelect(): EntitySelect;
}
export declare function getAllFieldsSelect(dbEntity: DbEntity): IEntitySelectProperties;
export declare const DUO: {
    getAllFieldsSelect: typeof getAllFieldsSelect;
};
