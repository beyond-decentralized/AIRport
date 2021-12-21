import { container, DI } from "@airport/di";
import { ENTITY_STATE_MANAGER } from "@airport/ground-control";
import { Actor, ACTOR_DAO, } from "@airport/holding-pattern";
import { TERMINAL_STORE } from "@airport/terminal-map";
import { DOMAIN_DAO, APPLICATION_DAO } from "@airport/airspace";
import { transactional } from "@airport/tower";
import { Terminal, User } from "@airport/travel-document-checkpoint";
import { v4 as uuidv4 } from "uuid";
import { INTERNAL_RECORD_MANAGER } from "../tokens";
export class InternalRecordManager {
    async ensureApplicationRecords(application, context) {
        await transactional(async (_transaction) => {
            const [actorDao, applicationDao, terminalStore] = await container(this)
                .get(ACTOR_DAO, APPLICATION_DAO, TERMINAL_STORE);
            await this.updateDomain(application);
            let actorMapForDomain = terminalStore
                .getApplicationActorMapByDomainAndApplicationNames().get(application.domain);
            let actors;
            if (actorMapForDomain) {
                actors = actorMapForDomain.get(application.name);
                if (actors && actors.length) {
                    return;
                }
            }
            actors = await actorDao.findByDomainAndApplicationNames(application.domain, application.name);
            let anApplication = await applicationDao.findByIndex(application.lastIds.applications + 1);
            if (!actors || !actors.length) {
                const frameworkActor = terminalStore.getFrameworkActor();
                const actor = {
                    id: null,
                    application: anApplication,
                    terminal: frameworkActor.terminal,
                    user: frameworkActor.user,
                    uuId: uuidv4()
                };
                await actorDao.save(actor);
                actors = [actor];
            }
            const lastTerminalState = terminalStore.getTerminalState();
            const applications = lastTerminalState.applications.slice();
            applications.push(anApplication);
            let applicationActors = lastTerminalState.applicationActors.slice();
            applicationActors = applicationActors.concat(actors);
            terminalStore.state.next({
                ...lastTerminalState,
                applicationActors,
                applications
            });
        }, context);
    }
    async initTerminal(domainName, context) {
        await transactional(async (_transaction) => {
            const user = new User();
            user.uuId = 'AIRportA-demo-demo-demo-functionalty';
            user.username = "internalUser";
            // const userDao = await container(this).get(USER_DAO);
            // await userDao.save(user, context);
            const terminal = new Terminal();
            terminal.owner = user;
            terminal.isLocal = true;
            terminal.uuId = uuidv4();
            // const terminalDao = await container(this).get(TERMINAL_DAO);
            // await terminalDao.save(terminal, context);
            const actor = new Actor();
            actor.user = user;
            actor.terminal = terminal;
            actor.uuId = uuidv4();
            const actorDao = await container(this).get(ACTOR_DAO);
            await actorDao.save(actor, context);
            const terminalStore = await container(this).get(TERMINAL_STORE);
            const lastTerminalState = terminalStore.getTerminalState();
            terminalStore.state.next({
                ...lastTerminalState,
                frameworkActor: actor,
                terminal
            });
        }, context);
    }
    async updateDomain(application) {
        const [domainDao, entityStateManager, terminalStore] = await container(this)
            .get(DOMAIN_DAO, ENTITY_STATE_MANAGER, TERMINAL_STORE);
        let domain = terminalStore.getDomainMapByName().get(application.domain);
        if (domain && entityStateManager.getOriginalValues(domain)) {
            return domain;
        }
        let dbDomain = await domainDao.findByName(application.domain);
        let updatedDomain;
        if (domain) {
            if (dbDomain) {
                entityStateManager.setOriginalValues(entityStateManager.getOriginalValues(dbDomain), domain);
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
                await domainDao.save(updatedDomain);
            }
        }
        if (!updatedDomain) {
            return domain;
        }
        const lastTerminalState = terminalStore.getTerminalState();
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
        terminalStore.state.next({
            ...lastTerminalState,
            domains
        });
        return updatedDomain;
    }
}
DI.set(INTERNAL_RECORD_MANAGER, InternalRecordManager);
//# sourceMappingURL=InternalRecordManager.js.map