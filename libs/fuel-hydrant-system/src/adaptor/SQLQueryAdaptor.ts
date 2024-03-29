import {
	QueryFieldClause,
	QueryBaseClause,
	QueryFunctionCall,
	SQLDataType
}                          from '@airport/ground-control'
import {
	IQEntityInternal,
	Parameter
}                          from '@airport/tarmaq-query'
import { IFuelHydrantContext } from '../FuelHydrantContext'

/**
 * Created by Papa on 8/27/2016.
 */
export interface ISQLQueryAdaptor {

	getParameterReference(
		parameterReferences: (number | string)[],
		newReference: number | string
	): string;

	dateToDbQuery(date: Date): string;

	getResultArray(rawResponse: any): any[];

	/**
	 * Options in returned result:
	 *
	 * Object mapped by ?column? name
	 * Array of values
	 *
	 * This is a common API on top of both
	 */
	getResultCellValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any;

	getFunctionAdaptor(): ISQLFunctionAdaptor;

	getOffsetFragment(offset: number): string;

	getLimitFragment(limit: number): string;

	getParameterValue(parameter: Parameter): any;

	getValue(value: any): any;

}

export interface ISqlValueProvider {

	getFunctionCallValue(
		rawValue: any,
		recordSelectColumnInfo: boolean,
		context: IFuelHydrantContext,
	): string;

	getFieldFunctionValue(
		aField: QueryFieldClause,
		defaultCallback: () => string,
		recordSelectColumnInfo: boolean,
		context: IFuelHydrantContext,
	): string;

}

export interface ISQLFunctionAdaptor {

	getFunctionCalls(
		clause: QueryBaseClause,
		innerValue: string,
		qEntityMapByAlias: { [alias: string]: IQEntityInternal },
		sqlValueProvider: ISqlValueProvider,
		context: IFuelHydrantContext,
	): string;

	getFunctionCall(
		queryFunctionCall: QueryFunctionCall,
		value: string,
		qEntityMapByAlias: { [entityName: string]: IQEntityInternal },
		sqlValueProvider: ISqlValueProvider,
		context: IFuelHydrantContext,
	): string;

}

export abstract class AbstractFunctionAdaptor
	implements ISQLFunctionAdaptor {

	getFunctionCalls(
		clause: QueryBaseClause,
		innerValue: string,
		qEntityMapByAlias: { [alias: string]: IQEntityInternal },
		sqlValueProvider: ISqlValueProvider,
		context: IFuelHydrantContext,
	): string {
		clause.appliedFunctions.forEach((appliedFunction) => {
			innerValue = this.getFunctionCall(
				appliedFunction, innerValue, qEntityMapByAlias, sqlValueProvider, context)
		})

		return innerValue
	}

	abstract getFunctionCall(
		queryFunctionCall: QueryFunctionCall,
		value: string,
		qEntityMapByAlias: { [entityName: string]: IQEntityInternal },
		sqlValueProvider: ISqlValueProvider,
		context: IFuelHydrantContext,
	): string;

}
