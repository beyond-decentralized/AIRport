import { SubscriptionCountSubject } from '@airport/autopilot';
import {
	Message_Direction,
	Message_Leg,
	Message_Type,
	IAirMessageUtils,
	IApiCallRequestMessage,
	IApiCallResponseMessage,
	IMessage,
	Message_Application,
	Message_Domain,
	Message_DomainProtocol
} from '@airport/aviation-communication';
import {
	IContext,
	IInjected,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbApplicationVersion,
	DbDomain,
	DbDomain_Name,
	IAirEntity,
	IDbApplicationUtils,
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
	IGetLatestApplicationVersionByDbApplication_NameMessage,
	IInitializeConnectionMessage,
	ILocalAPIServer,
	IObservableMessageInRecord,
	IPortableQueryMessage,
	IReadQueryMessage,
	IRetrieveDomainMessage,
	ISaveMessage,
	ITerminalStore
} from '@airport/terminal-map';
import { IApplicationStore } from '@airport/tower';
import { Observable, Subject } from 'rxjs';
import { v4 as guidv4 } from 'uuid';

export interface IIframeTransactionalConnector
	extends ITransactionalConnector {

	getLatestApplicationVersionMapByDbApplication_FullName(
		applicationName: string
	): Promise<DbApplicationVersion>

	initializeConnection(): Promise<void>

	processMessage(
		message: IApiCallRequestMessage,
		origin: string
	): Promise<void>

	retrieveDomain(
		domainName: DbDomain_Name
	): Promise<DbDomain>

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
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	localApiServer: ILocalAPIServer

	@Inject()
	terminalStore: ITerminalStore

	internal = false

	async processMessage(
		message: IApiCallRequestMessage
			| IApiCallResponseMessage
			| IInitializeConnectionMessage
			| IGetLatestApplicationVersionByDbApplication_NameMessage
			| IRetrieveDomainMessage,
		origin: string
	): Promise<void> {
		if (!this.airMessageUtils.validateIncomingMessage(message)
			|| !this.airMessageUtils.isFromValidFrameworkDomain(origin)) {
			return
		}

		if (this.applicationStore.state.messageCallback) {
			this.applicationStore.state.messageCallback(message)
		}

		switch (message.direction) {
			case Message_Direction.FROM_CLIENT: {
				await this.handleApiRequest(message as IApiCallRequestMessage, origin)
				break
			}
			case Message_Direction.INTERNAL: {
				this.handleInternalMessage(message as
					IInitializeConnectionMessage
					| IGetLatestApplicationVersionByDbApplication_NameMessage
					| IRetrieveDomainMessage)
				break
			}
			case Message_Direction.TO_CLIENT: {
				this.handleToClientMessage(message as IApiCallResponseMessage)
				break
			}
		}
	}

	async callApi(
		apiInput: IApiCallRequestMessage
	): Promise<IApiCallResponseMessage> {
		return await this.sendMessage<IApiCallRequestMessage, IApiCallResponseMessage>({
			...apiInput,
			...this.getCoreFields(),
			actor: null
		})
	}

	async callApiNoReturn(
		apiInput: IApiCallRequestMessage
	): Promise<void> {
		await this.sendMessageNoReturn<IApiCallRequestMessage>({
			...apiInput,
			...this.getCoreFields(),
			actor: null
		})
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext,
	): Promise<EntityArray> {
		return await this.sendMessage<IReadQueryMessage, EntityArray>({
			...this.getCoreFields(),
			portableQuery,
			repository: context.repository,
			type: Message_Type.FIND
		})
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext,
	): Promise<E> {
		return await this.sendMessage<IReadQueryMessage, E>({
			...this.getCoreFields(),
			portableQuery,
			repository: context.repository,
			type: Message_Type.FIND_ONE
		})
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryContext,
	): Observable<EntityArray> {
		return this.sendObservableMessage<EntityArray>(
			portableQuery,
			context,
			Message_Type.SEARCH_SUBSCRIBE
		);
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryContext
	): Observable<E> {
		return this.sendObservableMessage<E>(
			portableQuery,
			context,
			Message_Type.SEARCH_ONE_SUBSCRIBE
		);
	}

	async save<E extends IAirEntity, T = E | E[]>(
		entity: T,
		context: IEntityContext,
	): Promise<ISaveResult> {
		const dbEntity = context.dbEntity;
		return await this.sendMessage<ISaveMessage<any>, ISaveResult>({
			...this.getCoreFields(),
			dbEntity: {
				_localId: dbEntity._localId,
				_applicationVersionLocalId: dbEntity.applicationVersion._localId
			},
			entity,
			type: Message_Type.SAVE
		})
	}

	// FIXME: check if ensureGeneratedValues is needed
	async insertValues(
		portableQuery: PortableQuery,
		context: IContext,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		return await this.sendMessage<IPortableQueryMessage, number>({
			...this.getCoreFields(),
			portableQuery,
			type: Message_Type.INSERT_VALUES
		})
	}

	async insertValuesGetLocalIds(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number[][]> {
		return await this.sendMessage<IPortableQueryMessage, number[][]>({
			...this.getCoreFields(),
			portableQuery,
			type: Message_Type.INSERT_VALUES_GET_IDS
		})
	}

	async updateValues(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return await this.sendMessage<IPortableQueryMessage, number>({
			...this.getCoreFields(),
			portableQuery,
			type: Message_Type.UPDATE_VALUES
		})
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<number> {
		return await this.sendMessage<IPortableQueryMessage, number>({
			...this.getCoreFields(),
			portableQuery,
			type: Message_Type.DELETE_WHERE
		})
	}

	async getLatestApplicationVersionMapByDbApplication_FullName(
		fullDbApplication_Name: string
	): Promise<DbApplicationVersion> {
		return await this.sendMessageAndGetResponse<IGetLatestApplicationVersionByDbApplication_NameMessage, DbApplicationVersion>({
			...this.getCoreFields(Message_Direction.INTERNAL),
			fullDbApplication_Name: fullDbApplication_Name,
			type: Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME
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
		domainName: DbDomain_Name
	): Promise<DbDomain> {
		return await this.sendMessageAndGetResponse<IRetrieveDomainMessage, DbDomain>({
			...this.getCoreFields(Message_Direction.INTERNAL),
			domainName,
			type: Message_Type.RETRIEVE_DOMAIN
		})
	}

	onMessage(callback: (
		message: any
	) => void) {
		this.applicationStore.state.messageCallback = callback
	}

	private async handleInternalMessage(
		message: IInitializeConnectionMessage
			| IGetLatestApplicationVersionByDbApplication_NameMessage
			| IRetrieveDomainMessage
	) {
		switch (message.type) {
			case Message_Type.APP_INITIALIZING: {
				if (this.applicationStore.state.appState === AppState.NOT_INITIALIZED
					&& (message as IInitializeConnectionMessage).returnedValue) {
					// console.log(`--==<<(( path: ${window.location.pathname} appState: ${this.applicationStore.state.appState}, domain: ${message.domain}, app: ${message.application} ))>>==--`)
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
			case Message_Type.RETRIEVE_DOMAIN:
			case Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME: {
				this.completeAsyncMessage(message as
					IGetLatestApplicationVersionByDbApplication_NameMessage
					| IRetrieveDomainMessage)
				break
			}
			case Message_Type.APP_INITIALIZED: {
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
		const subscriptionId = request.subscriptionId
		const clientSubscriptionMap = this.applicationStore.state.clientSubscriptionMap
		switch (request.type) {
			case Message_Type.API_SUBSCRIBE: {
				const response = await this.localApiServer.handleRequest(request)
				const subscription = response.returnedValue.subscribe(payload => {
					this.sendMessageToParentWindow({
						...response,
						subscriptionId,
						type: Message_Type.API_SUBSCRIBTION_DATA,
						returnedValue: payload
					} as IApiCallResponseMessage, origin)
				})
				clientSubscriptionMap.set(subscriptionId, subscription)
				break
			}
			case Message_Type.API_UNSUBSCRIBE: {
				const subscription = clientSubscriptionMap.get(subscriptionId)
				if (!subscription) {
					console.log(`Could not find subscription for subscriptionId:
${subscriptionId}
					`)
					break
				}
				subscription.unsubscribe()
				clientSubscriptionMap.delete(subscriptionId)
				// No need to send a message back, no transaction is started
				// for the Unsubscribe operation
				break
			}
			default: {
				if (subscriptionId) {
					console.log(`Found a subscription for an @Api() call that returns a Promise.
	subscriptionId:
${subscriptionId}
					`)
					break
				}
				const response = await this.localApiServer.handleRequest(request)

				this.sendMessageToParentWindow(response, origin)
				break
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

	private handleToClientMessage(
		message: IApiCallResponseMessage,
	) {
		let observableRequestSubject: Subject<any>
		switch (message.type) {
			case Message_Type.SEARCH_ONE_SUBSCRIBE:
			case Message_Type.SEARCH_SUBSCRIBE: {
				observableRequestSubject = this.applicationStore.state
					.subjectCache.getSubject(message.subscriptionId)
				if (!observableRequestSubject) {
					return
				}
				if (message.errorMessage) {
					observableRequestSubject.error(message.errorMessage)
				} else {
					observableRequestSubject.next(message.returnedValue)
				}
				return
			}
		}

		const subscriptionId = message.subscriptionId
		if (subscriptionId) {
			observableRequestSubject = this.applicationStore.state
				.subjectCache.getSubject(subscriptionId)
			if (!observableRequestSubject) {
				console.error(`Could not find Observable API Request Subject for subscriptionId: ${subscriptionId}`)
				return
			}
			try {
				observableRequestSubject.next(message.returnedValue)
			} catch (e) {
				console.error(e)
				observableRequestSubject.error(e)
			}
			return
		}

		this.completeAsyncMessage(message)
	}

	private completeAsyncMessage(
		message: IApiCallResponseMessage
			| IGetLatestApplicationVersionByDbApplication_NameMessage
			| IRetrieveDomainMessage
	) {
		const messageRecord = this.applicationStore.state.pendingMessageMap.get(message.id);
		if (!messageRecord) {
			return
		}

		if (message.errorMessage) {
			messageRecord.reject(message.errorMessage)
		} else if (message.type === Message_Type.API_CALL) {
			messageRecord.resolve(message)
		} else {
			messageRecord.resolve(message.returnedValue)
		}
		this.applicationStore.state.pendingMessageMap.delete(message.id)
	}

	private getCoreFields(
		direction = Message_Direction.FROM_CLIENT
	): {
		clientApplication?: Message_Application,
		clientDomain?: Message_Domain,
		clientDomainProtocol?: Message_DomainProtocol,
		direction: Message_Direction,
		id: string,
		messageLeg: Message_Leg.TO_HUB,
		serverApplication?: Message_Application,
		serverDomain?: Message_Domain,
		serverDomainProtocol?: Message_DomainProtocol
	} {
		let application = this.applicationStore.state.application
		let domain = this.applicationStore.state.domain
		let id = guidv4()
		let messageLeg = Message_Leg.TO_HUB
		return {
			clientApplication: application,
			clientDomain: domain,
			clientDomainProtocol: location.protocol,
			direction,
			id,
			messageLeg
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
		message.transactionId = (<IInjected>this).__container__.context.id
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
		type: Message_Type,
		cachedSqlQueryId?: number
	): Observable<T> {
		const coreFields = this.getCoreFields()
		let subscriptionId = (<IInjected>this).__container__.context.id
		let message = {
			...coreFields,
			cachedSqlQueryId,
			portableQuery,
			repository: context.repository,
			subscriptionId,
			type
		}

		const subject = new SubscriptionCountSubject<T>(
			() => {
				this.sendMessageToParentWindow(message)
			},
			() => {
				this.sendMessageNoReturn<IMessage>({
					...coreFields,
					subscriptionId,
					type: Message_Type.SEARCH_UNSUBSCRIBE
				}).then()
			}
		)
		this.applicationStore.state.subjectCache
			.addSubscripton(subscriptionId, subject)

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
				// console.log(` path: ${window.location.pathname} INITIALIZING_IN_PROGRESS appIndex: ${lastIds.applications} ))>>==--`)
				await this.applicationLoader.load(this.terminalStore.getLastIds())
				this.applicationStore.state.appState = AppState.INITIALIZED
				await this.applicationLoader.initialize()
				this.sendMessageToParentWindow({
					...this.getCoreFields(Message_Direction.INTERNAL),
					fullDbApplication_Name: this.dbApplicationUtils.
						getDbApplication_FullName(
							this.applicationLoader.getApplication()),
					type: Message_Type.APP_INITIALIZED
				} as IGetLatestApplicationVersionByDbApplication_NameMessage)
				return true
			case AppState.INITIALIZED:
				return true
		}

		let jsonApplication = this.applicationLoader.getApplication()
		this.applicationStore.state.domain = jsonApplication.domain
		this.applicationStore.state.application = jsonApplication.name

		this.sendMessageToParentWindow({
			...this.getCoreFields(Message_Direction.INTERNAL),
			jsonApplication,
			type: Message_Type.APP_INITIALIZING
		} as IInitializeConnectionMessage)
		return false
	}

}
