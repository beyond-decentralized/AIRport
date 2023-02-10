import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { DatastructureUtils, IRepositoryReference, Repository_GUID, SyncRepositoryMessage } from "@airport/ground-control";
import { Repository } from "@airport/holding-pattern";
import { RepositoryDao, RepositoryReferenceDao } from "@airport/holding-pattern/dist/app/bundle";

@Injected()
export class RepositoryReferenceCreator {

    @Inject()
    datastructureUtils: DatastructureUtils

    @Inject()
    repositoryDao: RepositoryDao

    @Inject()
    repositoryReferenceDao: RepositoryReferenceDao

    async create(
        messages: SyncRepositoryMessage[],
        context: IContext
    ): Promise<void> {
        let repositoryGUIDSetToLookUp: Set<Repository_GUID> = new Set()

        for (const message of messages) {
            const referencingRepository = message.data.history.repository
            if (typeof referencingRepository === 'string') {
                repositoryGUIDSetToLookUp.add(referencingRepository)
            }
        }

        const foundRepositories = await this.repositoryDao.findByGUIDs(
            Array.from(repositoryGUIDSetToLookUp), context)
        const foundRepositoriesByGUIDMap: Map<Repository_GUID, Repository>
            = new Map()
        for(const foundRepository of foundRepositories) {
            foundRepositoriesByGUIDMap.set(foundRepository.GUID, foundRepository)
        }

        const repositoryReferenceMapByGUIDs: Map<Repository_GUID,
            Map<Repository_GUID, IRepositoryReference>>
            = new Map()
        for (const message of messages) {
            let referencingRepository = message.data.history.repository
            let repositoryGUID: Repository_GUID
            if (typeof referencingRepository === 'string') {
                repositoryGUID = referencingRepository
                referencingRepository = foundRepositoriesByGUIDMap.get(referencingRepository)
            } else {
                repositoryGUID = referencingRepository.GUID
            }
            const referencesOfRepositoryMap = this.datastructureUtils.ensureChildJsMap(
                repositoryReferenceMapByGUIDs,
                repositoryGUID)
            for (const referencedRepository of message.data.referencedRepositories) {
                if (referencesOfRepositoryMap.has(referencedRepository.GUID)) {
                    continue
                }
                referencesOfRepositoryMap.set(
                    referencedRepository.GUID, {
                    referencingRepository,
                    referencedRepository
                }
                )
            }
        }

        if (!repositoryReferenceMapByGUIDs.size) {
            return
        }

        const existingRepositoryReferences = await this.repositoryReferenceDao
            .findByReferencingRepository_GUIDs(
                Array.from(repositoryReferenceMapByGUIDs.keys()),
                context)
        for (const existingRepositoryReference of existingRepositoryReferences) {
            const referencesOfRepositoryMap = repositoryReferenceMapByGUIDs
                .get(existingRepositoryReference.referencingRepository.GUID)
            referencesOfRepositoryMap.delete(
                existingRepositoryReference.referencedRepository.GUID
            )
        }

        const repositoryReferenceArrayToInsert: IRepositoryReference[] = []
        for (const referencesOfRepositoryMap of repositoryReferenceMapByGUIDs.values()) {
            for (const repositoryReference of referencesOfRepositoryMap.values()) {
                repositoryReferenceArrayToInsert.push(repositoryReference)
            }
        }

        await this.repositoryReferenceDao.insert(
            repositoryReferenceArrayToInsert,
            context
        )
    }

}
