import { airportApi, Application, IUserAccountInfo, Repository } from '@airport/server'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

export function signUp(
    ev: CustomEvent<OverlayEventDetail>,
    showMessage: (message: string, duration: number) => void
): void {
    asyncSignUp(ev.detail.role, ev.detail.data, showMessage).then()
}

export function getApplications(
    setApplications: (applications: Application[]) => void,
    showMessage: (message: string, duration: number) => void
) {
    getApplicationsAsync(setApplications, showMessage).then()
}

async function getApplicationsAsync(
    setApplications: (applications: Application[]) => void,
    showMessage: (message: string, duration: number) => void
) {
    try {
        const applications = await airportApi.getAllApplications()
        setApplications(applications)
    } catch (e) {
        console.error(e)
        showMessage('Error retrieving Applications', 10000)
    }
}

export function getRepositories(
    setRepositories: (repositories: Repository[]) => void,
    showMessage: (message: string, duration: number) => void
) {
    getRepositoriesAsync(setRepositories, showMessage).then()
}

async function getRepositoriesAsync(
    setRepositories: (repositories: Repository[]) => void,
    showMessage: (message: string, duration: number) => void
) {
    try {
        const repositories = await airportApi.getRootRepositories()
        setRepositories(repositories)
    } catch (e) {
        console.error(e)
        showMessage('Error retrieving Repositories', 10000)
    }
}

async function asyncSignUp(
    action: string | undefined,
    userAccountInfo: IUserAccountInfo,
    showMessage: (message: string, duration: number) => void
) {
    if (!action) {
        return
    }
    try {
        await airportApi.signUp(action, userAccountInfo)
    } catch (e) {
        let message = e
        if (e instanceof Error) {
            message = e.message
            console.error(e)
        }
        console.error(message)
        showMessage(message as string, 10000)
    }
}
