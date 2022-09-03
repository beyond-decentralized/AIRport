import { IOC } from "@airport/direction-indicator";
import { Application, APPLICATION_DAO } from '@airport/airspace/dist/app/bundle';
import { Repository, REPOSITORY_DAO } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IUserAccountInfo, TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'

export class AIRportApi {

    async getAllApplications(): Promise<Application[]> {
        const applicationDao = await IOC.get(APPLICATION_DAO)

        return await applicationDao.findAll()
    }

    async getAllRepositories(): Promise<Repository[]> {
        const repositoryDao = await IOC.get(REPOSITORY_DAO)

        return await repositoryDao.findAll()
    }

    async signUp(
        action: string | undefined,
        userAccountInfo: IUserAccountInfo
    ) {
        const terminalSessionManager = await IOC.get(TERMINAL_SESSION_MANAGER)

        switch (action) {
            case 'signUp':
                await terminalSessionManager.signUp(userAccountInfo).then()
                break
            default:
                throw new Error(`Unsupported user action: ${action}`)
        }
    }

}
