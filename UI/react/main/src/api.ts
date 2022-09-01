import { Application, APPLICATION_DAO, IApplicationDao } from '@airport/airspace';
import { IRepositoryDao, Repository, REPOSITORY_DAO } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IOC } from '@airport/direction-indicator'
import { IUserAccountInfo, TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { useIonToast } from '@ionic/react';

const terminalSessionManager = IOC.getSync(TERMINAL_SESSION_MANAGER)
let applicationDao: IApplicationDao
let repositoryDao: IRepositoryDao

async function loadDaos() {
    applicationDao = await IOC.get(APPLICATION_DAO)
    repositoryDao = await IOC.get(REPOSITORY_DAO)
}
loadDaos().then()

const [present, dismiss] = useIonToast()

export function signUp(
    ev: CustomEvent<OverlayEventDetail>
): void {
    asyncSignUp(ev.detail.role, ev.detail.data).then()
}

export function getApplications(
    setApplications: (applications: Application[]) => void
) {
    getApplicationsAsync(setApplications).then()
}

async function getApplicationsAsync(
    setApplications: (applications: Application[]) => void
) {
    try {
        const applications = await applicationDao.findAll()
        setApplications(applications)
    } catch (e) {
        console.error(e)
        present('Error retrieving Applications', 10000)
    }
}

export function getRepositories(
    setRepositories: (repositories: Repository[]) => void
) {
    getRepositoriesAsync(setRepositories).then()
}

async function getRepositoriesAsync(
    setRepositories: (repositories: Repository[]) => void
) {
    try {
        const repositories = await repositoryDao.findAll()
        setRepositories(repositories)
    } catch (e) {
        console.error(e)
        present('Error retrieving Repositories', 10000)
    }
}

async function asyncSignUp(
    action: string | undefined,
    userAccountInfo: IUserAccountInfo
) {
    if (!action) {
        return
    }
    try {
        switch (action) {
            case 'signUp':
                await terminalSessionManager.signUp(userAccountInfo).then()
                break
            default:
                throw new Error(`Unsupported user action: ${action}`)
        }
    } catch (e) {
        let message = e
        if (e instanceof Error) {
            message = e.message
            console.error(e)
        }
        console.error(message)
        present(message as string, 10000)
    }
}