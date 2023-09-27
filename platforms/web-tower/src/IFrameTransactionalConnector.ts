import { SubscriptionCountSubject } from '@airport/autopilot';
import {
	Message_Leg,
	IAirMessageUtils,
	IApiCallRequestMessage,
	IApiCallResponseMessage,
	IMessage,
	Message_Type_Group,
	INTERNAL_Message_Type,
	ISubscriptionMessage,
	SUBSCRIPTION_Message_Type,
	IObservableApiCallRequestMessage,
	IObservableApiCallResponseMessage,
	IMessageOriginOrDestination,
	Message_OriginOrDestination_Type,
	CRUD_Message_Type,
	IApiMessage,
	Message_Direction
} from '@airport/aviation-communication';
import {
	IContext,
	IInjected,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IApplicationVersion,
	IDomain,
	Domain_Name,
	IAirEntity,
	IApplicationNameUtils,
	ISaveResult,
	ITransactionalConnector,
	PortableQuery
} from '@airport/ground-control';
import {
	IEntityContext
} from '@airport/tarmaq-entity';
import {
	IQueryContext
} from '@airport/tarmaq-query';
import {
	AppState,
	IApplicationLoader,
	IGetLatestApplicationVersionByApplication_NameMessage,
	IInitializeConnectionMessage,
	ILocalAPIServer,
	IPortableQueryMessage,
	IReadQueryMessage,
	IRetrieveDomainMessage,
	ISaveMessage,
	ITerminalStore
} from '@airport/terminal-map';
import { IApplicationStore } from '@airport/tower';
import { Observable } from 'rxjs';
import { v4 as guidv4 } from 'uuid';

export interface IIframeTransactionalConnector
	extends ITransactionalConnector {

	getLatestApplicationVersionMapByApplication_FullName(
		applicationName: string
	): Promise<IApplicationVersion>

	initializeConnection(): Promise<void>

	processMessage(
		message: IApiCallRequestMessage
			| IObservableApiCallRequestMessage
			| IApiCallResponseMessage
			| IInitializeConnectionMessage
			| IGetLatestApplicationVersionByApplication_NameMessage
			| IRetrieveDomainMessage,
		origin: string
	): Promise<void>

	retrieveDomain(
		domainName: Domain_Name
	): Promise<IDomain>

}

