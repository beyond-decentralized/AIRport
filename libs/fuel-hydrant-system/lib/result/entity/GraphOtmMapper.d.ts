import { MappedEntityArray } from '@airport/air-traffic-control';
import { DbEntity } from '@airport/ground-control';
import { IFuelHydrantContext } from '../../FuelHydrantContext';
import { ManyToOneStubReference } from './GraphMtoMapper';
/**
 * Created by Papa on 10/15/2016.
 */
export interface OneToManyStubReference {
    otmDbEntity: DbEntity;
    otmPropertyName: string;
    otmObject: any;
}
export declare class GraphOtmMapper {
    mtoEntityReferenceMap: {
        [otmReferenceId: string]: {
            [otmProperty: string]: MappedEntityArray<any>;
        };
    }[][];
    otmEntityReferenceMap: {
        [otmEntityId: string]: any;
    }[][];
    addMtoReference(mtoStubReference: ManyToOneStubReference, mtoEntityId: string | number, dbEntity: DbEntity, context: IFuelHydrantContext): void;
    addOtmReference(otmStubReference: OneToManyStubReference, otmEntityIdValue: string): void;
    populateOtms(entityMap: {
        [entityId: string]: any;
    }[][], keepMappedEntityArrays: boolean): void;
}
//# sourceMappingURL=GraphOtmMapper.d.ts.map