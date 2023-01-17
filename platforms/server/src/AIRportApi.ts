import { IOC } from "@airport/direction-indicator";
import { Application, ApplicationDao } from '@airport/airspace/dist/app/bundle';
import { Repository, RepositoryDao } from '@airport/holding-pattern/dist/app/bundle';
import { IUserAccountInfo, TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'
import { Repository_GUID } from "@airport/ground-control";

export class AIRportApi {

    async getAllApplications(): Promise<Application[]> {
        const applicationDao = await IOC.get(ApplicationDao)

        return await applicationDao.findAll()
    }

    async getRootRepositories(): Promise<Repository[]> {
        const repositoryDao = await IOC.get(RepositoryDao)

        return await repositoryDao.findRootRepositories()
    }

    async getRepository(
        repositoryGUID: Repository_GUID
    ): Promise<Repository> {
        const repositoryDao = await IOC.get(RepositoryDao)

        return await repositoryDao.findRepository(repositoryGUID)
    }

    async signUp(
        action: string | undefined,
        userAccountInfo: IUserAccountInfo
    ) {
        const terminalSessionManager = await IOC.get(TERMINAL_SESSION_MANAGER)

        switch (action) {
            case 'signUp':
                await terminalSessionManager.signUp(userAccountInfo, {}).then()
                break
            default:
                throw new Error(`Unsupported user action: ${action}`)
        }
    }

}
