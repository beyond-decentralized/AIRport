import { IClientQuery } from "./ClientQuery";

export interface IClientQueryManager {

    getClientQuery(
        applicationName: string,
        daoName: string,
        methodName: string
    ): Promise<IClientQuery>

}
