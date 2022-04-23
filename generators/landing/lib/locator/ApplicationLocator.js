import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { getFullApplicationNameFromDomainAndName } from '@airport/ground-control';
import { APPLICATION_LOCATOR } from '../tokens';
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
DEPENDENCY_INJECTION.set(APPLICATION_LOCATOR, ApplicationLocator);
//# sourceMappingURL=ApplicationLocator.js.map