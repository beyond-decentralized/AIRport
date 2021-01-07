import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	SQLDataType
}                             from '@airport/ground-control';
import { IQEntityInternal }   from '../../../lingo/core/entity/Entity';
import { IQDateField }        from '../../../lingo/core/field/DateField';
import { IQFunction }         from '../../../lingo/core/field/Functions';
import {
	IDateOperation,
	JSONRawDateOperation
}                             from '../../../lingo/core/operation/DateOperation';
import { RawFieldQuery }      from '../../../lingo/query/facade/FieldQuery';
import { IFieldUtils }        from '../../../lingo/utils/FieldUtils';
import { IQueryUtils }        from '../../../lingo/utils/QueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { DateOperation }      from '../operation/DateOperation';
import { QOperableField }     from './OperableField';

/**
 * Created by Papa on 8/11/2016.
 */

export interface IQDateEntityField
	extends IQDateField {
}

export class QDateField
	extends QOperableField<Date, JSONRawDateOperation, IDateOperation, IQDateField>
	implements IQDateField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal<any>,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new DateOperation());
	}

	getInstance(qEntity: IQEntityInternal<any> = this.q): QDateField {
		return this.copyFunctions(
			new QDateField(this.dbColumn, this.dbProperty, qEntity, this.objectType));
	}

}

export class QDateFunction<T extends Date | Date[] = Date>
	extends QDateField
	implements IQFunction<T | RawFieldQuery<any>> {

	parameterAlias: string;

	constructor(
		public value: T | RawFieldQuery<QDateField>,
		protected isQueryParameter: boolean = false
	) {
		super(<any>{ type: SQLDataType.DATE }, null, null, JSONClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QDateFunction {
		return this.copyFunctions(new QDateFunction(this.value as Date, this.isQueryParameter));
	}

	toJSON(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause, queryUtils, fieldUtils);

		if (this.isQueryParameter) {
			this.parameterAlias = <string>json.v;
		}

		return json;
	}
}

export class QDateArrayFunction
	extends QDateFunction<Date[]> {

	constructor(
		public value: Date[] | RawFieldQuery<any>,
		isQueryParameter?: boolean
	) {
		super(value, isQueryParameter);
	}

	getInstance(): QDateFunction<any> {
		return this.copyFunctions(new QDateArrayFunction(this.value as Date[],
			this.isQueryParameter));
	}

}
