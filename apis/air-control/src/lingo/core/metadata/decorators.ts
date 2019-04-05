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
/*
export interface TransactionalDecorator {
	(): MethodDecorator;
}
*/
