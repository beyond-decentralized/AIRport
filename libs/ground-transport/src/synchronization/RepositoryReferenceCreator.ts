import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { DatastructureUtils, IRepositoryReference, Repository_LocalId, SyncRepositoryMessage } from "@airport/ground-control";
import { RepositoryReferenceDao } from "@airport/holding-pattern/dist/app/bundle";

@Injected()
export class RepositoryReferenceCreator {

    @Inject()
    datastructureUtils: DatastructureUtils

    @Inject()
    repositoryReferenceDao: RepositoryReferenceDao

    async create(
        messages: SyncRepositoryMessage[],
        context: IContext
    ): Promise<void> {
        const repositoryReferenceMapByLocalIds: Map<Repository_LocalId,
            Map<Repository_LocalId, IRepositoryReference>>
            = new Map()
        for (const message of messages) {
            const referencingRepository = message.data.history.repository
            const referencesOfRepositoryMap = this.datastructureUtils.ensureChildJsMap(
                repositoryReferenceMapByLocalIds,
                referencingRepository._localId)
            for (const referencedRepository of message.data.referencedRepositories) {
                if (referencesOfRepositoryMap.has(referencedRepository._localId)) {
                    continue
                }
                referencesOfRepositoryMap.set(
                    referencedRepository._localId, {
                    referencingRepository,
                    referencedRepository
                }
                )
            }
        }

        const existingRepositoryReferences = await this.repositoryReferenceDao
            .findByReferencingRepository_LocalIds(
                Array.from(repositoryReferenceMapByLocalIds.keys()),
                context)
        for (const existingRepositoryReference of existingRepositoryReferences) {
            const referencesOfRepositoryMap = repositoryReferenceMapByLocalIds
                .get(existingRepositoryReference.referencingRepository._localId)
            referencesOfRepositoryMap.delete(
                existingRepositoryReference.referencedRepository._localId
            )
        }

        const repositoryReferenceArrayToInsert: IRepositoryReference[] = []
        for (const referencesOfRepositoryMap of repositoryReferenceMapByLocalIds.values()) {
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
