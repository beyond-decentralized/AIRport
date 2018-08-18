/**
 * Created by Papa on 8/31/2016.
 */
export declare class DDLManager {
    static getCreateDDL(): string[];
    static getColumnIndexByColumnName(globalTableIndex: number, columnName: string): number;
    static getRelationIndex(applicationName: string, entityName: string, propertyName: string): number;
    static getRelationGlobalTableIndex(): number;
    static getGlobalTableIndex(applicationName: string, entityName: string): number;
    static warn(message: string): void;
}
