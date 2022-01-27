import { DomainName, ApplicationName, ApplicationVersionId } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
import { IApplication, IApplicationVersion } from '@airport/traffic-pattern';
import { IDataToTM } from '../SyncInUtils';
export interface ApplicationCheckResults {
    dataMessagesWithCompatibleApplications: IDataToTM[];
    dataMessagesWithIncompatibleApplications: IDataToTM[];
    dataMessagesWithInvalidApplications: IDataToTM[];
    dataMessagesToBeUpgraded: IDataToTM[];
    maxVersionedMapByApplicationAndDomainNames: Map<DomainName, Map<ApplicationName, IApplicationVersion>>;
    requiredApplicationVersionIds: Set<ApplicationVersionId>;
    applicationsWithChangesMap: Map<DomainName, Map<ApplicationName, IApplication>>;
}
export interface DataMessageApplicationGroupings {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleApplications: IDataToTM[];
    dataMessagesWithIncompatibleApplications: IDataToTM[];
    missingDomainMap: Map<DomainName, IDomain>;
    missingApplicationMap: Map<DomainName, Map<ApplicationName, IApplication>>;
    requiredApplicationVersionIds: Set<ApplicationVersionId>;
    applicationsToBeUpgradedMap: Map<DomainName, Map<ApplicationName, IApplication>>;
}
export interface ISyncInApplicationChecker {
    checkApplications(dataMessages: IDataToTM[]): Promise<ApplicationCheckResults>;
}
export declare class SyncInApplicationChecker implements ISyncInApplicationChecker {
    checkApplications(dataMessages: IDataToTM[]): Promise<ApplicationCheckResults>;
    private groupMessagesAndApplicationsByApplicationState;
    private verifyRTBApplicationConsistency;
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
    private recordApplicationsToBeAddedAndUpgraded;
    private compareApplicationVersions;
    private compareGivenApplicationVersionLevel;
}
//# sourceMappingURL=SyncInSchemaChecker.d.ts.map