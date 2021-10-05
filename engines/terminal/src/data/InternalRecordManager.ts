import { container, DI, IContext } from "@airport/di";
import { DomainName } from "@airport/ground-control";
import { Actor, ACTOR_DAO, IActor } from "@airport/holding-pattern";
import { JsonSchemaWithLastIds } from "@airport/security-check";
import { TERMINAL_STORE } from "@airport/terminal-map";
import { APPLICATION_DAO, DOMAIN_DAO } from "@airport/territory";
import { transactional } from "@airport/tower";
import { Terminal, User } from "@airport/travel-document-checkpoint";
import { v4 as uuidv4 } from "uuid";
import { INTERNAL_RECORD_MANAGER } from "../tokens";

export interface IInternalRecordManager {

    ensureSchemaRecords(
        schema: JsonSchemaWithLastIds,
        context: IContext
    ): Promise<void>

    initTerminal(
        domainName: DomainName,
        context: IContext
    ): Promise<void>

}

export class InternalRecordManager
    implements IInternalRecordManager {

    async ensureSchemaRecords(
        schema: JsonSchemaWithLastIds,
        context: IContext
    ): Promise<void> {
        await transactional(async (
            _transaction
        ) => {
            const [actorDao, applicationDao, domainDao, terminalStore]
                = await container(this)
                    .get(ACTOR_DAO, APPLICATION_DAO, DOMAIN_DAO, TERMINAL_STORE)
            let domain = await domainDao.findByName(schema.domain)
            const lastTerminalState = terminalStore.getTerminalState()
            const domains = lastTerminalState.domains.slice()
            if (!domain) {
                domain = {
                    id: null,
                    name: schema.domain,
                }
                await domainDao.save(domain)

                domains.push(domain)
            }
            let application = await applicationDao
                .findByDomainNameAndName(schema.domain, schema.name)
            if (!application) {
                application = {
                    domain,
                    id: null,
                    name: schema.name,
                }
                await applicationDao.save(application)

                const frameworkActor = terminalStore.getFrameworkActor()
                const actor: IActor = {
                    application: application,
                    id: null,
                    repositoryActors: [],
                    terminal: frameworkActor.terminal,
                    user: frameworkActor.user,
                    uuId: uuidv4()
                }
                await actorDao.save(actor)

                const lastTerminalState = terminalStore.getTerminalState()
                const applications = lastTerminalState.applications.slice()
                applications.push(application)
                const applicationActors = lastTerminalState.applicationActors.slice()
                applicationActors.push(actor)
                terminalStore.state.next({
                    ...lastTerminalState,
                    applicationActors,
                    applications,
                    domains
                })

            }
        }, context);

    }

    async initTerminal(
        domainName: DomainName,
        context: IContext
    ): Promise<void> {
        await transactional(async (
            _transaction
        ) => {
            const user = new User();
            user.uniqueId = domainName;
            // const userDao = await container(this).get(USER_DAO);
            // await userDao.save(user, context);

            const terminal = new Terminal();
            terminal.name = domainName;
            terminal.owner = user;
            // const terminalDao = await container(this).get(TERMINAL_DAO);
            // await terminalDao.save(terminal, context);

            const actor = new Actor();
            actor.user = user;
            actor.terminal = terminal;
            actor.uuId = uuidv4();
            const actorDao = await container(this).get(ACTOR_DAO);
            await actorDao.save(actor, context);

            const terminalStore = await container(this).get(TERMINAL_STORE)
            const lastTerminalState = terminalStore.getTerminalState()
            terminalStore.state.next({
                ...lastTerminalState,
                frameworkActor: actor,
                terminal
            })
        }, context);
    }
}
DI.set(INTERNAL_RECORD_MANAGER, InternalRecordManager)
