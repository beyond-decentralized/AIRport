export interface IAutopilotApiLoader {

    loadApiAutopilot(
        schemaSignature: string,
        daoName: string
    ): any;

}