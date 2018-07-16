export interface IBlacklist<Key> {
    enable(enable: boolean): void;
    isBlacklisted(key: Key, until?: number): boolean;
    blacklist(key: Key, until?: number): void;
}
