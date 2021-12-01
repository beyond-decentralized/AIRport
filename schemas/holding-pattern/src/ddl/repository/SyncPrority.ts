export enum SyncPriority {
	// Internally reserved
	VITAL = 'VITAL',
	// Framework updates
	CRITICAL = 'CRITICAL',
	// Application/Application Updates
	HIGH = 'HIGH',
	ABOVE_NORMAL = 'ABOVE_NORMAL',
	NORMAL = 'NORMAL',
	BELOW_NORMAL = 'BELOW_NORMAL',
	LOW = 'LOW'
}