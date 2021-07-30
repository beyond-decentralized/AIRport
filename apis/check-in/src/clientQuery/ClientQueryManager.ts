import { IClientQuery } from "./ClientQuery";

export interface IClientQueryManager {

    getClientQuery(
        schemaName: string,
        daoName: string,
        methodName: string
    ): Promise<IClientQuery>

}
