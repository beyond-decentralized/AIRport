import {
	DbColumn,
	DbEntity
} from '@airport/ground-control'
import { IQEntity } from '../../../lingo/core/entity/Entity'
import { AbstractRawInsertValues } from '../../../lingo/query/facade/InsertValues'
import { IFieldUtils } from '../../../lingo/utils/FieldUtils'
import { IQueryUtils } from '../../../lingo/utils/QueryUtils'
import { IRelationManager } from '../../core/entity/RelationManager'
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
	) {
		super()
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

	protected valuesToJSON(
		valueSets: any[][],
		dbColumns: DbColumn[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
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
					return (<QField<any>>value).toJSON(
						this.columnAliases, false, queryUtils, fieldUtils, relationManager)
				}
			})
		})
	}

}
