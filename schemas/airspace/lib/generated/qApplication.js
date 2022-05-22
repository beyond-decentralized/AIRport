import { airApi } from '@airport/aviation-communication';
import { Application, ApplicationColumn, ApplicationCurrentVersion, ApplicationEntity, ApplicationOperation, ApplicationProperty, ApplicationPropertyColumn, ApplicationReference, ApplicationRelation, ApplicationRelationColumn, ApplicationVersion, Domain, VersionedApplicationObject } from '../ddl/ddl';
const __constructors__ = {
    Application: Application,
    ApplicationColumn: ApplicationColumn,
    ApplicationCurrentVersion: ApplicationCurrentVersion,
    ApplicationEntity: ApplicationEntity,
    ApplicationOperation: ApplicationOperation,
    ApplicationProperty: ApplicationProperty,
    ApplicationPropertyColumn: ApplicationPropertyColumn,
    ApplicationReference: ApplicationReference,
    ApplicationRelation: ApplicationRelation,
    ApplicationRelationColumn: ApplicationRelationColumn,
    ApplicationVersion: ApplicationVersion,
    Domain: Domain,
    VersionedApplicationObject: VersionedApplicationObject
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/airspace'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return airApi.dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return airApi.ddS(Q.__dbApplication__, dbEntityId);
}
airApi.setQApplication(Q_APPLICATION);
//# sourceMappingURL=qApplication.js.map