import { IAirMessageUtils, IInternalMessage, INTERNAL_Message_Type, Message_OriginOrDestination_Type, UI_URL } from "@airport/aviation-communication";
import { AIR_MESSAGE_UTILS, IOC } from "@airport/direction-indicator";
import { DdlApplicationDao } from '@airport/airspace/dist/app/bundle';
import { RepositoryDao } from '@airport/holding-pattern/dist/app/bundle';
import { IOperationContext, ITransaction, ITransactionContext, IUserAccountInfo, TRANSACTION_MANAGER, TerminalStore } from '@airport/terminal-map'
import { IApplication, IRepository, Repository_GUID } from "@airport/ground-control";
import { SSOManager } from "@airbridge/sso";
import { Observable, map } from "rxjs";
import { WebMessageGateway } from "@airport/web-terminal";

export class AIRportApi {

    getAllApplications(): Observable<IApplication[]> {
        const transactionManager = IOC.getSync(TRANSACTION_MANAGER)

        return transactionManager.transactObservableInternal(async (_context) => {
            const ddlApplicationDao = IOC.getSync(DdlApplicationDao)

            return ddlApplicationDao.searchAll()
        }, null, {}, [])
    }

    getRepositories(): Observable<IRepository[]> {
        const transactionManager = IOC.getSync(TRANSACTION_MANAGER)

        return transactionManager.transactObservableInternal(async (context) => {
            const repositoryDao = await IOC.get(RepositoryDao)

            return repositoryDao.searchRepositories(context)
        }, null, {}, [])
    }

    getCurrentUiUrl(): Observable<UI_URL> {
        return IOC.getSync(TerminalStore).getUI.observable.pipe(
            map(uiState => uiState.currentUrl)
        )
    }

    uiGoBack(): void {
        this.uiGoBackOrForward(true)
    }

    uiGoForward(): void {
        this.uiGoBackOrForward(false)
    }

    private uiGoBackOrForward(
        back: boolean
    ): void {
        const protocolAndRest = IOC.getSync(TerminalStore).getUI().currentUrl.split('//')
        let domain = protocolAndRest[1].split('/')[0]
        let internalMessageType = back ? INTERNAL_Message_Type.UI_GO_BACK
            : INTERNAL_Message_Type.UI_GO_FORWARD
        const goBackMessage: IInternalMessage = (IOC.getSync(AIR_MESSAGE_UTILS) as any as IAirMessageUtils)
            .getInternalMessage(internalMessageType,
                Message_OriginOrDestination_Type.FRAMEWORK)
        goBackMessage.destination = {
            domain,
            protocol: protocolAndRest[0],
            type: Message_OriginOrDestination_Type.USER_INTERFACE
        }
        IOC.getSync(WebMessageGateway).sendMessageToClient(goBackMessage)
    }

    setUiIframe(
        currentUrl: string,
        uiIframe: HTMLIFrameElement,
        escapeZoneJsCallback?: (
            innerCallback: () => void
        ) => void
    ): void {
        const terminalStore = IOC.getSync(TerminalStore);
        let state
        terminalStore.state.subscribe(theState => {
            state = theState
        }).unsubscribe()
        terminalStore.state.next({
            ...state,
            ui: {
                ...state.ui,
                currentUrl,
                uiIframe,
                escapeZoneJsCallback
            }
        })
    }

    searchRepository(
        repositoryGUID: Repository_GUID
    ): Observable<IRepository> {
        const [repositoryDao, transactionManager] = IOC.getSync(RepositoryDao, TRANSACTION_MANAGER)

        return transactionManager.transactObservableInternal(async (
            context: IOperationContext & ITransactionContext
        ) => {
            return repositoryDao.searchRepositoryWithReferences(
                repositoryGUID, context)
        }, null, {})
    }

    async signUp(
        action: string | undefined,
        userAccountInfo: IUserAccountInfo
    ) {
        const [ssoManager, transactionManager] = await IOC.get(SSOManager, TRANSACTION_MANAGER)

        switch (action) {
            case 'signUp':
                await transactionManager.transactInternal(async (
                    _transaction: ITransaction,
                    context: IOperationContext & ITransactionContext
                ) => {
                    await ssoManager.signUp(userAccountInfo, context)
                }, null, {})
                break
            default:
                throw new Error(`Unsupported user action: ${action}`)
        }
    }

}
