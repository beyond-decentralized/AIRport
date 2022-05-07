import { IDependencyInjectionToken } from './Token';
import { IContainer } from './interfaces/IContainer';

export class Container
	implements IContainer {

	set<I>(
		token: IDependencyInjectionToken<I>,
		aClass: new () => I
	): void {
		token.descriptor.class = aClass
	}

}
