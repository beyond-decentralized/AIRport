import { JsonApplicationWithLastIds } from "../JsonApplicationWithLastIds";
import { LastIds } from "../LastIds";

export interface IApplicationInitializer {

    initialize(
        lastIds: LastIds,
        librarySignature?: string,
    ): Promise<void>

    getApplication(): JsonApplicationWithLastIds

}
