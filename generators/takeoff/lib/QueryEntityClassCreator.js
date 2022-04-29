import { orderApplicationsInOrderOfPrecedence, setQApplicationEntities } from '@airport/air-control';
export class QueryEntityClassCreator {
    createAll(applications) {
        const applicationsToCreate = orderApplicationsInOrderOfPrecedence(applications);
        applicationsToCreate.map(dbApplication => this.create(dbApplication));
    }
    create(dbApplication) {
        let qApplication = this.airportDatabase.QM[dbApplication.fullName];
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
            this.airportDatabase.QM[dbApplication.fullName] = qApplication;
        }
        this.airportDatabase.Q[dbApplication.index] = qApplication;
        setQApplicationEntities(dbApplication, qApplication, this.airportDatabase.qApplications);
        return qApplication;
    }
}
//# sourceMappingURL=QueryEntityClassCreator.js.map