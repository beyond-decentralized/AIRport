import { JsonApplication, JsonApplicationVersion } from "@airport/ground-control";
import { IApplicationApi } from "./ApiRegistry";

export interface JsonApplicationWithApi
    extends JsonApplication {

    versions: JsonApplicationVersionWithApi[]

}

export interface JsonApplicationVersionWithApi
    extends JsonApplicationVersion {

    api: IApplicationApi

}
