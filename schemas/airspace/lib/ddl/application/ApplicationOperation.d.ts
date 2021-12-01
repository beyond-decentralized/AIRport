import { Operation_Id, Operation_Name, Operation_Rule, Operation_Type } from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationOperation extends VersionedApplicationObject {
    id: Operation_Id;
    type: Operation_Type;
    entity: ApplicationEntity;
    name: Operation_Name;
    rule: Operation_Rule;
}
//# sourceMappingURL=ApplicationOperation.d.ts.map