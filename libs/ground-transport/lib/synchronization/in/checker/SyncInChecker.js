export class SyncInChecker {
    /**
     * Check the message and load all required auxiliary entities.
     */
    async checkMessage(message) {
        // FIXME: replace as many DB lookups as possible with Terminal State lookups
        if (!await this.syncInUserChecker.ensureUsers(message)) {
            return false;
        }
        if (!await this.syncInTerminalChecker.ensureTerminals(message)) {
            return false;
        }
        if (!await this.syncInApplicationChecker.ensureApplications(message)) {
            return false;
        }
        if (!await this.syncInActorChecker.ensureActors(message)) {
            return false;
        }
        if (!await this.syncInRepositoryChecker.ensureRepositories(message)) {
            return false;
        }
        if (!await this.syncInApplicationVersionChecker.ensureApplicationVersions(message)) {
            return false;
        }
        if (!await this.syncInDataChecker.checkData(message)) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=SyncInChecker.js.map