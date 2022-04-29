import { getFullApplicationNameFromDomainAndName } from '@airport/ground-control';
export class ApplicationLocator {
    // private terminalStore: ITerminalStore
    locateExistingApplicationVersionRecord(jsonApplication, terminalStore) {
        const applicationVersionsForDomainName = terminalStore
            .getLatestApplicationVersionMapByNames().get(jsonApplication.domain);
        if (!applicationVersionsForDomainName) {
            return null;
        }
        const fullApplicationName = getFullApplicationNameFromDomainAndName(jsonApplication.domain, jsonApplication.name);
        const latestApplicationVersionForApplication = applicationVersionsForDomainName.get(fullApplicationName);
        const jsonApplicationVersion = jsonApplication.versions[0];
        if (latestApplicationVersionForApplication
            && latestApplicationVersionForApplication.integerVersion !== jsonApplicationVersion.integerVersion) {
            throw new Error(`Multiple versions of applications are not yet supported`);
        }
        return latestApplicationVersionForApplication;
    }
    async locateLatestApplicationVersionByApplicationName(fullApplicationName, terminalStore) {
        return terminalStore.getLatestApplicationVersionMapByFullApplicationName()
            .get(fullApplicationName);
    }
}
//# sourceMappingURL=ApplicationLocator.js.map