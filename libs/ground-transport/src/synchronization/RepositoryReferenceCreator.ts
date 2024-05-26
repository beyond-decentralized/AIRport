import { IContext, Inject, Injected } from "@airport/direction-indicator";
import { DatastructureUtils, IRepositoryReference, Repository_GUID, IRepositoryBlock, IRepository } from "@airport/ground-control";
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
        blocks: IRepositoryBlock[],
        context: IContext
    ): Promise<void> {
        let repositoryGUIDSetToLookUp: Set<Repository_GUID> = new Set()

        for (const block of blocks) {
            const referencingRepository = block.repository
            if (typeof referencingRepository === 'string') {
                repositoryGUIDSetToLookUp.add(referencingRepository)
            }
        }

        const foundRepositoriesByGUIDMap: Map<Repository_GUID, IRepository>
            = new Map()
        if (repositoryGUIDSetToLookUp.size) {
            const foundRepositories = await this.repositoryDao.findByGUIDs(
                Array.from(repositoryGUIDSetToLookUp), context)
            for (const foundRepository of foundRepositories) {
                foundRepositoriesByGUIDMap.set(foundRepository.GUID, foundRepository)
            }
        }

        const repositoryReferenceMapByGUIDs: Map<Repository_GUID,
            Map<Repository_GUID, IRepositoryReference>>
            = new Map()
        for (const block of blocks) {
            let referencingRepository = block.repository
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
            for (const referencedRepository of block.data.referencedRepositories) {
                if (referencesOfRepositoryMap.has(referencedRepository.GUID)) {
                    referencesOfRepositoryMap.set(
                        referencedRepository.GUID, {
                        referencingRepository: {
                            ...referencingRepository
                        },
                        referencedRepository: {
                            ...referencedRepository
                        }
                    })
                }
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

        if (repositoryReferenceArrayToInsert.length) {
            await this.repositoryReferenceDao.insert(
                repositoryReferenceArrayToInsert,
                context
            )
        }
    }

}
