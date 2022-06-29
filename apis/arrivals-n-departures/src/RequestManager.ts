import { AirRequest } from "./AirRequest";

export interface IRequestManager {

    getRequest(): Promise<AirRequest>

}