@Injected()
export class IframeTransactionalConnector
	implements IIframeTransactionalConnector {

	@Inject()
	airMessageUtils: IAirMessageUtils

	@Inject()
	applicationLoader: IApplicationLoader

	@Inject()
	applicationStore: IApplicationStore

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	localApiServer: ILocalAPIServer

	@Inject()
	terminalStore: ITerminalStore

	internal = false

	constructor() {
		setTimeout(() => {
			if (globalThis.repositoryAutoload !== false) {
				setInterval(() => {
					this.pruneSubscriptions();
				}, 10000)
			}
		}, 2000)
	}

	private pruneSubscriptions(): void {
		const lastValidPingMillis = new Date().getTime() - 10000
		const staleSubscriptionIds = []

		const clientSubscriptionMap = this.applicationStore.state.clientSubscriptionMap
		for (const [subscriptionId, subscriptionRecord] of clientSubscriptionMap) {
			if (subscriptionRecord.lastActive < lastValidPingMillis) {
				staleSubscriptionIds.push(subscriptionId)
			}
		}
		for (const staleSubscriptionId of staleSubscriptionIds) {
			clientSubscriptionMap.get(staleSubscriptionId).subscription.unsubscribe()
			clientSubscriptionMap.delete(staleSubscriptionId)
		}
	}

	async processMessage(
		message: IApiCallRequestMessage
			| IObservableApiCallRequestMessage
			| IApiCallResponseMessage
			| IInitializeConnectionMessage
			| IGetLatestApplicationVersionByApplication_NameMessage
			| IRetrieveDomainMessage,
		origin: string
	): Promise<void> {
		if (!this.airMessageUtils.validateIncomingMessage(message)
			|| !this.airMessageUtils.isFromValidFrameworkDomain(origin)) {
			return
		}

		switch (message.typeGroup) {
			case Message_Type_Group.API: {
				await this.handleApiRequest(message as IApiCallRequestMessage, origin)
				break
			}
			case Message_Type_Group.INTERNAL: {
				this.handleInternalMessage(message as
					IInitializeConnectionMessage
					| IGetLatestApplicationVersionByApplication_NameMessage
					| IRetrieveDomainMessage)
				break
			}
			case Message_Type_Group.SUBSCRIPTION: {
				await this.handleSubscriptionRequest(message as ISubscriptionMessage, origin)
				break
			}
			default: {
				throw new Error(`Unexpected message.typeGroup : ${message.typeGroup}`)
			}
		}
	}

	async callApi(
		apiInput: IApiCallRequestMessage
	): Promise<IApiCallResponseMessage> {
		return await this.sendMessage<IApiCallRequestMessage, IApiCallResponseMessage>({
			...apiInput,
			...this.getCoreFields(Message_Type_Group.API),
			actor: null
		})
	}

	async callApiNoReturn(
		apiInput: IApiCallRequestMessage
	): Promise<void> {
		await this.sendMessageNoReturn<IApiCallRequestMessage>({
			...apiInput,
			...this.getCoreFields(Message_Type_Group.API),
			actor: null
		})
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext,
	): Promise<EntityArray> {
		return await this.sendMessage<IReadQueryMessage, EntityArray>({
			...this.getCoreFields(Message_Type_Group.CRUD),
			portableQuery,
			repository: context.repository,
			type: CRUD_Message_Type.FIND
		})
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext,
	): Promise<E> {
		return await this.sendMessage<IReadQueryMessage, E>({
			...this.getCoreFields(Message_Type_Group.CRUD),
			portableQuery,
			repository: context.repository,
			type: CRUD_Message_Type.FIND_ONE
		})
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext,
	): Observable<EntityArray> {
		return this.sendObservableMessage<EntityArray>(
			portableQuery,
			context,
			SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE
		);
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext
	): Observable<E> {
		return this.sendObservableMessage<E>(
			portableQuery,
			context,
			SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE
		);
	}

	async save<E extends IAirEntity, T = E | E[]>(
		entity: T,
		context: IEntityContext,
	): Promise<ISaveResult> {
		const dbEntity = context.dbEntity;
		return await this.sendMessage<ISaveMessage<any>, ISaveResult>({
			...this.getCoreFields(Message_Type_Group.CRUD),
			dbEntity: {
				_localId: dbEntity._localId,
				_applicationVersionLocalId: dbEntity.applicationVersion._localId
			},
			entity,
			type: CRUD_Message_Type.SAVE
		})
	}

	// FIXME: check if ensureGeneratedValues is needed
	async insertValues(
		portableQuery: PortableQuery,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		return await this.sendMessage<IPortableQueryMessage, number>({
			...this.getCoreFields(Message_Type_Group.CRUD),
			portableQuery,
			type: CRUD_Message_Type.INSERT_VALUES
		})
	}

	async insertValuesGetLocalIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[][]> {
		return await this.sendMessage<IPortableQueryMessage, number[][]>({
			...this.getCoreFields(Message_Type_Group.CRUD),
			portableQuery,
			type: CRUD_Message_Type.INSERT_VALUES_GET_IDS
		})
	}

	async updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return await this.sendMessage<IPortableQueryMessage, number>({
			...this.getCoreFields(Message_Type_Group.CRUD),
			portableQuery,
			type: CRUD_Message_Type.UPDATE_VALUES
		})
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return await this.sendMessage<IPortableQueryMessage, number>({
			...this.getCoreFields(Message_Type_Group.CRUD),
			portableQuery,
			type: CRUD_Message_Type.DELETE_WHERE
		})
	}

	async getLatestApplicationVersionMapByApplication_FullName(
		fullApplication_Name: string
	): Promise<IApplicationVersion> {
		return await this.sendMessageAndGetResponse<IGetLatestApplicationVersionByApplication_NameMessage, IApplicationVersion>({
			...this.getCoreFields(Message_Type_Group.INTERNAL),
			fullApplication_Name: fullApplication_Name,
			type: INTERNAL_Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME
		})
	}

	async initializeConnection(): Promise<void> {
		while (this.applicationStore.state.appState === AppState.NOT_INITIALIZED
			|| this.applicationStore.state.appState === AppState.START_INITIALIZING) {
			await this.wait(100)
			await this.isConnectionInitialized()
		}
	}

	async retrieveDomain(
		domainName: Domain_Name
	): Promise<IDomain> {
		return await this.sendMessageAndGetResponse<IRetrieveDomainMessage, IDomain>({
			...this.getCoreFields(Message_Type_Group.INTERNAL),
			domainName,
			type: INTERNAL_Message_Type.RETRIEVE_DOMAIN
		})
	}

	private handleInternalMessage(
		message: IInitializeConnectionMessage
			| IGetLatestApplicationVersionByApplication_NameMessage
			| IRetrieveDomainMessage
	): void {
		switch (message.type) {
			case INTERNAL_Message_Type.APP_INITIALIZING: {
				if (this.applicationStore.state.appState === AppState.NOT_INITIALIZED
					&& (message as IInitializeConnectionMessage).returnedValue) {
					// console.log(`--==<<(( path: ${location.pathname} appState: ${this.applicationStore.state.appState}, domain: ${message.domain}, app: ${message.application} ))>>==--`)
					// console.log(message.result)
					const lastTerminalState = this.terminalStore.getTerminalState()
					this.terminalStore.state.next({
						...lastTerminalState,
						lastIds: (message as IInitializeConnectionMessage).returnedValue
					})
					this.applicationStore.state.appState = AppState.START_INITIALIZING
				}
				break
			}
			case INTERNAL_Message_Type.RETRIEVE_DOMAIN:
			case INTERNAL_Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
				this.completeAsyncMessage(message as
					IGetLatestApplicationVersionByApplication_NameMessage
					| IRetrieveDomainMessage)
				break
			}
			case INTERNAL_Message_Type.APP_INITIALIZED: {
				// Nothing to do as of now
				break
			}
			default: {
				console.error(`Invalid INTERNAL message type ${message.type}`)
				break
			}
		}
	}

	private async handleApiRequest(
		request: IApiCallRequestMessage,
		origin: string
	) {
		while (this.applicationStore.state.appState !== AppState.INITIALIZED) {
			await this.wait(100)
		}
		const response = await this.localApiServer.handleRequest(request)

		this.sendMessageToParentWindow(response, origin)
	}

	private async handleSubscriptionRequest(
		request: ISubscriptionMessage,
		origin: string
	) {
		while (this.applicationStore.state.appState !== AppState.INITIALIZED) {
			await this.wait(100)
		}
		const subscriptionId = request.subscriptionId
		const clientSubscriptionMap = this.applicationStore.state.clientSubscriptionMap
		switch (request.type) {
			case SUBSCRIPTION_Message_Type.API_SUBSCRIBE: {
				const response = await this.localApiServer.handleRequest(request as IObservableApiCallRequestMessage)
				const subscription = response.returnedValue.subscribe(payload => {
					this.sendMessageToParentWindow({
						...response,
						subscriptionId,
						type: SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA,
						returnedValue: payload
					} as IObservableApiCallResponseMessage, origin)
				})
				clientSubscriptionMap.set(subscriptionId, {
					lastActive: new Date().getTime(),
					subscription
				})
				break
			}
			case SUBSCRIPTION_Message_Type.SUBSCRIPTION_PING: {
				const subscriptionRecord = clientSubscriptionMap.get(subscriptionId)
				if (!subscriptionRecord) {
					break
				}
				subscriptionRecord.lastActive = new Date().getTime()
			}
			case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE: {
				const subscriptionRecord = clientSubscriptionMap.get(subscriptionId)
				if (!subscriptionRecord) {
					console.log(`Could not find subscription for subscriptionId:
${subscriptionId}
					`)
					break
				}
				console.log(`Unsubscribing from Subscription Id: ${subscriptionId}`)
				subscriptionRecord.subscription.unsubscribe()
				clientSubscriptionMap.delete(subscriptionId)
				// No need to send a message back, no transaction is started
				// for the Unsubscribe operation
				break
			}
			case SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA:
			case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBTION_DATA:
			case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBTION_DATA: {
				const observableRequestSubject = this.applicationStore.state
					.clientSubjectCache.getSubject(request.subscriptionId)
				if (!observableRequestSubject) {
					return
				}
				if (request.errorMessage) {
					observableRequestSubject.error(request.errorMessage)
				} else {
					observableRequestSubject.next((request as IObservableApiCallResponseMessage).returnedValue)
				}
				return
			}
			default: {
				throw new Error(`Invalid ISubscriptionMessage
type:
	${request.type}
expecting only API message types`)
			}
		}
	}

	private sendMessageToParentWindow(
		message: IMessage,
		targetOrigin: string = this.applicationStore.state.hostServer
	): void {
		this.airMessageUtils.prepMessageToSend(message)

		window.parent.postMessage(message, targetOrigin)
	}

	private completeAsyncMessage(
		message: IApiCallResponseMessage
			| IGetLatestApplicationVersionByApplication_NameMessage
			| IRetrieveDomainMessage
	): void {
		const messageRecord = this.applicationStore.state.pendingMessageMap.get(message.id);
		if (!messageRecord) {
			return
		}

		if (message.errorMessage) {
			messageRecord.reject(message.errorMessage)
		} else if (message.typeGroup === Message_Type_Group.API) {
			messageRecord.resolve(message)
		} else {
			messageRecord.resolve(message.returnedValue)
		}
		this.applicationStore.state.pendingMessageMap.delete(message.id)
	}

	private getCoreFields(
		typeGroup: Message_Type_Group
	): {
		direction: Message_Direction
		id: string,
		isAIRportMessage: true,
		messageLeg: Message_Leg.TO_HUB,
		origin: IMessageOriginOrDestination,
		typeGroup: Message_Type_Group
	} {
		let app = this.applicationStore.state.application
		let domain = this.applicationStore.state.domain
		let id = guidv4()
		let messageLeg = Message_Leg.TO_HUB
		return {
			direction: Message_Direction.REQUEST,
			id,
			isAIRportMessage: true,
			messageLeg,
			origin: {
				app,
				domain,
				protocol: location.protocol,
				type: Message_OriginOrDestination_Type.APPLICATION
			},
			typeGroup
		}
	}

	private async sendMessage<IMessageIn extends IMessage, ReturnType>(
		message: IMessageIn
	): Promise<ReturnType> {
		while (!await this.isConnectionInitialized()) {
			await this.wait(100)
		}
		return await this.sendMessageAndGetResponse(message)
	}

	private async sendMessageNoReturn<IMessageIn extends IMessage>(
		message: IMessageIn
	): Promise<void> {
		while (!await this.isConnectionInitialized()) {
			await this.wait(100)
		}
		// (message as any).subscriptionId = (<IInjected>this).__container__.context.id
		this.sendMessageToParentWindow(message)
	}

	private async sendMessageAndGetResponse<IMessageIn extends IMessage, ReturnType>(
		message: IMessageIn
	): Promise<ReturnType> {
		(message as IApiMessage).transactionId = (<IInjected>this).__container__.context.id
		this.sendMessageToParentWindow(message)

		return new Promise<ReturnType>((resolve, reject) => {
			this.applicationStore.state.pendingMessageMap.set(message.id, {
				message,
				resolve,
				reject
			})
		})
	}

	private sendObservableMessage<T>(
		portableQuery: PortableQuery,
		context: IQueryContext,
		type: SUBSCRIPTION_Message_Type,
		cachedSqlQueryId?: number
	): Observable<T> {
		const coreFields = this.getCoreFields(Message_Type_Group.SUBSCRIPTION)
		let subscriptionId = (<IInjected>this).__container__.context.id
		let message = {
			...coreFields,
			cachedSqlQueryId,
			portableQuery,
			repository: context.repository,
			subscriptionId,
			type
		}

		const subject = new SubscriptionCountSubject<T, IMessage>(
			subscriptionId,
			{
				...coreFields
			},
			() => {
				this.sendMessageToParentWindow({
					...message
				})
			},
			() => {
				let unsubscribeType = SUBSCRIPTION_Message_Type.SEARCH_UNSUBSCRIBE
				if (type === SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE) {
					unsubscribeType = SUBSCRIPTION_Message_Type.SEARCH_ONE_UNSUBSCRIBE
				}
				this.sendMessageNoReturn<ISubscriptionMessage>({
					...coreFields,
					subscriptionId,
					type: unsubscribeType
				}).then()
			}
		)
		this.applicationStore.state.clientSubjectCache
			.addSubject(subscriptionId, subject)

		return subject;
	}

	private wait(
		milliseconds: number
	): Promise<void> {
		return new Promise((resolve, _reject) => {
			setTimeout(() => {
				resolve()
			}, milliseconds)
		})
	}

	private async isConnectionInitialized(): Promise<boolean> {
		switch (this.applicationStore.state.appState) {
			case AppState.NOT_INITIALIZED:
				break;
			case AppState.INITIALIZING_IN_PROGRESS:
				return false
			case AppState.START_INITIALIZING:
				this.applicationStore.state.appState = AppState.INITIALIZING_IN_PROGRESS
				// const lastIds = this.terminalStore.getLastIds()
				// console.log(` path: ${location.pathname} INITIALIZING_IN_PROGRESS appIndex: ${lastIds.applications} ))>>==--`)
				await this.applicationLoader.load(this.terminalStore.getLastIds())
				this.applicationStore.state.appState = AppState.INITIALIZED
				await this.applicationLoader.initialize()
				this.sendMessageToParentWindow({
					...this.getCoreFields(Message_Type_Group.INTERNAL),
					fullApplication_Name: this.applicationNameUtils.
						getApplication_FullName(
							this.applicationLoader.getApplication()),
					type: INTERNAL_Message_Type.APP_INITIALIZED
				} as IGetLatestApplicationVersionByApplication_NameMessage)
				return true
			case AppState.INITIALIZED:
				return true
		}

		let jsonApplication = this.applicationLoader.getApplication()
		this.applicationStore.state.domain = jsonApplication.domain
		this.applicationStore.state.application = jsonApplication.name

		this.sendMessageToParentWindow({
			...this.getCoreFields(Message_Type_Group.INTERNAL),
			jsonApplication,
			type: INTERNAL_Message_Type.APP_INITIALIZING
		} as IInitializeConnectionMessage)
		return false
	}

}
