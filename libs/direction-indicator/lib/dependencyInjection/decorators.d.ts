export interface ClassDecorator {
    (constructor: Function): any;
}
export interface MethodDecorator {
    (target: any, methodName: string, methodDescriptor: any): any;
}
export interface PropertyDecorator {
    (target: any, propertyKey: string): any;
}
export interface InjectedDecorator {
    (): ClassDecorator;
}
export interface InjectDecorator {
    (): PropertyDecorator;
}
export declare const Injected: InjectedDecorator;
export declare const Inject: InjectDecorator;
//# sourceMappingURL=decorators.d.ts.map