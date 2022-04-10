export interface ICredentials {
	application: string
	domain: string
	transactionId?: string
}

export interface ITransactionCredentials
	extends ICredentials {
	methodName: string
	objectName: string
}