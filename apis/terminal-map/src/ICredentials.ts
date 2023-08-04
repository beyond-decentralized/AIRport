export interface ICredentials {
	application: string
	domain: string
	transactionId?: string
	subscriptionId?: string
}

// Currently credentials are used in circular Api() call detection only
export interface IApiCredentials
	extends ICredentials {
	methodName: string
	objectName: string
}