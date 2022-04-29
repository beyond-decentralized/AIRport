import { IQEntityInternal } from '@airport/air-control'
import {
	JsonFieldQuery,
	JsonTreeQuery
} from '@airport/ground-control'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { FieldSQLQuery } from '../FieldSQLQuery'
import { TreeSQLQuery } from '../TreeSQLQuery'
import { SQLDialect } from './SQLQuery'

export interface ISubStatementSqlGenerator {

	getTreeQuerySql(
		jsonTreeQuery: JsonTreeQuery,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	}

	getFieldQuerySql(
		jsonFieldSqlSubQuery: JsonFieldQuery,
		dialect: SQLDialect,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal },
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	}

}

export class SubStatementSqlGenerator
	implements ISubStatementSqlGenerator {

	getTreeQuerySql(
		jsonTreeQuery: JsonTreeQuery,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	} {
		let mappedSqlQuery = new TreeSQLQuery(
			jsonTreeQuery, dialect, context)

		const subQuerySql = mappedSqlQuery.toSQL({}, context)
		const parameterReferences = mappedSqlQuery.parameterReferences

		return {
			parameterReferences,
			subQuerySql
		}
	}

	getFieldQuerySql(
		jsonFieldSqlSubQuery: JsonFieldQuery,
		dialect: SQLDialect,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal },
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	} {
		let fieldSqlQuery = new FieldSQLQuery(
			jsonFieldSqlSubQuery, dialect, context)
		fieldSqlQuery.addQEntityMapByAlias(qEntityMapByAlias)

		const subQuerySql = fieldSqlQuery.toSQL({}, context)
		const parameterReferences = fieldSqlQuery.parameterReferences

		return {
			parameterReferences,
			subQuerySql
		}
	}

}
