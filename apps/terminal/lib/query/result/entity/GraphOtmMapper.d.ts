import { DbEntity, IUtils, MappedEntityArray } from "@airport/air-control";
import { ManyToOneStubReference } from "./GraphMtoMapper";
/**
 * Created by Papa on 10/15/2016.
 */
export interface OneToManyStubReference {
    otmDbEntity: DbEntity;
    otmPropertyName: string;
    otmObject: any;
}
export declare class GraphOtmMapper {
    private utils;
    mtoEntityReferenceMap: {
        [otmReferenceId: string]: {
            [otmProperty: string]: MappedEntityArray<any>;
        };
    }[][];
    otmEntityReferenceMap: {
        [otmEntityId: string]: any;
    }[][];
    constructor(utils: IUtils);
    addMtoReference(mtoStubReference: ManyToOneStubReference, mtoEntityId: string | number, dbEntity: DbEntity): void;
    addOtmReference(otmStubReference: OneToManyStubReference, otmEntityIdValue: string): void;
    populateOtms(entityMap: {
        [entityId: string]: any;
    }[][], keepMappedEntityArrays: boolean): void;
}
