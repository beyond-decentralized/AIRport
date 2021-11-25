import { container, DI } from "@airport/di";
import { ENTITY_STATE_MANAGER } from "@airport/ground-control";
import { Actor, ACTOR_DAO, } from "@airport/holding-pattern";
import { TERMINAL_STORE } from "@airport/terminal-map";
import { APPLICATION_DAO, DOMAIN_DAO } from "@airport/territory";
import { transactional } from "@airport/tower";
import { Terminal, User } from "@airport/travel-document-checkpoint";
import { v4 as uuidv4 } from "uuid";
import { INTERNAL_RECORD_MANAGER } from "../tokens";
export class InternalRecordManager {
    async ensureSchemaRecords(schema, signature, context) {
        await transactional(async (_transaction) => {
            const [actorDao, applicationDao, terminalStore] = await container(this)
                .get(ACTOR_DAO, APPLICATION_DAO, TERMINAL_STORE);
            const domain = await this.updateDomain(schema);
            let actor = terminalStore
                .getApplicationActorMapBySignature().get(signature);
            if (actor) {
                return;
            }
            actor = await actorDao.findByApplicationSignature(signature);
            let application;
            if (!actor) {
                application = {
                    domain,
                    id: null,
                    name: schema.name,
                    signature
                };
                await applicationDao.save(application);
                const frameworkActor = terminalStore.getFrameworkActor();
                actor = {
                    application: application,
                    id: null,
                    repositoryActors: [],
                    terminal: frameworkActor.terminal,
                    user: frameworkActor.user,
                    uuId: uuidv4()
                };
                await actorDao.save(actor);
            }
            else {
                application = actor.application;
            }
            const lastTerminalState = terminalStore.getTerminalState();
            const applications = lastTerminalState.applications.slice();
            applications.push(application);
            const applicationActors = lastTerminalState.applicationActors.slice();
            applicationActors.push(actor);
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
            user.privateId = domainName;
            user.publicId = domainName;
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
    async updateDomain(schema) {
        const [domainDao, entityStateManager, terminalStore] = await container(this)
            .get(DOMAIN_DAO, ENTITY_STATE_MANAGER, TERMINAL_STORE);
        let domain = terminalStore.getDomainMapByName().get(schema.domain);
        if (domain && entityStateManager.getOriginalValues(domain)) {
            return domain;
        }
        let dbDomain = await domainDao.findByName(schema.domain);
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
                    name: schema.domain,
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