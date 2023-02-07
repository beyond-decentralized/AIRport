import { QueryWhereBase, Repository_GUID, Repository_LocalId } from '@airport/ground-control'
import { Parameter } from '../../core/entity/IAliases'
import { IQueryRelationManager } from '../../core/entity/IQueryRelationManager'
import { IFieldUtils } from '../../utils/IFieldUtils'
import { IQueryUtils } from '../../utils/IQueryUtils'

export interface IAbstractQuery {

	trackedRepoGUIDSet: Set<Repository_GUID>
	trackedRepoLocalIdSet: Set<Repository_LocalId>

	getParameters(): { [alias: string]: Parameter }

	toQuery(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryWhereBase

}
