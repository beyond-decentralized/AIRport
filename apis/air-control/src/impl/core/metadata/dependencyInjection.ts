import { InjectDecorator, InjectedDecorator } from "../../../lingo/core/metadata/dependencyInjection"

export const Injected: InjectedDecorator = function () {
    return function (constructor: { new(): Object }) {
        // No runtime logic required.
    }
}

export const Inject: InjectDecorator = function () {
    return function (
        targetObject: any,
        propertyKey: string
    ) {
        // No runtime logic required.
    }
}
