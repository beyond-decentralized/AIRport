/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */
import { INTERNAL_DOMAIN } from "@airport/ground-control";
import { BehaviorSubject } from "rxjs";
export const internalTerminalState = new BehaviorSubject({
    applicationActors: [],
    applicationInitializer: {
        applicationWindowMap: new Map(),
        initializingApplicationMap: new Map()
    },
    applications: [],
    domains: [],
    frameworkActor: null,
    internalConnector: {
        dbName: '',
        internalCredentials: {
            application: null,
            domain: INTERNAL_DOMAIN,
            methodName: null,
            objectName: null
        },
        serverUrl: ''
    },
    lastIds: {
        columns: 0,
        domains: 0,
        entities: 0,
        properties: 0,
        propertyColumns: 0,
        relations: 0,
        relationColumns: 0,
        applications: 0,
        applicationVersions: 0
    },
    receiver: {
        initializedApps: new Set(),
        initializingApps: new Set(),
    },
    sequenceGenerator: {
        sequences: [],
        sequenceBlocks: [],
        generatingSequenceNumbers: false
    },
    terminal: null,
    transactionManager: {
        pendingTransactionQueue: [],
        rootTransactionInProgressMap: new Map(),
        transactionInProgressMap: new Map()
    },
    webReceiver: {
        domainPrefix: '',
        localDomain: '',
        mainDomainFragments: [],
        onClientMessageCallback: null,
        pendingApplicationCounts: new Map(),
        pendingHostCounts: new Map(),
        pendingInterAppApiCallMessageMap: new Map(),
        subsriptionMap: new Map()
    }
});
//# sourceMappingURL=theState.js.map