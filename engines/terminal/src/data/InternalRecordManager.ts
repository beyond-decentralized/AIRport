import {
    IContext
} from "@airport/direction-indicator";
import {
    IApplication,
    IDomain,
    IActor,
    IEntityStateManager,
    ITerminal,
    IUserAccount,
    JsonApplication
} from "@airport/ground-control";
import {
    Actor,
    IActorDao,
} from "@airport/holding-pattern/dist/app/bundle";
import { ITransactionManager, TerminalStore } from "@airport/terminal-map";
import {
    IDdlDomainDao,
    IDdlApplicationDao
} from "@airport/airspace/dist/app/bundle";
import {
    Terminal,
    UserAccount
} from "@airport/travel-document-checkpoint/dist/app/bundle";
import { v4 as guidv4 } from "uuid";
import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { TerminalSessionManager } from "../core/TerminalSessionManager";
import { JsonApplicationWithLastIds } from "@airport/air-traffic-control";

export interface IInternalRecordManager {

    ensureApplicationRecords(
        application: JsonApplicationWithLastIds,
        context: IContext
    ): Promise<void>

    initTerminal(
        firstApp: JsonApplication,
        context: IContext
    ): Promise<void>

}

@Injected()
export class InternalRecordManager
    implements IInternalRecordManager {

    @Inject()
    actorDao: IActorDao

    @Inject()
    ddlApplicationDao: IDdlApplicationDao

    @Inject()
    ddlDomainDao: IDdlDomainDao

    @Inject()
    entityStateManager: IEntityStateManager

    @Inject()
    terminalSessionManager: TerminalSessionManager

    @Inject()
    terminalStore: TerminalStore

    @Inject()
    transactionManager: ITransactionManager

    async ensureApplicationRecords(
        application: JsonApplicationWithLastIds,
        context: IContext
    ): Promise<void> {
        await this.transactionManager.transactInternal(async (
            _transaction,
            context
        ) => {
            await this.updateDomain(application, context)

            let actorMapForDomain = this.terminalStore
                .getApplicationActorMapByDomainAndApplication_Names().get(application.domain)
            let actors: IActor[]
            if (actorMapForDomain) {
                actors = actorMapForDomain.get(application.name)
                if (!actors || !actors.length) {
                    return
                }
            }

            const frameworkActor = this.terminalStore.getFrameworkActor()
            // TODO: add request object
            const userSession = await this.terminalSessionManager.getUserSession()

            let actor = await this.actorDao
                .findOneByDomainAndApplication_Names_AccountPublicSigningKey_TerminalGUID(
                    application.domain, application.name,
                    userSession.userAccount.accountPublicSigningKey,
                    frameworkActor.terminal.GUID, context)

            let anApplication: IApplication = await this.ddlApplicationDao.findByIndex(
                application.lastIds.applications + 1, context)
            if (!actor) {
                actor = {
                    _localId: null,
                    application: anApplication,
                    terminal: frameworkActor.terminal,
                    userAccount: userSession.userAccount,
                    GUID: guidv4()
                }
                await this.actorDao.save(actor, context)
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

        }, null, context)

    }

    async initTerminal(
        firstApp: JsonApplication,
        context: IContext
    ): Promise<void> {
        await this.transactionManager.transactInternal(async (
            _transaction
        ) => {
            const userAccount: IUserAccount = new UserAccount()
            userAccount.username = "internalUserAccount"
            const guid = guidv4()
            userAccount.accountPublicSigningKey = guid
            userAccount.sha1sum = guid

            const terminal: ITerminal = new Terminal()
            terminal.owner = userAccount
            terminal.isLocal = true
            terminal.GUID = guidv4()

            const application = await this.ddlApplicationDao.findOneByDomain_NameAndApplication_Name(
                firstApp.domain, firstApp.name, context)

            const actor: IActor = new Actor()
            actor.application = application
            actor.userAccount = userAccount
            actor.terminal = terminal
            actor.GUID = guidv4()
            const actorDao = await (this as any).getactorDaoAsync()
            await actorDao.save(actor, context)

            const lastTerminalState = this.terminalStore.getTerminalState()
            this.terminalStore.state.next({
                ...lastTerminalState,
                frameworkActor: actor,
                terminal
            })
        }, null, context)
    }

    private async updateDomain(
        application: JsonApplicationWithLastIds,
        context: IContext
    ): Promise<IDomain> {
        let domain = this.terminalStore.getDomainMapByName().get(application.domain)

        if (domain && this.entityStateManager.getOriginalValues(domain)) {
            return domain
        }
        let dbDomain = await this.ddlDomainDao.findByName(application.domain, context)
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
                    _localId: null,
                    name: application.domain,
                }
                await this.ddlDomainDao.save(updatedDomain, context)
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
