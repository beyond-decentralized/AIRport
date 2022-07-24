import { MethodDecorator } from "@airport/direction-indicator";

export interface ApiDecorator {
    (): MethodDecorator;
}

export const Api: ApiDecorator = function () {
    return function <T>(
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ): TypedPropertyDescriptor<T> | void {
        // No runtime logic required.
        return null;
    }
}
