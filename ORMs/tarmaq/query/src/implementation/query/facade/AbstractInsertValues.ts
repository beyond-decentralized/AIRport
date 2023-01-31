import {
	DbColumn,
	DbEntity
} from '@airport/ground-control'
import { IEntityAliases } from '../../../definition/core/entity/IAliases'
import { IQEntity } from '../../../definition/core/entity/IQEntity'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { AbstractRawInsertValues } from '../../../definition/query/facade/RawInsertValues'
import { IFieldUtils } from '../../../definition/utils/IFieldUtils'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { EntityAliases } from '../../core/entity/Aliases'
import { QField } from '../../core/field/Field'
import { getPrimitiveValue } from '../../core/field/WrapperFunctions'
import { AbstractQuery } from './AbstractQuery'

/**
 * Created by Papa on 11/17/2016.
 */

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export abstract class AbstractInsertValues<IQE extends IQEntity, ARIV extends AbstractRawInsertValues<IQE>>
	extends AbstractQuery {

	constructor(
		public rawInsertValues: ARIV,
		public columnIndexes?: number[],
		entityAliases: IEntityAliases = new EntityAliases(),
	) {
		super(entityAliases,
			entityAliases.getNewFieldColumnAliases())
	}

	protected validateColumn(
		dbColumn: DbColumn,
		dbEntity: DbEntity,
		columnName?: string
	) {
		if (!dbColumn) {
			throw new Error(`
		Could not find column ${columnName} in entity: ${dbEntity.name}
				(table: ${dbEntity.tableConfig.name})
						`)
		}
		if (dbColumn.entity.applicationVersion.application.index !==
			dbEntity.applicationVersion.application.index
			|| dbColumn.entity.index !== dbEntity.index) {
			const columnApplication = dbColumn.entity.applicationVersion.application
			const entityApplication = dbEntity.applicationVersion.application
			throw new Error(`Unexpected entity for column ${dbColumn.name}.
			Expecting:
				Domain: ${entityApplication.domain.name}
				Application: ${entityApplication.name}
				Entity: ${dbEntity.name}
			Found:
				Domain: ${columnApplication.domain.name}
				Application: ${columnApplication.name}
				Entity: ${dbColumn.entity.name}`)
		}
	}

	protected rawToQueryValuesClause(
		valueSets: any[][],
		dbColumns: DbColumn[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): any[][] {
		// let currentValueIndex = -1;
		// this.values           = [];
		return valueSets.map((
			valueSet,
			rowIndex
		) => {
			return valueSet.map((
				value,
				columnIndex
			) => {
				if (value === undefined) {
					throw new Error(`Cannot use 'undefined' in VALUES clause.`)
				}
				if (!(value instanceof QField)) {
					return getPrimitiveValue(value, dbColumns[columnIndex], rowIndex)
					// this.values.push(getPrimitiveValue(value));
					// return ++currentValueIndex;
				} else {
					return (<QField<any>>value).toQueryFragment(
						this.columnAliases, false,
						this.trackedRepoGUIDSet, this.trackedRepoLocalIdSet,
						queryUtils, fieldUtils, relationManager)
				}
			})
		})
	}

}
