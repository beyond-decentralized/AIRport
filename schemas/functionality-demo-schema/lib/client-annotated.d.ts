import { IParent } from "./generated/parent";
export interface IDemoApi {
    getAllParentsWithChildren(): Promise<IParent[]>;
}
export declare const DEMO_API: import("@airport/di").IDiToken<IDemoApi>;
//# sourceMappingURL=client-annotated.d.ts.map