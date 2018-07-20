import { IBlacklist } from '@airport/arrivals-n-departures';
export declare class Blacklist<Key> implements IBlacklist<Key> {
    private enabled;
    map: Map<Key, number>;
    constructor();
    enable(enable: boolean): void;
    isBlacklisted(key: Key, until?: number): boolean;
    blacklist(key: Key, until?: number): void;
}
