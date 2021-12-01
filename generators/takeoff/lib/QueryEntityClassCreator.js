import { orderApplicationsInOrderOfPrecedence, setQApplicationEntities } from '@airport/air-control';
import { DI } from '@airport/di';
import { QUERY_ENTITY_CLASS_CREATOR } from './tokens';
export class QueryEntityClassCreator {
    createAll(applications, airDb) {
        const applicationsToCreate = orderApplicationsInOrderOfPrecedence(applications);
        applicationsToCreate.map(dbApplication => this.create(dbApplication, airDb));
    }
    create(dbApplication, airDb) {
        let qApplication = airDb.QM[dbApplication.name];
        // If the Application API source has already been loaded
        if (qApplication) {
            qApplication.__dbApplication__ = dbApplication;
        }
        else {
            qApplication = {
                __constructors__: {},
                __qConstructors__: {},
                __dbApplication__: dbApplication,
                name: dbApplication.name,
                domain: dbApplication.domain.name
            };
            airDb.QM[dbApplication.name] = qApplication;
        }
        airDb.Q[dbApplication.index] = qApplication;
        setQApplicationEntities(dbApplication, qApplication, airDb.qApplications);
        return qApplication;
    }
}
DI.set(QUERY_ENTITY_CLASS_CREATOR, QueryEntityClassCreator);
//# sourceMappingURL=QueryEntityClassCreator.js.map