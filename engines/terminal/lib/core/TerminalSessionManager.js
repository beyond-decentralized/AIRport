var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let TerminalSessionManager = class TerminalSessionManager {
    async signUp(userAccount) {
        const allSessions = this.userStore.getAllSessions();
        let session = {
            currentActor: null,
            userAccount
        };
        allSessions.push(session);
        const sessionMapByEmail = this.userStore.getSessionMapByEmail();
        sessionMapByEmail.set(userAccount.email, session);
        this.userStore.state.next({
            allSessions,
            sessionMapByEmail
        });
    }
    async login(userAccount) {
        throw new Error(`Implement`);
    }
    async getUserSession(
    // FIXME: add the actual request object, may be platform specific
    requestObject) {
        let session;
        if (this.terminalStore.getIsServer()) {
            throw new Error(`Implement`);
        }
        else {
            const allSessions = this.userStore.getAllSessions();
            if (allSessions.length != 1) {
                throw new Error(`Expecting exactly 1 user session`);
            }
            session = allSessions[0];
        }
        return session;
    }
};
__decorate([
    Inject()
], TerminalSessionManager.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], TerminalSessionManager.prototype, "userStore", void 0);
TerminalSessionManager = __decorate([
    Injected()
], TerminalSessionManager);
export { TerminalSessionManager };
//# sourceMappingURL=TerminalSessionManager.js.map