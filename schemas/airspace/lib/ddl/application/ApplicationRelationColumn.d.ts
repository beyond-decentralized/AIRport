import { ApplicationColumn } from './ApplicationColumn';
import { ApplicationRelation } from './ApplicationRelation';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare type ApplicationRelationColumnId = number;
export declare class ApplicationRelationColumn extends VersionedApplicationObject {
    id: ApplicationRelationColumnId;
    manyColumn: ApplicationColumn;
    oneColumn: ApplicationColumn;
    manyRelation?: ApplicationRelation;
    oneRelation?: ApplicationRelation;
    parentRelation: ApplicationRelation;
}
//# sourceMappingURL=ApplicationRelationColumn.d.ts.map