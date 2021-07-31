export interface IAutopilotDaoLoader {

    loadDaoAutopilot(
        uniqueSchemaHash: string,
        daoName: string
    ): any;

}