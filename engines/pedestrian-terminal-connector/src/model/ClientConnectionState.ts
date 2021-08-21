export enum ClientConnectionState {
	PENDING = 1, // Raw connection established but no data has been sent
	UNVERIFIED = 2, // Connection is being verified
	ACTIVE = 3, // Active AGT connection
	INACTIVE = 4, // Connection went inactive
}