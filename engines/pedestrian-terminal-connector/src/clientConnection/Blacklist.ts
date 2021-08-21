export interface IBlacklist<Key> {

	enable(
		enable: boolean
	): void;

	isBlacklisted(
		key: Key,
		until?: number
	): boolean;

	blacklist(
		key: Key,
		until?: number
	): void;

}

export class Blacklist<Key>
	implements IBlacklist<Key> {

	map: Map<Key, number> = new Map();

	constructor(
		private enabled = false
	) {
	}

	enable(
		enable: boolean
	): void {
		this.enabled = enable;
	}

	isBlacklisted(
		key: Key,
		until?: number
	): boolean {

		if (!this.enabled) {
			return false;
		}

		if (!until) {
			until = new Date().getTime()
		}

		const blacklistedUntil = this.map.get(key);

		// If there is no blacklist entry
		if (!blacklistedUntil) {
			return false;
		}

		// If blacklisting is still in effect
		if (blacklistedUntil > until) {
			return true;
		}

		// Drop the entry from the map (if any)
		if (blacklistedUntil) {
			this.map.delete(key);
		}

		return false;
	}

	blacklist(
		key: Key,
		until?: number
	): void {
		if(!this.enabled) {
			return;
		}

		if(!until) {
			until = new Date().getTime() + 600000
		}

		this.map.set(key, until);
	}

}