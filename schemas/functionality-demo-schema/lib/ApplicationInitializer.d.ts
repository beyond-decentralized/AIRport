import { IApplicationInitializer, LastIds } from '@airport/security-check';
export declare class ApplicationInitializer implements IApplicationInitializer {
    private initializing;
    initialize(lastIds: LastIds, librarySignature?: string): Promise<void>;
}
export declare function loadApplicationInitializer(): void;
//# sourceMappingURL=ApplicationInitializer.d.ts.map