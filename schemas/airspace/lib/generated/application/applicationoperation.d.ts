import { IVersionedApplicationObject } from './versionedapplicationobject';
import { Operation_Rule } from '@airport/ground-control';
import { IApplicationEntity } from './applicationentity';
export interface IApplicationOperation extends IVersionedApplicationObject {
    _localId: number;
    type?: number;
    name?: string;
    rule?: Operation_Rule;
    entity?: IApplicationEntity;
}
//# sourceMappingURL=applicationoperation.d.ts.map