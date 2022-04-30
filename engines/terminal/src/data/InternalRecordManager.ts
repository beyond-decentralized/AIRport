import {
    IContext
} from "@airport/direction-indicator";
import {
    DomainName,
    IEntityStateManager
} from "@airport/ground-control";
import {
    Actor,
    IActor,
    IActorDao,
} from "@airport/holding-pattern";
import { JsonApplicationWithLastIds } from "@airport/security-check";
import { ITransactionManager, TerminalStore } from "@airport/terminal-map";
import {
    IDomain,
    IApplication,
    IDomainDao,
    IApplicationDao
} from "@airport/airspace";
import {
    Terminal,
    User
} from "@airport/travel-document-checkpoint-internal";
import { v4 as uuidv4 } from "uuid";

export interface IInternalRecordManager {

    ensureApplicationRecords(
        application: JsonApplicationWithLastIds,
        context: IContext
    ): Promise<void>

    initTerminal(
        domainName: DomainName,
        context: IContext
    ): Promise<void>

}

export class InternalRecordManager
    implements IInternalRecordManager {

    actorDao: IActorDao
    applicationDao: IApplicationDao
    domainDao: IDomainDao
    entityStateManager: IEntityStateManager
    terminalStore: TerminalStore
    transactionManager: ITransactionManager

    async ensureApplicationRecords(
        application: JsonApplicationWithLastIds,
        context: IContext
    ): Promise<void> {
        await this.transactionManager.transactInternal(async (
            _transaction
        ) => {
            await this.updateDomain(application)

            let actorMapForDomain = this.terminalStore
                .getApplicationActorMapByDomainAndApplicationNames().get(application.domain)
            let actors: IActor[]
            if (actorMapForDomain) {
                actors = actorMapForDomain.get(application.name)
                if (actors && actors.length) {
                    return
                }
            }

            actors = await this.actorDao.findByDomainAndApplicationNames(application.domain, application.name)
            let anApplication: IApplication = await this.applicationDao.findByIndex(
                application.lastIds.applications + 1);
            if (!actors || !actors.length) {
                const frameworkActor = this.terminalStore.getFrameworkActor()
                const actor = {
                    id: null,
                    application: anApplication,
                    terminal: frameworkActor.terminal,
                    user: frameworkActor.user,
                    uuId: uuidv4()
                }
                await this.actorDao.save(actor)
                actors = [actor]
            }

            const lastTerminalState = this.terminalStore.getTerminalState()
            const applications = lastTerminalState.applications.slice()
            applications.push(anApplication)
            let applicationActors = lastTerminalState.applicationActors.slice()
            applicationActors = applicationActors.concat(actors)
            this.terminalStore.state.next({
                ...lastTerminalState,
                applicationActors,
                applications
            })

        }, context);

    }

    async initTerminal(
        domainName: DomainName,
        context: IContext
    ): Promise<void> {
        await this.transactionManager.transactInternal(async (
            _transaction
        ) => {
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

            const lastTerminalState = this.terminalStore.getTerminalState()
            this.terminalStore.state.next({
                ...lastTerminalState,
                frameworkActor: actor,
                terminal
            })
        }, context);
    }

    private async updateDomain(
        application: JsonApplicationWithLastIds,
    ): Promise<IDomain> {
        let domain = this.terminalStore.getDomainMapByName().get(application.domain)

        if (domain && this.entityStateManager.getOriginalValues(domain)) {
            return domain
        }
        let dbDomain = await this.domainDao.findByName(application.domain)
        let updatedDomain
        if (domain) {
            if (dbDomain) {
                this.entityStateManager.setOriginalValues(
                    this.entityStateManager.getOriginalValues(dbDomain), domain)
                updatedDomain = domain
            }
        } else {
            if (dbDomain) {
                updatedDomain = dbDomain
            } else {
                updatedDomain = {
                    id: null,
                    name: application.domain,
                }
                await this.domainDao.save(updatedDomain)
            }
        }
        if (!updatedDomain) {
            return domain
        }
        const lastTerminalState = this.terminalStore.getTerminalState()
        const domains = lastTerminalState.domains.slice()
        let replaced = false
        for (let i = 0; i < domains.length; i++) {
            let currentDomain = domains[i]
            if (currentDomain.name === domain.name) {
                domains.splice(i, 1, domain)
                replaced = true
            }
        }
        if (!replaced) {
            domains.push(domain)
        }

        this.terminalStore.state.next({
            ...lastTerminalState,
            domains
        })

        return updatedDomain
    }
}
