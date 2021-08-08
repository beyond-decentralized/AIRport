export interface IAutopilotApiLoader {

    loadApiAutopilot(
        uniqueSchemaHash: string,
        daoName: string
    ): any;

}