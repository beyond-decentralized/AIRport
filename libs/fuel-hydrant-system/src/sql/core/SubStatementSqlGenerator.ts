import { IAirportDatabase, IApplicationUtils, IQEntityInternal, IQMetadataUtils, IRelationManager } from '@airport/air-control'
import {
	IEntityStateManager,
	JsonFieldQuery,
	JsonTreeQuery
} from '@airport/ground-control'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { IValidator } from '../../validation/Validator'
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

	airportDatabase: IAirportDatabase
	applicationUtils: IApplicationUtils
	entityStateManager: IEntityStateManager
	qMetadataUtils: IQMetadataUtils
	qValidator: IValidator
	relationManager: IRelationManager
	sqlQueryAdapter: ISQLQueryAdaptor
	storeDriver: IStoreDriver
	subStatementQueryGenerator: ISubStatementSqlGenerator

	getTreeQuerySql(
		jsonTreeQuery: JsonTreeQuery,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	} {
		let mappedSqlQuery = new TreeSQLQuery(
			jsonTreeQuery, dialect,
			this.airportDatabase,
			this.applicationUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this.storeDriver,
			this.subStatementQueryGenerator,
			context)

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
			jsonFieldSqlSubQuery, dialect,
			this.airportDatabase,
			this.applicationUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this.storeDriver,
			this.subStatementQueryGenerator,
			context)
		fieldSqlQuery.addQEntityMapByAlias(qEntityMapByAlias)

		const subQuerySql = fieldSqlQuery.toSQL({}, context)
		const parameterReferences = fieldSqlQuery.parameterReferences

		return {
			parameterReferences,
			subQuerySql
		}
	}

}
