import { IDiToken } from "../dependencyInjection/Token";

export interface IAutopilotApiLoader {

    loadApiAutopilot<Injectable = any>(
        token: IDiToken<Injectable>
    ): any;

}