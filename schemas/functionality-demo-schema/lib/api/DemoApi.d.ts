import { IParent } from "../generated/parent";
export interface IDemoApi {
    findAllParentsWithChildren(): Promise<IParent[]>;
}
export declare class DemoApi implements IDemoApi {
    findAllParentsWithChildren(): Promise<IParent[]>;
}
//# sourceMappingURL=DemoApi.d.ts.map