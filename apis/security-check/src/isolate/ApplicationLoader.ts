import { JsonApplicationWithLastIds } from "../JsonApplicationWithLastIds";
import { LastIds } from "../LastIds";

export interface IApplicationLoader {

    load(
        lastIds: LastIds
    ): Promise<void>

    getApplication(): JsonApplicationWithLastIds

}
