import { AllDdlObjects } from "./DllObjects";

export interface IDdlObjectLinker {

    link(
        ddlObjects: AllDdlObjects
    ): void

}
