export interface ILocalAPIRequest {
    args: Array<boolean | number | string>;
    schemaName: string;
    daoName: string;
    methodName: string;
}
