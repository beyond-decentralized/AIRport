import { ApplicationLocator } from '@airport/landing';
export class IFrameApplicationLocator extends ApplicationLocator {
    async locateLatestApplicationVersionByApplicationName(fullApplicationName, terminalStore) {
        let applicationVersion = terminalStore
            .getLatestApplicationVersionMapByFullApplicationName()
            .get(fullApplicationName);
        if (applicationVersion) {
            return applicationVersion;
        }
        return await this.transactionalConnector
            .getLatestApplicationVersionMapByFullApplicationName(fullApplicationName);
    }
}
//# sourceMappingURL=IFrameApplicationLocator.js.map