/**
 * For logic classes to be hot-swappable for quick upgrades all state is contained
 * in one non-reloadable BehaviorSubject.
 */

import { INTERNAL_DOMAIN } from "@airport/ground-control";
import {
    BehaviorSubject,
    Subject
} from "rxjs";
import { ITerminalState } from "./TerminalState";

export const internalTerminalState: Subject<ITerminalState> = new BehaviorSubject({
    applicationActors: [],
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
    receiver: {
        initializedApps: new Set(),
        initializingApps: new Set(),
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
})