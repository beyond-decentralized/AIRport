export enum ClientConnectionState {
	PENDING = 'PENDING', // Raw connection established but no data has been sent
	UNVERIFIED = 'UNVERIFIED', // Connection is being verified
	ACTIVE = 'ACTIVE', // Active AGT connection
	INACTIVE = 'INACTIVE', // Connection went inactive
}