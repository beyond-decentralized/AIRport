/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */

import {
    BehaviorSubject
} from "rxjs";
import { ITerminalState } from "./TerminalState";

globalThis.internalTerminalState = new BehaviorSubject<ITerminalState>({
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
        apiClasses: 0,
        apiOperations: 0,
        apiParameters: 0,
        apiReturnTypes: 0,
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
    ui: {
        currentUrl: ''
    },
    webReceiver: {
        domainPrefix: '',
        localDomain: '',
        mainDomainFragments: [],
        pendingInterAppApiCallMessageMap: new Map(),
        subscriptionMap: new Map()
    }
})
