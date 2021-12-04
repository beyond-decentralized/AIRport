import { AIRPORT_DATABASE } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { getApplicationName, STORE_DRIVER, } from '@airport/ground-control';
import { Actor, } from '@airport/holding-pattern';
import { APPLICATION_INITIALIZER } from '@airport/landing';
import { APPLICATION_DAO } from '@airport/airspace';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
import { DATABASE_MANAGER, INTERNAL_RECORD_MANAGER } from '../tokens';
import { BLUEPRINT } from '@airport/blueprint';
export class DatabaseManager {
    constructor() {
        this.initialized = false;
    }
    // constructor() {
    // }
    async initNoDb(context, ...applications) {
        await container(this).get(AIRPORT_DATABASE);
        const server = await container(this).get(TRANSACTIONAL_SERVER);
        server.tempActor = new Actor();
        await this.installStarterApplication(true, false, context);
        const applicationInitializer = await container(this).get(APPLICATION_INITIALIZER);
        await applicationInitializer.stage(applications, context);
        server.tempActor = null;
        this.initialized = true;
    }
    async initWithDb(domainName, context) {
        await container(this).get(AIRPORT_DATABASE);
        const storeDriver = await container(this).get(STORE_DRIVER);
        /*
                await storeDriver.dropTable('air__airport_code', 'SEQUENCES')
                await storeDriver.dropTable('air__airport_code', 'TERMINAL_RUNS')
                await storeDriver.dropTable('air__holding_pattern', 'ACTOR_APPLICATION')
                await storeDriver.dropTable('air__holding_pattern', 'Actor')
                await storeDriver.dropTable('air__holding_pattern', 'Application')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_ACTORS')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_APPLICATION')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_OPERATION_HISTORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY_NEW_VALUES')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_RECORD_HISTORY_OLD_VALUES')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_APPLICATIONS')
                await storeDriver.dropTable('air__holding_pattern', 'REPOSITORY_TRANSACTION_HISTORY')
                await storeDriver.dropTable('air__holding_pattern', 'REPO_TRANS_HISTORY_CHANGED_REPOSITORY_ACTORS')
                await storeDriver.dropTable('air__holding_pattern', 'TRANSACTION_HISTORY')
                await storeDriver.dropTable('air__territory', 'APPLICATIONS')
                await storeDriver.dropTable('air__territory', 'APPLICATION_PACKAGES')
                await storeDriver.dropTable('air__territory', 'DOMAINS')
                await storeDriver.dropTable('air__territory', 'PACKAGED_UNITS')
                await storeDriver.dropTable('air__territory', 'PACKAGES')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATIONS')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_COLUMNS')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_ENTITIES')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_PROPERTIES')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_PROPERTY_COLUMNS')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_REFERENCES')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_RELATIONS')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_RELATION_COLUMNS')
                await storeDriver.dropTable('air__traffic_pattern', 'APPLICATION_VERSIONS')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'Agt')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'TERMINAL_AGTS')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'Terminal')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'USER_TERMINAL')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'USER_TERMINAL_AGT')
                await storeDriver.dropTable('air__travel_document_checkpoint', 'User')
                */
        /*
                await storeDriver.dropTable('votecube_com__ecclesia', 'CONTINENTS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'COUNTIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'COUNTRIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'FACTORS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'FACTOR_POSITIONS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'LABELS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLLS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_CONTINENTS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_COUNTIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_COUNTRIES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_FACTOR_POSITIONS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_LABELS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_STATES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_TOWNS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POLL_TYPES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'POSITIONS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'STATES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'THEMES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'TOWNS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'VOTES')
                await storeDriver.dropTable('votecube_com__ecclesia', 'VOTE_FACTORS')
                await storeDriver.dropTable('votecube_com__ecclesia', 'VOTE_FACTOR_TYPES')
        */
        const server = await container(this).get(TRANSACTIONAL_SERVER);
        server.tempActor = new Actor();
        const hydrate = await storeDriver.doesTableExist(getApplicationName(BLUEPRINT[0]), 'PACKAGES', context);
        await this.installStarterApplication(false, hydrate, context);
        if (!hydrate) {
            const internalRecordManager = await container(this)
                .get(INTERNAL_RECORD_MANAGER);
            await internalRecordManager.initTerminal(domainName, context);
        }
        server.tempActor = null;
        this.initialized = true;
    }
    isInitialized() {
        return this.initialized;
    }
    async initFeatureApplications(context, jsonApplications) {
        const applicationDao = await container(this).get(APPLICATION_DAO);
        const applications = await applicationDao.findAllWithJson();
        const existingApplicationMap = new Map();
        for (const application of applications) {
            existingApplicationMap.set(application.name, application);
        }
        // const candidateApplicationDomainNames: DomainName[] = []
        // const candidateApplicationNames: ApplicationName[] = []
        // for (const jsonApplication of jsonApplications) {
        // 	 candidateApplicationDomainNames.push(jsonApplication.domain)
        // 	 candidateApplicationNames.push(getApplicationName(jsonApplication))
        // }
        // FIXME: this search should be done by application signature
        // const maxVersionedMapByApplicationAndDomainNames = await applicationDao.findMaxVersionedMapByApplicationAndDomainNames(
        // 	candidateApplicationDomainNames, candidateApplicationNames)
        // const lastIdsByDomainAndApplicationNames = new Map()
        // const applicationNames: ApplicationName[] = [];
        // for (const jsonApplication of jsonApplications) {
        // 	const applicationName = getApplicationName(jsonApplication)
        // FIXME: right now Non-Entity Tree queries don't work, fix them and figure out
        // what needs to be done here
        // const applicationMapForDomain = maxVersionedMapByApplicationAndDomainNames.get(jsonApplication.domain)
        // if (!applicationMapForDomain) {
        // 	applicationNames.push(applicationName)
        // } else {
        // 	const applicationLookupRecord = applicationMapForDomain.get(applicationName)
        // 	if (applicationLookupRecord) {
        // 	} else {
        // applicationNames.push(applicationName)
        // }
        // }	
        // }
        const applicationsToCreate = [];
        for (const jsonApplication of jsonApplications) {
            const existingApplication = existingApplicationMap.get(getApplicationName(jsonApplication));
            if (existingApplication) {
                jsonApplication.lastIds = existingApplication.versions[0].jsonApplication.lastIds;
            }
            else {
                applicationsToCreate.push(jsonApplication);
            }
        }
        // if (applicationsToCreate.length) {
        const [applicationInitializer, server] = await container(this)
            .get(APPLICATION_INITIALIZER, TRANSACTIONAL_SERVER);
        server.tempActor = new Actor();
        // await applicationInitializer.initialize(applicationsToCreate, context, existingApplicationsAreHydrated);
        await applicationInitializer.initialize(applicationsToCreate, existingApplicationMap, context, true);
        // }
        server.tempActor = null;
    }
    /*
    static async addDataStore(
        storeType: StoreType,
        terminalName: string
    ): Promise<void> {
        if (this.isInitialized(terminalName)) {
            throw new Error(
            `Database '${terminalName}' is already initialized`);
        }
        const newDataStore = await QDataStore.db(dbConst.DEFAULT_DB).save({
            name: terminalName,
            storeType: storeType
        });
        await TQ.init(storeType, terminalName);
    }

    private doEnsureInitialized(
        terminalName: string,
        resolve,
        reject,
        remainingTimeout: number
    ): void {
        if (this.isInitialized(terminalName)) {
            resolve()
        }
        if (remainingTimeout <= 0) {
            reject(`Timeout out waiting for initialization of DB: [${terminalName}]`)
        }
        remainingTimeout -= 100
        setTimeout(() => {
            this.doEnsureInitialized(terminalName, resolve, reject, remainingTimeout)
        }, 100)
    }
    */
    async installStarterApplication(stage, hydrate, context) {
        const blueprintFile = await import('@airport/blueprint');
        const applicationInitializer = await container(this).get(APPLICATION_INITIALIZER);
        if (stage) {
            await applicationInitializer.stage(blueprintFile.BLUEPRINT, context);
        }
        else if (hydrate) {
            await applicationInitializer.hydrate(blueprintFile.BLUEPRINT, context);
            // Below appears to be not needed - hydrate gets all applications
            // const applicationDao = await container(this).get(APPLICATION_DAO)
            // const applications = await applicationDao.findAll()
            // const jsonApplicationNameSet: Set<string> = new Set()
            // blueprintFile.BLUEPRINT
            // 	.map(jsonApplication => getApplicationName(jsonApplication))
            // 	// schemname contains both domain and application's actual name
            // 	.forEach(applicationName => {
            // 		jsonApplicationNameSet.add(applicationName)
            // 	})
            // const jsonApplications = applications.filter(application => !jsonApplicationNameSet.has(application.name))
            // 	.map(application => application.jsonApplication)
            // await applicationInitializer.hydrate(jsonApplications as any, context);
        }
        else {
            await applicationInitializer.initialize(blueprintFile.BLUEPRINT, new Map(), context, false);
        }
    }
}
DI.set(DATABASE_MANAGER, DatabaseManager);
//# sourceMappingURL=DatabaseManager.js.map