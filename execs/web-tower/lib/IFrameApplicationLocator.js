import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { APPLICATION_LOCATOR, ApplicationLocator } from '@airport/landing';
export class IFrameApplicationLocator extends ApplicationLocator {
    async locateLatestApplicationVersionByApplicationName(applicationName, terminalStore) {
        let applicationVersion = terminalStore.getLatestApplicationVersionMapByApplicationName()
            .get(applicationName);
        if (applicationVersion) {
            return applicationVersion;
        }
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.getLatestApplicationVersionMapByApplicationName(applicationName);
    }
}
DI.set(APPLICATION_LOCATOR, IFrameApplicationLocator);
//# sourceMappingURL=IFrameApplicationLocator.js.map