import { IFullDITokenDescriptor } from "../dependencyInjection/interfaces/Token";

export interface IAutopilotApiLoader {

    loadApiAutopilot(
        token: IFullDITokenDescriptor
    ): any;

}