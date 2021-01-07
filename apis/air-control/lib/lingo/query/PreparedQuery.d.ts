import { MethodDecorator } from '../core/metadata/decorators';
export interface PreparedQueryDecorator {
    (callback: (...args: any[]) => any): MethodDecorator;
}
//# sourceMappingURL=PreparedQuery.d.ts.map