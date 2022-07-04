import { Operation_LocalId, Operation_Name, Operation_Rule, Operation_Type } from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationOperation extends VersionedApplicationObject {
    _localId: Operation_LocalId;
    type: Operation_Type;
    entity: ApplicationEntity;
    name: Operation_Name;
    rule: Operation_Rule;
}
//# sourceMappingURL=ApplicationOperation.d.ts.map