import { airportApi, Application, IUserAccountInfo, Repository } from '@airport/web-airport'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { useIonToast } from '@ionic/react';

const [present, dismiss] = useIonToast()

export function signUp(
    ev: CustomEvent<OverlayEventDetail>,
    showMessage: (message: string, duration: number) => void
): void {
    asyncSignUp(ev.detail.role, ev.detail.data).then()
}

export function getApplications(
    setApplications: (applications: Application[]) => void,
    showMessage: (message: string, duration: number) => void
) {
    getApplicationsAsync(setApplications).then()
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
        const repositories = await airportApi.getAllRepositories()
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
        await airportApi.signUp(action, userAccountInfo)
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
