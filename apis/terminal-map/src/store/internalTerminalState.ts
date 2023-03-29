/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */

import {
    BehaviorSubject
} from "rxjs";

globalThis.internalTerminalState = new BehaviorSubject({
    apiSubscriptionMap: new Map(),
    applicationActors: [],
    applicationInitializer: {
        applicationWindowMap: new Map(),
        initializingApplicationMap: new Map()
    },
    applicationMapByFullName: new Map(),
    applications: [],
    domains: [],
    frameworkActor: null,
    internalConnector: {
        dbName: '',
        internalCredentials: {
            application: null,
            domain: null,
            methodName: null,
            objectName: null
        },
        serverUrl: ''
    },
    isServer: false,
    lastIds: {
        columns: 0,
        domains: 0,
        entities: 0,
        properties: 0,
        relations: 0,
        relationColumns: 0,
        applications: 0,
        applicationVersions: 0
    },
    queries: new Map(),
    receiver: {
        initializedApps: new Set(),
        initializingApps: new Set(),
    },
    repositoryGUIDMapByLocalIds: new Map(),
    repositoryLocalIdMapByGUIDs: new Map(),
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
        subscriptionMap: new Map()
    }
})
