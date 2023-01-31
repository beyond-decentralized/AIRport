import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IApplicationUtils,
	IEntityStateManager,
	QueryField,
	QueryTree
} from '@airport/ground-control'
import {
	IQEntityInternal,
	IQueryUtils,
	IQueryRelationManager
} from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { IValidator } from '../../validation/Validator'
import { FieldSQLQuery } from '../FieldSQLQuery'
import { TreeSQLQuery } from '../TreeSQLQuery'
import { SQLDialect } from './SQLQuery'

export interface ISubStatementSqlGenerator {

	getTreeQuerySql(
		treeQuery: QueryTree,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	}

	getFieldQuerySql(
		fieldSubQuery: QueryField,
		dialect: SQLDialect,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal },
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	}

}

@Injected()
export class SubStatementSqlGenerator
	implements ISubStatementSqlGenerator {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	applicationUtils: IApplicationUtils

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	qMetadataUtils: IQMetadataUtils

	@Inject()
	queryUtils: IQueryUtils

	@Inject()
	qValidator: IValidator

	@Inject()
	relationManager: IQueryRelationManager

	@Inject()
	sqlQueryAdapter: ISQLQueryAdaptor

	@Inject()
	storeDriver: IStoreDriver

	@Inject()
	utils: IUtils

	getTreeQuerySql(
		treeQuery: QueryTree,
		dialect: SQLDialect,
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	} {
		let mappedSqlQuery = new TreeSQLQuery(
			treeQuery, dialect,
			this.airportDatabase,
			this.applicationUtils,
			this.queryUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this.storeDriver,
			this,
			this.utils,
			context)

		const subQuerySql = mappedSqlQuery.toSQL({}, context)
		const parameterReferences = mappedSqlQuery.parameterReferences

		return {
			parameterReferences,
			subQuerySql
		}
	}

	getFieldQuerySql(
		fieldSubQuery: QueryField,
		dialect: SQLDialect,
		qEntityMapByAlias: { [entityAlias: string]: IQEntityInternal },
		context: IFuelHydrantContext,
	): {
		parameterReferences: (number | string)[],
		subQuerySql: string
	} {
		let fieldSqlQuery = new FieldSQLQuery(
			fieldSubQuery, dialect,
			this.airportDatabase,
			this.applicationUtils,
			this.queryUtils,
			this.entityStateManager,
			this.qMetadataUtils,
			this.qValidator,
			this.relationManager,
			this.sqlQueryAdapter,
			this.storeDriver,
			this,
			this.utils,
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
