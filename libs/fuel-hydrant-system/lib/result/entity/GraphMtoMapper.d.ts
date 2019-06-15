import { DbEntity } from '@airport/ground-control';
/**
 * Created by Papa on 10/15/2016.
 */
export interface ManyToOneStubReference {
    mtoDbEntity: DbEntity;
    mtoParentObject: any;
    mtoRelationField: string;
    otmEntityField: string;
    otmEntityId: string | number;
    otmDbEntity: DbEntity;
}
export declare class GraphMtoMapper {
    mtoStubReferenceMap: {
        [mtoEntityId: string]: {
            [mtoPropertyName: string]: ManyToOneStubReference;
        };
    }[][];
    addMtoReference(mtoStubReference: ManyToOneStubReference, mtoEntityIdValue: string): void;
    populateMtos(entityMap: {
        [entityId: string]: any;
    }[][]): void;
}
