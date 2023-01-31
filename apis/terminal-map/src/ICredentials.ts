export interface ICredentials {
	application: string
	domain: string
	transactionId?: string
}

// Currently credentials are used in circular Api() call detection only
export interface ITransactionCredentials
	extends ICredentials {
	methodName: string
	objectName: string
}