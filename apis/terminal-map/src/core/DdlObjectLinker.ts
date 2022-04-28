import { AllDdlObjects } from "./DllObjects";
import { ITerminalStore } from "../store/TerminalStore";

export interface IDdlObjectLinker {

    link(
        ddlObjects: AllDdlObjects
    ): void

}
