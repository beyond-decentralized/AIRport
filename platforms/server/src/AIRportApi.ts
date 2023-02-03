import { IOC } from "@airport/direction-indicator";
import { ApplicationDao } from '@airport/airspace/dist/app/bundle';
import { RepositoryDao } from '@airport/holding-pattern/dist/app/bundle';
import { IUserAccountInfo } from '@airport/terminal-map'
import { DbApplication, IRepository, Repository_GUID } from "@airport/ground-control";
import { SSOManager } from "@airbridge/sso";

export class AIRportApi {

    async getAllApplications(): Promise<DbApplication[]> {
        const applicationDao = await IOC.get(ApplicationDao)

        return await applicationDao.findAll()
    }

    async getRootRepositories(): Promise<IRepository[]> {
        const repositoryDao = await IOC.get(RepositoryDao)

        return await repositoryDao.findRepositories()
    }

    async getRepository(
        repositoryGUID: Repository_GUID
    ): Promise<IRepository> {
        const repositoryDao = await IOC.get(RepositoryDao)

        return await repositoryDao.findRepositoryWithReferences(repositoryGUID)
    }

    async signUp(
        action: string | undefined,
        userAccountInfo: IUserAccountInfo
    ) {
        const ssoManager = await IOC.get(SSOManager)

        switch (action) {
            case 'signUp':
                await ssoManager.signUp(userAccountInfo, {}).then()
                break
            default:
                throw new Error(`Unsupported user action: ${action}`)
        }
    }

}
