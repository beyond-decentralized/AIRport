import { JsonStatement, Repository_GUID, Repository_LocalId } from '@airport/ground-control'
import { Parameter } from '../../core/entity/Aliases'
import { IRelationManager } from '../../core/entity/IRelationManager'
import { IFieldUtils } from '../../utils/IFieldUtils'
import { IQueryUtils } from '../../utils/IQueryUtils'

export interface IAbstractQuery {

	trackedRepoGUIDSet: Set<Repository_GUID>
	trackedRepoLocalIdSet: Set<Repository_LocalId>

	getParameters(): { [alias: string]: Parameter }

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonStatement

}
