import { airportApi, Application, IUserAccountInfo, Repository, RepositoryNesting } from '@airport/server'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

export interface RepositoryGroup {
    name: string
    repositoryNestings: RepositoryNesting[]
}

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

export async function getRootRepositories(
    setRepositories: (repositories: Repository[]) => void,
    showMessage: (message: string, duration: number) => void
): Promise<void> {
    try {
        const repositories = await airportApi.getRootRepositories()
        setRepositories(repositories)
    } catch (e) {
        console.error(e)
        showMessage('Error retrieving Root Repositories', 10000)
    }
}

export async function getRepository(
    repositoryId: string,
    setRepository: (repository: Repository) => void,
    setRepositoriesInGroups: (repositoryGroups: RepositoryGroup[]) => void,
    showMessage: (message: string, duration: number) => void
) {
    try {
        const repository = await airportApi.getRepository(repositoryId)
        setRepository(repository)
        getRepositoryNestingsInGroups(repository, setRepositoriesInGroups,
            showMessage)
    } catch (e) {
        console.error(e)
        showMessage('Error retrieving Repository', 10000)
    }
}

function getRepositoryNestingsInGroups(
    repository: Repository,
    setRepositoriesInGroups: (repositoryGroups: RepositoryGroup[]) => void,
    showMessage: (message: string, duration: number) => void
): void {
    try {
        const otherRepositoryGroup: RepositoryGroup = {
            name: 'Other',
            repositoryNestings: []
        }
        const repositoryGroupMap: Map<string, RepositoryGroup> = new Map()
        for (const repositoryNesting of repository.repositoryNestings) {
            if (!repositoryNesting.nestingType) {
                otherRepositoryGroup.repositoryNestings.push(repositoryNesting)
                continue
            }

            let repositoryGroup = repositoryGroupMap.get(repositoryNesting.nestingType)
            if (!repositoryGroup) {
                repositoryGroup = {
                    name: repositoryNesting.nestingType,
                    repositoryNestings: []
                }
                repositoryGroupMap.set(repositoryNesting.nestingType, repositoryGroup)
            }
            repositoryGroup.repositoryNestings.push(repositoryNesting)
        }
        const repositoryGroups = Array.from(repositoryGroupMap.values())
        repositoryGroups.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        })
        if (otherRepositoryGroup.repositoryNestings.length) {
            repositoryGroups.push(otherRepositoryGroup)
        }
        setRepositoriesInGroups(repositoryGroups)
    } catch (e) {
        console.error(e)
        showMessage('Error getting Repository Nestings', 10000)
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
