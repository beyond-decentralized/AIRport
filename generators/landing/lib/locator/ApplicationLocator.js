import { DI } from '@airport/di';
import { getApplicationNameFromDomainAndName } from '@airport/ground-control';
import { APPLICATION_LOCATOR } from '../tokens';
export class ApplicationLocator {
    // private terminalStore: ITerminalStore
    locateExistingApplicationVersionRecord(jsonApplication, terminalStore) {
        const applicationVersionsForDomainName = terminalStore
            .getLatestApplicationVersionMapByNames().get(jsonApplication.domain);
        if (!applicationVersionsForDomainName) {
            return null;
        }
        const applicationName = getApplicationNameFromDomainAndName(jsonApplication.domain, jsonApplication.name);
        const latestApplicationVersionForApplication = applicationVersionsForDomainName.get(applicationName);
        const jsonApplicationVersion = jsonApplication.versions[0];
        if (latestApplicationVersionForApplication
            && latestApplicationVersionForApplication.integerVersion !== jsonApplicationVersion.integerVersion) {
            throw new Error(`Multiple versions of applications are not yet supported`);
        }
        return latestApplicationVersionForApplication;
    }
    async locateLatestApplicationVersionByApplicationName(applicationName, terminalStore) {
        return terminalStore.getLatestApplicationVersionMapByApplicationName()
            .get(applicationName);
    }
}
DI.set(APPLICATION_LOCATOR, ApplicationLocator);
//# sourceMappingURL=ApplicationLocator.js.map