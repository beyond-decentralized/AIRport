import {DbColumn} from '@airport/ground-control'
import {
	IFieldUtils
}                 from '../../../lingo/utils/FieldUtils'
import {
	IQueryUtils
}                 from '../../../lingo/utils/QueryUtils'
import {IQEntity} from '../../../lingo/core/entity/Entity'
import {AbstractRawInsertValues} from '../../../lingo/query/facade/InsertValues'
import {QField} from '../../core/field/Field'
import {getPrimitiveValue} from '../../core/field/WrapperFunctions'
import {AbstractQuery} from './AbstractQuery'

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

	protected valuesToJSON(
		valueSets: any[][],
		dbColumns: DbColumn[],
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
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
					throw `Cannot use 'undefined' in VALUES clause.`
				}
				if (!(value instanceof QField)) {
					return getPrimitiveValue(value, dbColumns[columnIndex], rowIndex)
					// this.values.push(getPrimitiveValue(value));
					// return ++currentValueIndex;
				} else {
					return (<QField<any>>value).toJSON(
						this.columnAliases, false, queryUtils, fieldUtils)
				}
			})
		})
	}

}
