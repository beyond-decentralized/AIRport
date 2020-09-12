export interface ClassDecorator {
    (constructor: Function): any;
}
export interface MethodDecorator {
    (target: any, methodName: string, methodDescriptor: any): any;
}
export interface PropertyDecorator {
    (target: any, propertyKey: string): any;
}
/**
 * Transactional decorator
 *
 * Ex:
 * @Transactional
 * async transactionalMethod() { ... }
 *
 * When decorated with this the decorated method will run
 * in a transactional context.
 */
//# sourceMappingURL=decorators.d.ts.map