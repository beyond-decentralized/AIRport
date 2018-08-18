/**
 * Created by Papa on 9/1/2016.
 */
/**
 * @usage
 ```js
 * let storage = new Storage(SqlStorage, options);
 * storage.set('name', 'Max');
 * storage.get('name').then((name) => {
 * });
 *
 * // Sql storage also exposes the full engine underneath
 * storage.query('insert into projects(name, data) values("Cool Project", "blah")');
 * storage.query('select * from projects').then((resp) => {})
 * ```
 *
 * The `SqlStorage` service supports these options:
 * {
 *   name: the name of the database (__ionicstorage by default)
 *   backupFlag: // where to store the file, default is BACKUP_LOCAL which DOES NOT store to iCloud. Other options: BACKUP_LIBRARY, BACKUP_DOCUMENTS
 *   existingDatabase: whether to load this as an existing database (default is false)
 * }
 *
 */
export declare class SqlStorage {
    static BACKUP_LOCAL: number;
    static BACKUP_LIBRARY: number;
    static BACKUP_DOCUMENTS: number;
    private _db;
    constructor();
    private getBackupLocation;
    _tryInit(): void;
    query(query: string, params?: any[]): Promise<any>;
}
