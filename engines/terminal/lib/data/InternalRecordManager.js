var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Actor, } from "@airport/holding-pattern";
import { Terminal, User } from "@airport/travel-document-checkpoint-runtime";
import { v4 as uuidv4 } from "uuid";
import { Inject, Injected } from '@airport/direction-indicator';
let InternalRecordManager = class InternalRecordManager {
    async ensureApplicationRecords(application, context) {
        await this.transactionManager.transactInternal(async (_transaction) => {
            await this.updateDomain(application);
            let actorMapForDomain = this.terminalStore
                .getApplicationActorMapByDomainAndApplicationNames().get(application.domain);
            let actors;
            if (actorMapForDomain) {
                actors = actorMapForDomain.get(application.name);
                if (actors && actors.length) {
                    return;
                }
            }
            actors = await this.actorDao.findByDomainAndApplicationNames(application.domain, application.name);
            let anApplication = await this.applicationDao.findByIndex(application.lastIds.applications + 1);
            if (!actors || !actors.length) {
                const frameworkActor = this.terminalStore.getFrameworkActor();
                const actor = {
                    id: null,
                    application: anApplication,
                    terminal: frameworkActor.terminal,
                    user: frameworkActor.user,
                    uuId: uuidv4()
                };
                await this.actorDao.save(actor);
                actors = [actor];
            }
            const lastTerminalState = this.terminalStore.getTerminalState();
            const applications = lastTerminalState.applications.slice();
            applications.push(anApplication);
            let applicationActors = lastTerminalState.applicationActors.slice();
            applicationActors = applicationActors.concat(actors);
            this.terminalStore.state.next({
                ...lastTerminalState,
                applicationActors,
                applications
            });
        }, context);
    }
    async initTerminal(domainName, context) {
        await this.transactionManager.transactInternal(async (_transaction) => {
            const user = new User();
            user.uuId = 'AIRportA-demo-demo-demo-functionalty';
            user.username = "internalUser";
            const terminal = new Terminal();
            terminal.owner = user;
            terminal.isLocal = true;
            terminal.uuId = uuidv4();
            const actor = new Actor();
            actor.user = user;
            actor.terminal = terminal;
            actor.uuId = uuidv4();
            await this.actorDao.save(actor, context);
            const lastTerminalState = this.terminalStore.getTerminalState();
            this.terminalStore.state.next({
                ...lastTerminalState,
                frameworkActor: actor,
                terminal
            });
        }, context);
    }
    async updateDomain(application) {
        let domain = this.terminalStore.getDomainMapByName().get(application.domain);
        if (domain && this.entityStateManager.getOriginalValues(domain)) {
            return domain;
        }
        let dbDomain = await this.domainDao.findByName(application.domain);
        let updatedDomain;
        if (domain) {
            if (dbDomain) {
                this.entityStateManager.setOriginalValues(this.entityStateManager.getOriginalValues(dbDomain), domain);
                updatedDomain = domain;
            }
        }
        else {
            if (dbDomain) {
                updatedDomain = dbDomain;
            }
            else {
                updatedDomain = {
                    id: null,
                    name: application.domain,
                };
                await this.domainDao.save(updatedDomain);
            }
        }
        if (!updatedDomain) {
            return domain;
        }
        const lastTerminalState = this.terminalStore.getTerminalState();
        const domains = lastTerminalState.domains.slice();
        let replaced = false;
        for (let i = 0; i < domains.length; i++) {
            let currentDomain = domains[i];
            if (currentDomain.name === domain.name) {
                domains.splice(i, 1, domain);
                replaced = true;
            }
        }
        if (!replaced) {
            domains.push(domain);
        }
        this.terminalStore.state.next({
            ...lastTerminalState,
            domains
        });
        return updatedDomain;
    }
};
__decorate([
    Inject()
], InternalRecordManager.prototype, "actorDao", void 0);
__decorate([
    Inject()
], InternalRecordManager.prototype, "applicationDao", void 0);
__decorate([
    Inject()
], InternalRecordManager.prototype, "domainDao", void 0);
__decorate([
    Inject()
], InternalRecordManager.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], InternalRecordManager.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], InternalRecordManager.prototype, "transactionManager", void 0);
InternalRecordManager = __decorate([
    Injected()
], InternalRecordManager);
export { InternalRecordManager };
//# sourceMappingURL=InternalRecordManager.js.map