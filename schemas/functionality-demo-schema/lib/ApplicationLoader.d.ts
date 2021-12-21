import { IApplicationLoader, JsonApplicationWithLastIds, LastIds } from '@airport/security-check';
export declare class ApplicationLoader implements IApplicationLoader {
    private initializing;
    load(lastIds: LastIds): Promise<void>;
    getApplication(): JsonApplicationWithLastIds;
}
export declare function loadApplicationInitializer(): void;
//# sourceMappingURL=ApplicationLoader.d.ts.map