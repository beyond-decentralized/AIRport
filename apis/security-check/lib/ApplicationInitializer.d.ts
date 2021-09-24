import { LastIds } from "./LastIds";
export interface IApplicationInitializer {
    initialize(lastIds: LastIds, librarySignature?: string): Promise<void>;
}
//# sourceMappingURL=ApplicationInitializer.d.ts.map