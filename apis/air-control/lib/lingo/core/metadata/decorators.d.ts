export interface ClassDecorator {
    (constructor: Function): any;
}
export interface MethodDecorator {
    (target: any, methodName: string, methodDescriptor: any): any;
}
export interface PropertyDecorator {
    (target: any, propertyKey: string): any;
}
//# sourceMappingURL=decorators.d.ts.map