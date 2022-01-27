import { container, DI } from '@airport/di';
import { ensureChildJsMap, ApplicationStatus } from '@airport/ground-control';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { DOMAIN_DAO } from '@airport/territory';
import { SCHEMA_DAO, SCHEMA_VERSION_DAO } from '@airport/traffic-pattern';
import { parse } from 'zipson/lib';
import { SYNC_IN_SCHEMA_CHECKER } from '../../../tokens';
import { ApplicationComparisonResult } from '../SyncInUtils';
export class SyncInApplicationChecker {
    async checkApplications(dataMessages) {
        // TODO: remove unused dependencies once tested
        const [domainDao, applicationDao, applicationVersionDao, terminalStore] = await container(this).get(DOMAIN_DAO, SCHEMA_DAO, SCHEMA_VERSION_DAO, TERMINAL_STORE);
        const applicationNameSet = new Set();
        const applicationDomainNameSet = new Set();
        const dataMessagesWithInvalidApplications = [];
        // Build application name and domainName sets
        for (const message of dataMessages) {
            message.data = parse(message.data);
            if (!this.verifyRTBApplicationConsistency(message)) {
                dataMessagesWithInvalidApplications.push(message);
                continue;
            }
            for (const applicationVersion of message.data.applicationVersions) {
                applicationDomainNameSet.add(applicationVersion.application.domain.name);
                applicationNameSet.add(applicationVersion.application.name);
            }
        }
        const domainNames = Array.from(applicationDomainNameSet);
        // const domainMapByName = await this.domainDao.findMapByNameWithNames(domainNames);
        // const foundDomainNames = Array.from(domainMapByName.keys());
        const maxVersionedMapByApplicationAndDomainNames = terminalStore.getLatestApplicationVersionMapByNames();
        // 	// new Map();
        // 	// if (foundDomainNames.length) {
        // 	// 	maxVersionedMapByApplicationAndDomainNames =
        // FIXME: look applications by signature
        // PREVIOUS SOLUTION: use the store terminalStore.getLatestApplicationVersionMapByApplicationName
        // 	await this.applicationVersionDao.findMaxVersionedMapByApplicationAndDomainNames(
        // 		Array.from(applicationDomainNameSet), Array.from(applicationNameSet)
        // 	)
        // // }
        const { dataMessagesWithCompatibleApplications, dataMessagesWithIncompatibleApplications, dataMessagesToBeUpgraded, missingDomainMap, missingApplicationMap, 
        // repoTransBlockMissingApplications,
        // repoTransBlockApplicationsToBeUpgraded,
        requiredApplicationVersionIds, 
        // applicationsToBeUpgradedMap,
        applicationsToBeUpgradedMap } = this.groupMessagesAndApplicationsByApplicationState(dataMessages, maxVersionedMapByApplicationAndDomainNames);
        const applicationsWithChangesMap = await this.recordApplicationsToBeAddedAndUpgraded(applicationsToBeUpgradedMap, missingDomainMap, missingApplicationMap, domainDao, applicationDao);
        // const applicationsWithChangesMap
        // 	= this.mergeApplicationMaps(missingApplicationMap, applicationsToBeUpgradedMap);
        // const allApplicationMap
        // 	= this.mergeApplicationMaps(maxVersionedMapByApplicationAndDomainNames,
        // applicationsWithChangesMap);
        return {
            dataMessagesToBeUpgraded,
            dataMessagesWithCompatibleApplications,
            dataMessagesWithIncompatibleApplications,
            dataMessagesWithInvalidApplications,
            maxVersionedMapByApplicationAndDomainNames,
            requiredApplicationVersionIds,
            applicationsWithChangesMap
        };
    }
    groupMessagesAndApplicationsByApplicationState(dataMessages, maxVersionedMapByApplicationAndDomainNames) {
        const requiredApplicationVersionIds = new Set();
        const dataMessagesWithIncompatibleApplications = [];
        const dataMessagesWithCompatibleApplications = [];
        const applicationsToBeUpgradedMap = new Map();
        const missingDomainMap = new Map();
        const missingApplicationMap = new Map();
        const dataMessagesToBeUpgraded = [];
        // split messages by the status of the applications in them
        for (const message of dataMessages) {
            let allMessageApplicationsAreCompatible = true;
            let messageBuildWithOutdatedApplicationVersions = false;
            // for every application (at a given version) used in the message
            for (const applicationVersion of message.data.applicationVersions) {
                const application = applicationVersion.application;
                const domain = application.domain;
                const maxVersionedMapByApplicationName = maxVersionedMapByApplicationAndDomainNames.get(domain.name);
                // If the domain of the message application is not present in this TM
                if (!maxVersionedMapByApplicationName) {
                    const missingDomain = {
                        name: domain.name
                    };
                    missingDomainMap.set(domain.name, missingDomain);
                    ensureChildJsMap(missingApplicationMap, domain.name)
                        .set(application.name, {
                        domain: missingDomain,
                        name: application.name
                    });
                    allMessageApplicationsAreCompatible = false;
                    continue;
                }
                const maxApplicationVersion = maxVersionedMapByApplicationName.get(application.name);
                // If the application of the message is not present in this TM
                if (!maxApplicationVersion) {
                    ensureChildJsMap(missingApplicationMap, domain.name)
                        .set(application.name, {
                        domain: domain,
                        name: application.name
                    });
                    ensureChildJsMap(missingApplicationMap, application.domain.name)
                        .set(application.name, application);
                    allMessageApplicationsAreCompatible = false;
                    continue;
                }
                switch (this.compareApplicationVersions(applicationVersion, maxApplicationVersion)) {
                    case ApplicationComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER:
                        messageBuildWithOutdatedApplicationVersions = true;
                        break;
                    case ApplicationComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER:
                        ensureChildJsMap(applicationsToBeUpgradedMap, application.domain.name)
                            .set(application.name, application);
                        allMessageApplicationsAreCompatible = false;
                        break;
                    default:
                        requiredApplicationVersionIds.add(maxApplicationVersion.id);
                        break;
                }
            }
            if (!allMessageApplicationsAreCompatible) {
                dataMessagesWithIncompatibleApplications.push(message);
            }
            else if (messageBuildWithOutdatedApplicationVersions) {
                dataMessagesToBeUpgraded.push(message);
            }
            else {
                dataMessagesWithCompatibleApplications.push(message);
            }
        }
        return {
            dataMessagesToBeUpgraded,
            dataMessagesWithCompatibleApplications,
            dataMessagesWithIncompatibleApplications,
            missingDomainMap,
            missingApplicationMap,
            requiredApplicationVersionIds,
            applicationsToBeUpgradedMap
        };
    }
    verifyRTBApplicationConsistency(dataMessage) {
        const data = dataMessage.data;
        const domainMapByName = new Map();
        const domainMapById = new Map();
        for (const domain of data.domains) {
            if (domainMapByName.has(domain.name)) {
                return false;
            }
            if (domainMapById.has(domain.id)) {
                return false;
            }
            domainMapByName.set(domain.name, domain);
            domainMapById.set(domain.id, domain);
        }
        const applicationMapByIndex = new Map();
        const applicationMapByDomainIdAndName = new Map();
        for (const application of data.applications) {
            const domainId = application.domain.id;
            const applicationMapForDomainByName = applicationMapByDomainIdAndName.get(domainId);
            if (applicationMapForDomainByName
                && applicationMapForDomainByName.has(application.name)) {
                return false;
            }
            ensureChildJsMap(applicationMapByDomainIdAndName, domainId)
                .set(application.name, application);
            if (applicationMapByIndex.has(application.index)) {
                return false;
            }
            applicationMapByIndex.set(application.index, application);
            application.domain = domainMapById.get(domainId);
        }
        const applicationVersionMapById = new Map();
        const applicationVersionMapByApplicationIndexAndVersions = new Map();
        for (const applicationVersion of data.applicationVersions) {
            const applicationVersionIdAlreadyDefinedInRTB = applicationVersionMapById.has(applicationVersion.id);
            if (applicationVersionIdAlreadyDefinedInRTB) {
                return false;
            }
            applicationVersionMapById.set(applicationVersion.id, applicationVersion);
            const application = applicationVersion.application;
            const applicationVersionMapForApplicationIndexByVersions = applicationVersionMapByApplicationIndexAndVersions
                .get(application.index);
            if (applicationVersionMapForApplicationIndexByVersions) {
                const applicationVersionMapForMajorVersion = applicationVersionMapForApplicationIndexByVersions.get(applicationVersion.majorVersion);
                if (applicationVersionMapForMajorVersion) {
                    const applicationVersionMapForMinorVersion = applicationVersionMapForMajorVersion.get(applicationVersion.minorVersion);
                    if (applicationVersionMapForMinorVersion
                        && applicationVersionMapForMinorVersion.has(applicationVersion.patchVersion)) {
                        return false;
                    }
                }
            }
            ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(applicationVersionMapByApplicationIndexAndVersions, application.index), applicationVersion.majorVersion), applicationVersion.minorVersion).set(applicationVersion.patchVersion, applicationVersion);
            applicationVersion.application = applicationMapByIndex.get(application.index);
        }
        return true;
    }
    /**
     * Record which applications will have to be added to this TM or upgraded to a later version.
     *
     * Applications to be upgraded change status to NEEDS_UPGRADES.  New records are created for
     * missing applications.
     *
     * @param {Map<ApplicationDomainName, Map<ApplicationName, IApplication>>} applicationsToBeUpgradedMap
     * @param {Map<ApplicationDomainName, Set<ApplicationName>>} missingApplicationNameMap
     * @returns {Promise<void>}
     */
    async recordApplicationsToBeAddedAndUpgraded(applicationsToBeUpgradedMap, missingDomainMap, missingApplicationMap, domainDao, applicationDao) {
        const applicationWithChangesMap = new Map();
        // All local (TM) indexes of applications that need to be upgraded
        const applicationIndexesToUpdateStatusBy = [];
        for (const applicationMapByName of applicationsToBeUpgradedMap.values()) {
            for (const application of applicationMapByName.values()) {
                applicationIndexesToUpdateStatusBy.push(application.index);
            }
        }
        await (await applicationDao).setStatusByIndexes(applicationIndexesToUpdateStatusBy, ApplicationStatus.NEEDS_UPGRADES);
        // All applications needed (that do not yet exist in this TM)
        const newlyNeededApplications = [];
        for (const [domainName, applicationMapForDomain] of missingApplicationMap) {
            const applicationDomainWithChangesMap = ensureChildJsMap(applicationWithChangesMap, domainName);
            for (const [applicationName, missingApplication] of applicationMapForDomain) {
                const application = {
                    domain: missingApplication.domain,
                    name: applicationName,
                    status: ApplicationStatus.MISSING
                };
                applicationDomainWithChangesMap.set(name, application);
                newlyNeededApplications.push(application);
            }
        }
        await (await domainDao).bulkCreate(Array.from(missingDomainMap.values()), false);
        await (await applicationDao).bulkCreate(newlyNeededApplications, false);
        return applicationWithChangesMap;
    }
    /*
        private mergeApplicationMaps(
            applicationMap1: Map<DomainName, Map<ApplicationName, IApplication>>,
            applicationMap2: Map<DomainName, Map<ApplicationName, IApplication>>
        ): Map<DomainName, Map<ApplicationName, IApplication>> {
            const mergedApplicationMap: Map<DomainName, Map<ApplicationName, IApplication>> = new Map()

            this.copyApplicationMap(applicationMap1, mergedApplicationMap)
            this.copyApplicationMap(applicationMap2, mergedApplicationMap)

            return mergedApplicationMap
        }

        private copyApplicationMap(
            sourceMap: Map<DomainName, Map<ApplicationName, IApplication>>,
            targetMap: Map<DomainName, Map<ApplicationName, IApplication>>
        ): void {
            for (const [applicationDomainName, applicationMapByName] of sourceMap) {
                const targetApplicationMapByName = ensureChildJsMap(targetMap, applicationDomainName)
                for (const [applicationName, application] of applicationMapByName) {
                    targetApplicationMapByName.set(applicationName, application)
                }
            }
        }
        */
    compareApplicationVersions(messageApplicationVersion, maxApplicationVersion) {
        return this.compareGivenApplicationVersionLevel(messageApplicationVersion.integerVersion, maxApplicationVersion.integerVersion);
        // const majorVersionComparison = this.compareGivenApplicationVersionLevel(
        // 	messageApplicationVersion.majorVersion, maxApplicationVersion.majorVersion
        // )
        // if (majorVersionComparison) {
        // 	return majorVersionComparison
        // }
        //
        // const minorVersionComparison = this.compareGivenApplicationVersionLevel(
        // 	messageApplicationVersion.minorVersion, maxApplicationVersion.minorVersion
        // )
        // if (minorVersionComparison) {
        // 	return minorVersionComparison
        // }
        //
        // return this.compareGivenApplicationVersionLevel(
        // 	messageApplicationVersion.patchVersion, maxApplicationVersion.patchVersion
        // )
    }
    compareGivenApplicationVersionLevel(messageApplicationVersion, localApplicationVersion) {
        if (messageApplicationVersion < localApplicationVersion) {
            return ApplicationComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER;
        }
        if (messageApplicationVersion > localApplicationVersion) {
            return ApplicationComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER;
        }
        return ApplicationComparisonResult.MESSAGE_SCHEMA_VERSION_IS_EQUAL;
    }
}
DI.set(SYNC_IN_SCHEMA_CHECKER, SyncInApplicationChecker);
//# sourceMappingURL=SyncInSchemaChecker.js.map