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
