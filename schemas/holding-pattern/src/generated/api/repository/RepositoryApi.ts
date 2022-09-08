import {
	REPOSITORY_API,
} from '../../../to_be_generated/common-tokens';
import {
	DEPENDENCY_INJECTION,
	Inject,
	Injected,
} from '@airport/direction-indicator';
import {
	Api,
} from '@airport/check-in';
import {
	IRepositoryManager,
} from '../../../core/RepositoryManager';
import {
	RepositoryDao,
} from '../../../dao/dao';
import {
	Repository,
} from '../../../ddl/ddl';



// An API stub for other Applications and UIs to use
@Injected()
export class RepositoryApi {
        
    @Inject()
    repositoryApi: RepositoryApi

    constructor() {
        DEPENDENCY_INJECTION.db().manualInject(this, 'repositoryApi', REPOSITORY_API)
    }
            
    async  findAll(): Promise<Repository[]> {
        return await this.repositoryApi.findAll()
    }

    async  create(
        repositoryName: string
    ): Promise<Repository> {
        return await this.repositoryApi.create(repositoryName)
    }

}
