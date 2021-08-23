import { IContext } from "@airport/di";
export interface IOperationContextLoader {
    ensure(context: IContext): Promise<void>;
    ensureSync(context: IContext): void;
}
//# sourceMappingURL=OperationContextLoader.d.ts.map