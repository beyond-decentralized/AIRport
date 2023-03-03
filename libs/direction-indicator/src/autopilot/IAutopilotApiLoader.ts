import { IFullDITokenDescriptor } from "../dependencyInjection/interfaces/Token";

export interface IAutopilotApiLoader {

    loadApiAutopilot(
        token: IFullDITokenDescriptor,
        observableMethodNameSet: Set<string>
    ): any;

}