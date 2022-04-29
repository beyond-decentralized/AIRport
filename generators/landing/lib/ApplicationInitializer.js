import { getFullApplicationName } from '@airport/ground-control';
export class ApplicationInitializer {
    addNewApplicationVersionsToAll(ddlObjects) {
        for (const applicationVersion of ddlObjects.added.applicationVersions) {
            ddlObjects.allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
        }
    }
    async hydrate(jsonApplications, context) {
        await this.stage(jsonApplications, context);
        // Hydrate all DDL objects and Sequences
        const ddlObjects = await this.queryObjectInitializer.initialize();
        this.addNewApplicationVersionsToAll(ddlObjects);
        this.setAirDbApplications(ddlObjects);
        await this.sequenceGenerator.initialize();
    }
    /*
     * Initialization scenarios:
     *
     * Brand new install - initialize BLUEPRINT applications
     * Install new App - initialize New application (and any new dependency applications)
     * Reload existing install - hydrate all applications
     * Reload exiting App - nothing to do
     */
    async initialize(jsonApplications, context, checkDependencies, loadExistingApplications) {
        const applicationsWithValidDependencies = await this.
            getApplicationsWithValidDependencies(jsonApplications, checkDependencies);
        const existingApplicationMap = new Map();
        if (loadExistingApplications) {
            const applications = await this.applicationDao.findAllWithJson();
            for (const application of applications) {
                existingApplicationMap.set(application.fullName, application);
            }
        }
        const newJsonApplicationMap = new Map();
        for (const jsonApplication of jsonApplications) {
            const existingApplication = existingApplicationMap.get(getFullApplicationName(jsonApplication));
            if (existingApplication) {
                jsonApplication.lastIds = existingApplication.versions[0].jsonApplication.lastIds;
            }
            else {
                newJsonApplicationMap.set(getFullApplicationName(jsonApplication), jsonApplication);
            }
        }
        let checkedApplicationsWithValidDependencies = [];
        for (const jsonApplication of applicationsWithValidDependencies) {
            const existingApplication = existingApplicationMap.get(getFullApplicationName(jsonApplication));
            if (!existingApplication) {
                checkedApplicationsWithValidDependencies.push(jsonApplication);
                await this.applicationBuilder.build(jsonApplication, existingApplicationMap, newJsonApplicationMap, context);
            }
        }
        const allDdlObjects = await this.applicationComposer.compose(checkedApplicationsWithValidDependencies, {
            terminalStore: this.terminalStore
        });
        this.addNewApplicationVersionsToAll(allDdlObjects);
        this.queryObjectInitializer.generateQObjectsAndPopulateStore(allDdlObjects);
        this.setAirDbApplications(allDdlObjects);
        const newSequences = await this.applicationBuilder.buildAllSequences(applicationsWithValidDependencies, context);
        await this.sequenceGenerator.initialize(newSequences);
        await this.applicationRecorder.record(allDdlObjects.added, context);
    }
    async initializeForAIRportApp(jsonApplication) {
        const applicationsWithValidDependencies = await this.
            getApplicationsWithValidDependencies([jsonApplication], false);
        const ddlObjects = await this.applicationComposer.compose(applicationsWithValidDependencies, {
            deepTraverseReferences: true,
            terminalStore: this.terminalStore
        });
        this.addNewApplicationVersionsToAll(ddlObjects);
        this.queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects);
        this.setAirDbApplications(ddlObjects);
    }
    async stage(jsonApplications, context) {
        // Temporarily Initialize application DDL objects and Sequences to allow for normal hydration
        const tempDdlObjects = await this.applicationComposer.compose(jsonApplications, {
            terminalStore: this.terminalStore
        });
        this.addNewApplicationVersionsToAll(tempDdlObjects);
        this.queryObjectInitializer.generateQObjectsAndPopulateStore(tempDdlObjects);
        this.setAirDbApplications(tempDdlObjects);
        const newSequences = await this.applicationBuilder.stageSequences(jsonApplications, context);
        await this.sequenceGenerator.tempInitialize(newSequences);
    }
    async wait(milliseconds) {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }
    async getApplicationsWithValidDependencies(jsonApplications, checkDependencies) {
        const jsonApplicationsToInstall = [];
        for (const jsonApplication of jsonApplications) {
            await this.applicationChecker.check(jsonApplication);
            const existingApplication = this.applicationLocator.locateExistingApplicationVersionRecord(jsonApplication, this.terminalStore);
            if (existingApplication) {
                // Nothing needs to be done, we already have this application version
                continue;
            }
            jsonApplicationsToInstall.push(jsonApplication);
        }
        let applicationsWithValidDependencies;
        if (checkDependencies) {
            const applicationReferenceCheckResults = await this.applicationChecker
                .checkDependencies(jsonApplicationsToInstall);
            if (applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies.length) {
                // const
                for (let i = 0; i < applicationReferenceCheckResults.neededDependencies.length; i++) {
                    const neededDependency = applicationReferenceCheckResults.neededDependencies[i];
                    const fullApplicationName = getFullApplicationName(neededDependency);
                    await this.nativeInitializeApplication(neededDependency.domain, neededDependency.name, fullApplicationName);
                }
            }
            applicationsWithValidDependencies = [
                ...applicationReferenceCheckResults.applicationsWithValidDependencies,
                ...applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies
            ];
        }
        else {
            applicationsWithValidDependencies = jsonApplicationsToInstall;
        }
        return applicationsWithValidDependencies;
    }
    setAirDbApplications(ddlObjects) {
        for (let application of ddlObjects.all.applications) {
            this.airportDatabase.applications[application.index] = application;
        }
    }
}
//# sourceMappingURL=ApplicationInitializer.js.map