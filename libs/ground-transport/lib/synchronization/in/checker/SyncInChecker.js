var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let SyncInChecker = class SyncInChecker {
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
};
__decorate([
    Inject()
], SyncInChecker.prototype, "syncInActorChecker", void 0);
__decorate([
    Inject()
], SyncInChecker.prototype, "syncInApplicationChecker", void 0);
__decorate([
    Inject()
], SyncInChecker.prototype, "syncInApplicationVersionChecker", void 0);
__decorate([
    Inject()
], SyncInChecker.prototype, "syncInDataChecker", void 0);
__decorate([
    Inject()
], SyncInChecker.prototype, "syncInRepositoryChecker", void 0);
__decorate([
    Inject()
], SyncInChecker.prototype, "syncInTerminalChecker", void 0);
__decorate([
    Inject()
], SyncInChecker.prototype, "syncInUserChecker", void 0);
SyncInChecker = __decorate([
    Injected()
], SyncInChecker);
export { SyncInChecker };
//# sourceMappingURL=SyncInChecker.js.map