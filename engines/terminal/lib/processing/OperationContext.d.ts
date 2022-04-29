import { IOperationContextLoader } from '@airport/ground-control';
import { IOperationContext } from '@airport/terminal-map';
export declare class OperationContextLoader implements IOperationContextLoader {
    ensure(context: IOperationContext): Promise<void>;
    ensureSync(context: IOperationContext): void;
}
//# sourceMappingURL=OperationContext.d.ts.map