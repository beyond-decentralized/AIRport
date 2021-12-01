import { IVersionedApplicationObject } from './versionedapplicationobject';
import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-control';
import { IApplicationProperty } from './applicationproperty';
import { IApplicationEntity } from './applicationentity';
import { IApplicationRelationColumn } from './applicationrelationcolumn';
export interface IApplicationRelation extends IVersionedApplicationObject {
    id: number;
    index?: number;
    foreignKey?: ForeignKey;
    manyToOneElems?: ManyToOneElements;
    oneToManyElems?: OneToManyElements;
    relationType?: string;
    isId?: boolean;
    property?: IApplicationProperty;
    entity?: IApplicationEntity;
    relationEntity?: IApplicationEntity;
    manyRelationColumns?: IApplicationRelationColumn[];
    oneRelationColumns?: IApplicationRelationColumn[];
}
//# sourceMappingURL=applicationrelation.d.ts.map