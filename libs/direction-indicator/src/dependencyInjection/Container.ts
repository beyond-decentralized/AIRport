import { IDependencyInjectionToken } from './Token';
import { domain } from './InjectionDomain';
import { lib } from './InjectionApplication';
import { IContainer } from './interfaces/IContainer';
import { IRootContainer } from './interfaces/IRootContainer';
import { RootContainer } from './RootContainer';
import { InversionOfControl } from './InversionOfControl';

export class Container
	implements IContainer {

	set<I>(
		token: IDependencyInjectionToken<I>,
		aClass: new () => I
	): void {
		token.descriptor.class = aClass
	}

}

export const DEPENDENCY_INJECTION: IRootContainer = new RootContainer();

if (typeof window !== 'undefined') {
	(window as any).DEPENDENCY_INJECTION = DEPENDENCY_INJECTION;
	(window as any).lib = lib;
	(window as any).domain = domain
}

export const IOC: InversionOfControl = new InversionOfControl();
