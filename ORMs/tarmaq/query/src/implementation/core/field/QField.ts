import {
	DbColumn,
	DbProperty,
	QueryFieldClause,
	QueryClauseObjectType,
	QueryField,
	QueryFunctionCall,
	Repository_GUID,
	Repository_LocalId,
	QuerySortOrder,
	SQLDataType
} from '@airport/ground-control';
import { IFieldColumnAliases } from '../../../definition/core/entity/IAliases';
import { IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver';
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager';
import {
	IQFieldInternal,
	IQOrderableField
} from '../../../definition/core/field/IQFieldInternal';
import { IFieldInOrderBy } from '../../../definition/core/field/IFieldInOrderBy';
import { IQFunction } from '../../../definition/core/field/IQFunctions';
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { FieldColumnAliases } from '../entity/Aliases';
import { IAppliable } from '../../../definition/core/field/IAppliable';
import { FieldInOrderBy } from './FieldInOrderBy';

/**
 * Created by Papa on 4/21/2016.
 */

export abstract class QField<IQF extends IQOrderableField<IQF>>
	implements IQFieldInternal<IQF>,
	IAppliable<QueryFieldClause, IQF> {

	// TODO: figure out if this is ever used
	alias: string;
	__appliedFunctions__: QueryFunctionCall[] = [];

	__fieldSubQuery__: RawFieldQuery<IQF>;



	constructor(
		public dbColumn: DbColumn,
		public dbProperty: DbProperty,
		public q: IQEntityInternal,
		public objectType: QueryClauseObjectType,
	) {
	}

	/**
	 protected getFieldKey() {
		let rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.parentQ.getRootJoinEntity());
		let key = `${queryRelationManager.getPositionAlias(rootEntityPrefix, this.parentQ.fromClausePosition)}.${this.fieldName}`;
		return key;
	}
	 */

	applySqlFunction(sqlFunctionCall: QueryFunctionCall): IQF {
		let appliedField = this.getInstance();
		appliedField.__appliedFunctions__.push(sqlFunctionCall);

		return <IQF><any>appliedField;
	}

	toQueryFragment(
		columnAliases: IFieldColumnAliases<IQF>,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryFieldClause {
		let alias;
		if (forSelectClause) {
			alias = columnAliases.getNextAlias(this);
		}
		let rootEntityPrefix;
		if (this.__fieldSubQuery__) {
			rootEntityPrefix = columnAliases.entityAliases.getOnlyAlias();
		} else {
			rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.q.__driver__.getRootJoinEntity());
		}
		let queryFieldClause: QueryFieldClause = {
			appliedFunctions: this.appliedFunctionsToJson(
				this.__appliedFunctions__, columnAliases,
				trackedRepoGUIDSet, trackedRepoLocalIdSet,
				queryUtils, fieldUtils, queryRelationManager),
			applicationIndex: this.dbProperty.entity.applicationVersion._localId,
			entityIndex: this.dbProperty.entity.index,
			fieldAlias: alias,
			propertyIndex: this.dbProperty.index,
			columnIndex: this.dbColumn.index,
			tableAlias: queryRelationManager.getPositionAlias(rootEntityPrefix, this.q.__driver__.fromClausePosition),
			objectType: this.objectType,
			dataType: this.dbColumn.type as SQLDataType
		};
		if (this.__fieldSubQuery__) {
			queryFieldClause.fieldSubQuery = fieldUtils.getFieldQueryJson(
				this.__fieldSubQuery__, columnAliases.entityAliases,
				trackedRepoGUIDSet, trackedRepoLocalIdSet,
				queryUtils);
			queryFieldClause.objectType = QueryClauseObjectType.FIELD_QUERY;
		}

		return queryFieldClause;
	}

	ASC(): IFieldInOrderBy<IQF> {
		return new FieldInOrderBy<IQF>(this, QuerySortOrder.ASCENDING);
	}

	DESC(): IFieldInOrderBy<IQF> {
		return new FieldInOrderBy<IQF>(this, QuerySortOrder.DESCENDING);
	}

	abstract getInstance(qEntity?: IQEntityInternal): QField<IQF>;

	addSubQuery(
		subQuery: RawFieldQuery<IQF>
	): IQF {
		let appliedField = this.getInstance();
		appliedField.__fieldSubQuery__ = subQuery;

		return <IQF><any>appliedField;
	}

	rawToQueryOperableFunction(
		functionObject: IQFunction<any>,
		columnAliases: FieldColumnAliases,
		forSelectClause: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryFieldClause {
		let alias;
		if (forSelectClause) {
			alias = columnAliases.getNextAlias(this);
		}
		return {
			appliedFunctions: this.appliedFunctionsToJson(
				this.__appliedFunctions__, columnAliases,
				trackedRepoGUIDSet, trackedRepoLocalIdSet,
				queryUtils, fieldUtils, queryRelationManager
			),
			fieldAlias: alias,
			objectType: this.objectType,
			dataType: this.dbColumn.type as SQLDataType,
			value: this.valueToJSON(functionObject, columnAliases,
				false, true,
				trackedRepoGUIDSet, trackedRepoLocalIdSet,
				queryUtils, fieldUtils, queryRelationManager)
		};
	}

	protected copyFunctions<QF extends QField<IQF>>(field: QF): QF {
		field.__appliedFunctions__ = this.__appliedFunctions__.slice();
		return field;
	}

	protected appliedFunctionsToJson(
		appliedFunctions: QueryFunctionCall[],
		columnAliases: IFieldColumnAliases<IQF>,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryFunctionCall[] {
		if (!appliedFunctions) {
			return appliedFunctions;
		}
		return appliedFunctions.map((appliedFunction) => {
			return this.functionCallToJson(
				appliedFunction, columnAliases,
				trackedRepoGUIDSet, trackedRepoLocalIdSet,
				queryUtils, fieldUtils, queryRelationManager);
		});
	}

	protected functionCallToJson(
		functionCall: QueryFunctionCall,
		columnAliases: IFieldColumnAliases<IQF>,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): QueryFunctionCall {
		let parameters;
		if (functionCall.functionParameters) {
			parameters = functionCall.functionParameters.map((parameter) => {
				return this.valueToJSON(
					parameter, columnAliases,
					false, false,
					trackedRepoGUIDSet, trackedRepoLocalIdSet,
					queryUtils, fieldUtils, queryRelationManager);
			});
		}
		return {
			functionType: functionCall.functionType,
			functionParameters: parameters
		};
	}

	protected valueToJSON(
		functionObject: IQFunction<any> | QField<any>,
		columnAliases: IFieldColumnAliases<IQF>,
		forSelectClause: boolean,
		fromFunctionObject: boolean,
		trackedRepoGUIDSet: Set<Repository_GUID>,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		queryRelationManager: IQueryRelationManager
	): string | QueryFieldClause | QueryField {
		if (!functionObject) {
			throw new Error(`Function object must be provided to valueToJSON function.`);
		}
		if (!fromFunctionObject && functionObject instanceof QField) {
			return functionObject.toQueryFragment(
				columnAliases, forSelectClause,
				trackedRepoGUIDSet, trackedRepoLocalIdSet,
				queryUtils, fieldUtils, queryRelationManager);
		}

		let value = (functionObject as IQFunction<any>).value;
		switch (typeof value) {
			case 'boolean':
			case 'number':
			case 'string':
				return columnAliases.entityAliases.getParams()
					.getNextAlias(functionObject as IQFunction<any>);
			case 'object':
				if (value instanceof Date) {
					return columnAliases.entityAliases.getParams()
						.getNextAlias(functionObject as IQFunction<any>);
				} else if (value instanceof Array) {
					return columnAliases.entityAliases.getParams()
						.getNextAlias(functionObject as IQFunction<any>);
				} else if (value === null) {
					return columnAliases.entityAliases.getParams()
						.getNextAlias(functionObject as IQFunction<any>);
				} else {
					throw new Error(`Unexpected query parameter type allowed types are:
boolean | Date | Date[] | number | number[] | string | string[]
`);
				}
			case 'undefined':
				throw new Error(`Undefined is not allowed as a query parameter`);
			default:
				throw new Error(`Unexpected query parameter type allowed types are:
boolean | Date | Date[] | number | number[] | string | string[]
`);
		}
		// TODO: this never gets called, is this needed?
		/*
		if (value === null || value instanceof Date) {
			return columnAliases.entityAliases.getParams()
				.getNextAlias(functionObject as IQFunction<any>)
		}
		if (value instanceof QField) {
			return value.toQueryFragment(columnAliases, forSelectClause, queryUtils, fieldUtils, queryRelationManager)
		}
		// must be a field sub-query
		let rawFieldQuery: RawFieldQuery<any> = value
		return fieldUtils.getFieldQueryJson(
			rawFieldQuery, columnAliases.entityAliases, queryUtils)
		 */
	}
}
