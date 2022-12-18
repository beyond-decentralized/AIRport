import { IFullDITokenDescriptor } from "../dependencyInjection/Token";

export interface IAutopilotApiLoader {

    loadApiAutopilot(
        token: IFullDITokenDescriptor
    ): any;

}