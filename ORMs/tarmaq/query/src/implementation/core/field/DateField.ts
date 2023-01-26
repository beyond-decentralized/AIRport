import {
	DbColumn,
	DbProperty,
	JSONClauseField,
	JSONClauseObjectType,
	Repository_GUID,
	SQLDataType
} from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQDateField } from '../../../definition/core/field/DateField';
import { IQFunction } from '../../../definition/core/field/Functions';
import {
	IDateOperation,
	JSONRawDateOperation
} from '../../../definition/core/operation/DateOperation';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { DateOperation } from '../operation/DateOperation';
import { QOperableField } from './OperableField';

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
		q: IQEntityInternal,
		objectType: JSONClauseObjectType = JSONClauseObjectType.FIELD
	) {
		super(dbColumn, dbProperty, q, objectType, new DateOperation());
	}

	getInstance(qEntity: IQEntityInternal = this.q): QDateField {
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
		trackedRepoGUIDSet: Set<Repository_GUID>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONClauseField {
		let json = this.operableFunctionToJson(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet,
			queryUtils, fieldUtils, relationManager);

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
