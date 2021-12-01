import { AIRPORT_DATABASE } from '@airport/air-control';
import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { container, DI } from '@airport/di';
import { getApplicationName } from '@airport/ground-control';
import { DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER } from '@airport/takeoff';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { APPLICATION_BUILDER, APPLICATION_CHECKER, APPLICATION_COMPOSER, APPLICATION_INITIALIZER, APPLICATION_LOCATOR, APPLICATION_RECORDER } from './tokens';
export class ApplicationInitializer {
    addNewApplicationVersionsToAll(ddlObjects) {
        for (const applicationVersion of ddlObjects.added.applicationVersions) {
            ddlObjects.allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
        }
    }
    async hydrate(jsonApplications, context) {
        const [airDb, queryObjectInitializer, sequenceGenerator] = await this.stage(jsonApplications, context);
        // Hydrate all DDL objects and Sequences
        const ddlObjects = await queryObjectInitializer.initialize(airDb);
        this.addNewApplicationVersionsToAll(ddlObjects);
        this.setAirDbApplications(airDb, ddlObjects);
        await sequenceGenerator.initialize();
    }
    /*
     * Initialization scenarios:
     *
     * Brand new install - initialize BLUEPRINT applications
     * Install new App - initialize New application (and any new dependency applications)
     * Reload existing install - hydrate all applications
     * Reload exiting App - nothing to do
     */
    async initialize(jsonApplications, existingApplicationMap, context, checkDependencies) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, applicationBuilder, applicationComposer, applicationLocator, applicationRecorder, sequenceGenerator, terminalStore] = await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, APPLICATION_BUILDER, APPLICATION_COMPOSER, APPLICATION_LOCATOR, APPLICATION_RECORDER, SEQUENCE_GENERATOR, TERMINAL_STORE);
        const applicationsWithValidDependencies = await this.
            getApplicationsWithValidDependencies(jsonApplications, checkDependencies);
        const newJsonApplicationMap = new Map();
        for (const jsonApplication of jsonApplications) {
            newJsonApplicationMap.set(getApplicationName(jsonApplication), jsonApplication);
        }
        for (const jsonApplication of applicationsWithValidDependencies) {
            await applicationBuilder.build(jsonApplication, existingApplicationMap, newJsonApplicationMap, context);
        }
        const allDdlObjects = await applicationComposer.compose(applicationsWithValidDependencies, ddlObjectRetriever, applicationLocator, terminalStore);
        this.addNewApplicationVersionsToAll(allDdlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(allDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbApplications(airDb, allDdlObjects);
        const newSequences = await applicationBuilder.buildAllSequences(applicationsWithValidDependencies, context);
        await sequenceGenerator.initialize(newSequences);
        await applicationRecorder.record(allDdlObjects.added, context);
    }
    async initializeForAIRportApp(jsonApplication) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, applicationComposer, applicationLocator, terminalStore] = await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, APPLICATION_COMPOSER, APPLICATION_LOCATOR, TERMINAL_STORE);
        const applicationsWithValidDependencies = await this.
            getApplicationsWithValidDependencies([jsonApplication], false);
        const ddlObjects = await applicationComposer.compose(applicationsWithValidDependencies, ddlObjectRetriever, applicationLocator, terminalStore);
        this.addNewApplicationVersionsToAll(ddlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbApplications(airDb, ddlObjects);
    }
    async stage(jsonApplications, context) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, applicationBuilder, applicationComposer, applicationLocator, sequenceGenerator, terminalStore] = await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, APPLICATION_BUILDER, APPLICATION_COMPOSER, APPLICATION_LOCATOR, SEQUENCE_GENERATOR, TERMINAL_STORE);
        // Temporarily Initialize application DDL objects and Sequences to allow for normal hydration
        const tempDdlObjects = await applicationComposer.compose(jsonApplications, ddlObjectRetriever, applicationLocator, terminalStore);
        this.addNewApplicationVersionsToAll(tempDdlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(tempDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbApplications(airDb, tempDdlObjects);
        const newSequences = await applicationBuilder.stageSequences(jsonApplications, airDb, context);
        await sequenceGenerator.tempInitialize(newSequences);
        return [airDb, queryObjectInitializer, sequenceGenerator];
    }
    async getApplicationsWithValidDependencies(jsonApplications, checkDependencies) {
        const [applicationChecker, applicationLocator, terminalStore] = await container(this).get(APPLICATION_CHECKER, APPLICATION_LOCATOR, TERMINAL_STORE);
        const jsonApplicationsToInstall = [];
        for (const jsonApplication of jsonApplications) {
            await applicationChecker.check(jsonApplication);
            const existingApplication = applicationLocator.locateExistingApplicationVersionRecord(jsonApplication, terminalStore);
            if (existingApplication) {
                // Nothing needs to be done, we already have this application version
                continue;
            }
            jsonApplicationsToInstall.push(jsonApplication);
        }
        let applicationsWithValidDependencies;
        if (checkDependencies) {
            const applicationReferenceCheckResults = await applicationChecker
                .checkDependencies(jsonApplicationsToInstall);
            if (applicationReferenceCheckResults.neededDependencies.length
                || applicationReferenceCheckResults.applicationsInNeedOfAdditionalDependencies.length) {
                throw new Error(`Installing applications with external dependencies
			is not currently supported.`);
            }
            applicationsWithValidDependencies = applicationReferenceCheckResults.applicationsWithValidDependencies;
        }
        else {
            applicationsWithValidDependencies = jsonApplicationsToInstall;
        }
        return applicationsWithValidDependencies;
    }
    setAirDbApplications(airDb, ddlObjects) {
        for (let application of ddlObjects.all.applications) {
            airDb.applications[application.index] = application;
        }
    }
}
DI.set(APPLICATION_INITIALIZER, ApplicationInitializer);
//# sourceMappingURL=ApplicationInitializer.js.map