import { container, DI, IContext } from "@airport/di";
import { DomainName } from "@airport/ground-control";
import { Actor, ACTOR_DAO } from "@airport/holding-pattern";
import { JsonSchemaWithLastIds } from "@airport/security-check";
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
            const [actorDao, applicationDao, domainDao] = await container(this)
                .get(ACTOR_DAO, APPLICATION_DAO, DOMAIN_DAO)
            let domain = await domainDao.findByName(schema.domain)
            if (!domain) {
                domain = {
                    id: null,
                    name: schema.domain,
                }
                await domainDao.save(domain)
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

                const actor: Actor = {
                    application: application as any,
                    id: null,
                    repositoryActors: [],
                    terminal: undefined,
                    user: undefined,
                    uuId: uuidv4()
                }
                await actorDao.save(actor)
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
        }, context);
    }
}
DI.set(INTERNAL_RECORD_MANAGER, InternalRecordManager)