import { JsonStatement, Repository_GUID } from '@airport/ground-control'
import { Parameter } from '../../core/entity/Aliases'
import { IRelationManager } from '../../core/entity/IRelationManager'
import { IFieldUtils } from '../../utils/IFieldUtils'
import { IQueryUtils } from '../../utils/IQueryUtils'

export interface IAbstractQuery {

	trackedRepoGUIDSet: Set<Repository_GUID>

	getParameters(): { [alias: string]: Parameter }

	toJSON(
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JsonStatement

}
