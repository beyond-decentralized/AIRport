export interface IAutopilotApiLoader {

    loadApiAutopilot(
        applicationSignature: string,
        daoName: string
    ): any;

}