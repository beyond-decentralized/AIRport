import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
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
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((airportDatabase) => {
    airportDatabase.setQApplication(Q_APPLICATION);
});
//# sourceMappingURL=qApplication.js.map