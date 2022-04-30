var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected, orderApplicationsInOrderOfPrecedence, setQApplicationEntities } from '@airport/air-control';
let QueryEntityClassCreator = class QueryEntityClassCreator {
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
};
__decorate([
    Inject()
], QueryEntityClassCreator.prototype, "airportDatabase", void 0);
QueryEntityClassCreator = __decorate([
    Injected()
], QueryEntityClassCreator);
export { QueryEntityClassCreator };
//# sourceMappingURL=QueryEntityClassCreator.js.map