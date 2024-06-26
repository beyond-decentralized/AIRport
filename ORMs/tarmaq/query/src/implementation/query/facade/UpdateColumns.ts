import {
	IEntityUpdateColumns,
	IQEntity
} from '../../../definition/core/entity/IQEntity'
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { RawUpdateColumns } from '../../../definition/query/facade/RawUpdate'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { QField } from '../../core/field/QField'
import { wrapPrimitive } from '../../core/field/WrapperFunctions'
import { AbstractUpdate } from './AbstractUpdate'

export class UpdateColumns<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>
	extends AbstractUpdate<IQE, RawUpdateColumns<IEUC, IQE>> {

	constructor(
		rawUpdate: RawUpdateColumns<IEUC, IQE>
	) {
		super(rawUpdate)
	}

	protected rawToQuerySetClause(
		set: any,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): IEUC {
		const setClause: IEUC = <IEUC>{}
		const dbEntity = (<IQEntityInternal><any>this.rawUpdate.UPDATE)
			.__driver__.dbEntity
		const dbColumnMap = dbEntity.columnMap
		const idDbColumnMap = dbEntity.idColumnMap
		for (const columnName in set) {
			let value = set[columnName]
			if (value === undefined) {
				delete set[columnName]
				continue
			}
			if (!dbColumnMap[columnName]) {
				throw new Error(`
	Unknown column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`)
			}
			if (idDbColumnMap[columnName]) {
				throw new Error(`
	Cannot update @Id columns:
	Column: '${columnName}' for entity: '${dbEntity.name}'
			(table: '${dbEntity.tableConfig.name}').
				`)
			}
			value = wrapPrimitive(value)
			if (!value.toQueryFragment) {
				throw `Unexpected value ${JSON.stringify(value)} for property ${columnName} of entity ${dbEntity.name}`
			}
			setClause[columnName] = (<QField<any>>value).toQueryFragment(
				this.columnAliases, false,
				this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
				queryUtils, fieldUtils, queryRelationManager)
		}

		return setClause
	}

}
