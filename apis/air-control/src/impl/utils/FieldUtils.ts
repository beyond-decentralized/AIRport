import {DI}               from '@airport/di'
import {JsonFieldQuery}   from '@airport/ground-control'
import {FIELD_UTILS}      from '../../diTokens'
import {IEntityAliases}   from '../../lingo/core/entity/Aliases'
import {IQOrderableField} from '../../lingo/core/field/Field'
import {RawFieldQuery}    from '../../lingo/query/facade/FieldQuery'
import {IFieldUtils}      from '../../lingo/utils/FieldUtils'
import {IQueryUtils}      from '../../lingo/utils/QueryUtils'
import {FieldQuery}       from '../query/facade/FieldQuery'


declare function require(moduleName: string): any;

export class FieldUtils
	implements IFieldUtils {

	FieldQuery: typeof FieldQuery

	getFieldQueryJson<IQF extends IQOrderableField<IQF>>(
		fieldSubQuery: RawFieldQuery<IQF>,
		entityAliases: IEntityAliases,
		queryUtils: IQueryUtils
	): JsonFieldQuery {
		if (!this.FieldQuery) {
			this.FieldQuery = require('../query/facade/FieldQuery').FieldQuery
		}
		let subSelectQuery = new this.FieldQuery(fieldSubQuery, entityAliases)

		return subSelectQuery.toJSON(queryUtils, this)
	}
}
DI.set(FIELD_UTILS, FieldUtils)
