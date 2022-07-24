export interface ClassDecorator {
	( constructor: Function );

	// (constructor: {new (): any});
}

export interface MethodDecorator {
	(
		target: any,
		methodName: string,
		methodDescriptor: any
	);
}

export interface PropertyDecorator {
	(
		target: any,
		propertyKey: string
	);
}

export interface InjectedDecorator {
    (): ClassDecorator
}

export interface InjectDecorator {
    (): PropertyDecorator
}

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
