import {IContext}          from '@airport/di'
import {
	DistributionStrategy,
	PlatformType,
	PortableQuery
}                          from '@airport/ground-control'
import {IObservable}       from '@airport/observe'
import {ICredentials}      from '@airport/terminal-map'
import {ITransaction}      from '../../ITransaction'
import {IOperationContext} from '../../processing/OperationContext'

export interface ITransactionalServer {

	init(): Promise<void>

	addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		credentials: ICredentials,
		context: IOperationContext<any, any>
	): Promise<number>

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray>

	findOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<E>

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<IObservable<EntityArray>>

	searchOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<IObservable<E>>

	insertValues(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		context: IOperationContext<any, any>,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number>

	insertValuesGetIds(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		context: IOperationContext<any, any>
	): Promise<number[] | string[] | number[][] | string[][]>

	updateValues(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		context: IOperationContext<any, any>
	): Promise<number>

	deleteWhere(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		context: IOperationContext<any, any>
	): Promise<number>

}
