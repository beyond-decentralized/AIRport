import { JsonApplicationWithLastIds } from "../JsonApplicationWithLastIds";
import { LastIds } from "../LastIds";

export interface IApplicationLoader {

    load(
        lastIds: LastIds,
        applicationSignature?: string,
    ): Promise<void>

    getApplication(): JsonApplicationWithLastIds

}
