import { IOC } from "@airport/direction-indicator";
import { DbApplicationDao } from '@airport/airspace/dist/app/bundle';
import { RepositoryDao } from '@airport/holding-pattern/dist/app/bundle';
import { IOperationContext, ITransaction, ITransactionContext, IUserAccountInfo, TRANSACTION_MANAGER } from '@airport/terminal-map'
import { DbApplication, IRepository, Repository_GUID } from "@airport/ground-control";
import { SSOManager } from "@airbridge/sso";

export class AIRportApi {

    async getAllApplications(): Promise<DbApplication[]> {
        const dbApplicationDao = await IOC.get(DbApplicationDao)

        return await dbApplicationDao.findAll()
    }

    async getRootRepositories(): Promise<IRepository[]> {
        const [repositoryDao, transactionManager] = await IOC.get(RepositoryDao, TRANSACTION_MANAGER)

        let repositories: IRepository[] = []
        await transactionManager.transactInternal(async (
            _transaction: ITransaction,
            context: IOperationContext & ITransactionContext
        ) => {
            repositories = await repositoryDao.findRepositories(context)
        }, null, {})

        return repositories
    }

    async getRepository(
        repositoryGUID: Repository_GUID
    ): Promise<IRepository> {
        const [repositoryDao, transactionManager] = await IOC.get(RepositoryDao, TRANSACTION_MANAGER)

        let repository: IRepository
        await transactionManager.transactInternal(async (
            _transaction: ITransaction,
            context: IOperationContext & ITransactionContext
        ) => {
            repository = await repositoryDao.findRepositoryWithReferences(
                repositoryGUID, context)
        }, null, {})

        return repository
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
                    await ssoManager.signUp(userAccountInfo, context).then()
                }, null, {})
                break
            default:
                throw new Error(`Unsupported user action: ${action}`)
        }
    }

}
