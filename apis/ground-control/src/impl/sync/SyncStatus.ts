export enum BlockSyncStatus {
	// Sync request has been sent but no reply has come yet
	SYNCHRONIZING = 'SYNCHRONIZING',
	// Sync has been acknowledged by the AGT
	SYNCHRONIZED = 'SYNCHRONIZED',
	// Sync has not been acked by AGT so, requesting sync status from AGT
	REQUESTING_SYNC_STATUS = 'REQUESTING_SYNC_STATUS',
	/*
	   Do not re-sync until AGT starts responds with a request for more data.
	   NOTE: no need of a separate status, state is maintained on SharingNode level.
	 */
	// RESYNC_SUSPENDED = 'RESYNC_SUSPENDED',
	// AGT requested re-sync for this block, send it again
	RESYNC_REQUESTED = 'RESYNC_REQUESTED'
}

export enum RepositorySyncStatus {
	// Actively syncing this repository
	ACTIVE = 'ACTIVE',
	// AGT is not responding, temporarily pending AGT responses
	PENDING = 'PENDING',
	// AGT (or TM) delayed sync of this repository (for a period of time)
	DELAYED = 'DELAYED',
	// AGT (or TM) suspended sync of this repository
	SUSPENDED = 'SUSPENDED',
	// AGT (or TM) temporarily rerouted syncing of this repository to a different AGT
	TEMPORARILY_REROUTED = 'TEMPORARILY_REROUTED',
	// AGT (or TM) permanently rerouted syncing of this repository to a different AGT
	PERMANENTLY_REROUTED = 'PERMANENTLY_REROUTED'
}

export enum TerminalSyncStatus {
	// Terminal is actively syncing
	ACTIVE = 'ACTIVE',
	// Terminal syncing has been suspended
	SUSPENDED = 'SUSPENDED'
}