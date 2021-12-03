import { JsonApplicationWithLastIds } from "../JsonApplicationWithLastIds";
import { LastIds } from "../LastIds";
export interface IApplicationLoader {
    load(lastIds: LastIds, librarySignature?: string): Promise<void>;
    getApplication(): JsonApplicationWithLastIds;
}
//# sourceMappingURL=ApplicationLoader.d.ts.map