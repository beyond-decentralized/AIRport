import {
	DbColumn,
	DbProperty,
	QueryFieldClause,
	QueryClauseObjectType,
	Repository_GUID,
	Repository_LocalId,
	SQLDataType
} from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver';
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager';
import { IQDateField } from '../../../definition/core/field/IQDateField';
import { IQFunction } from '../../../definition/core/field/IQFunctions';
import {
	IDateOperation,
	RawDateOperation
} from '../../../definition/core/operation/IDateOperation';
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery';
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
	extends QOperableField<Date, RawDateOperation, IDateOperation, IQDateField>
	implements IQDateField {

	constructor(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		q: IQEntityInternal,
		objectType: QueryClauseObjectType = QueryClauseObjectType.FIELD
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
		super(<any>{ type: SQLDataType.DATE }, null, null, QueryClauseObjectType.FIELD_FUNCTION);
	}

	getInstance(): QDateFunction {
		return this.copyFunctions(new QDateFunction(this.value as Date, this.isQueryParameter));
	}

	toQueryFragment(
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IQueryRelationManager
	): QueryFieldClause {
		let queryFieldClause = this.rawToQueryOperableFunction(
			this, columnAliases, forSelectClause,
			trackedRepoGUIDSet, trackedRepoLocalIdSet,
			queryUtils, fieldUtils, relationManager);

		if (this.isQueryParameter) {
			this.parameterAlias = <string>queryFieldClause.value;
		}

		return queryFieldClause;
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
