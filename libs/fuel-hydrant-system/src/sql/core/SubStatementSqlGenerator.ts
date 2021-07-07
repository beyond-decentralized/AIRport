import {IQEntityInternal}            from '@airport/air-control'
import {DI}                          from '@airport/di'
import {
	JsonFieldQuery,
	JsonTreeQuery
}                                    from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import {SUB_STATEMENT_SQL_GENERATOR} from '../../tokens'
import {FieldSQLQuery}               from '../FieldSQLQuery'
import {TreeSQLQuery}                from '../TreeSQLQuery'
import {SQLDialect}                  from './SQLQuery'

export interface ISubStatementSqlGenerator {

	getTreeQuerySql(
		jsonTreeQuery: JsonTreeQuery,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	): string

	getFieldQuerySql(
		jsonFieldSqlSubQuery: JsonFieldQuery,
		dialect: SQLDialect,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal<any> },
		context: IFuelHydrantContext,
	): string

}

export class SubStatementSqlGenerator
	implements ISubStatementSqlGenerator {

	getTreeQuerySql(
		jsonTreeQuery: JsonTreeQuery,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	): string {
		let mappedSqlQuery = new TreeSQLQuery(
			jsonTreeQuery, dialect, context)

		return mappedSqlQuery.toSQL({}, context)
	}

	getFieldQuerySql(
		jsonFieldSqlSubQuery: JsonFieldQuery,
		dialect: SQLDialect,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal<any> },
		context: IFuelHydrantContext,
	): string {
		let fieldSqlQuery = new FieldSQLQuery(
			jsonFieldSqlSubQuery, dialect, context)
		fieldSqlQuery.addQEntityMapByAlias(qEntityMapByAlias)

		return fieldSqlQuery.toSQL({}, context)
	}

}

DI.set(SUB_STATEMENT_SQL_GENERATOR, SubStatementSqlGenerator)
