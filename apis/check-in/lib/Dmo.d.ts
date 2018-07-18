import { IDmo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from "@airport/air-control";
import { DbEntity } from "@airport/ground-control";
/**
 * Created by Papa on 8/26/2017.
 */
/**
 * Data Manipulation object.
 */
export declare class Dmo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdate extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> implements IDmo<Entity, EntitySelect, EntityCreate, EntityUpdate, EntityId, IQE> {
    private dbEntity;
    constructor(dbEntity: DbEntity);
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
export declare const DMO: {
    getAllFieldsSelect: typeof getAllFieldsSelect;
};
