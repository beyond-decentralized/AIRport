import { ApplicationColumn } from './ApplicationColumn';
import { ApplicationRelation } from './ApplicationRelation';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare type ApplicationRelationColumn_LocalId = number;
export declare class ApplicationRelationColumn extends VersionedApplicationObject {
    _localId: ApplicationRelationColumn_LocalId;
    manyColumn: ApplicationColumn;
    oneColumn: ApplicationColumn;
    manyRelation?: ApplicationRelation;
    oneRelation?: ApplicationRelation;
    parentRelation: ApplicationRelation;
}
//# sourceMappingURL=ApplicationRelationColumn.d.ts.map