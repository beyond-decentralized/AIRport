import { DI }  from '@airport/di';
import { ENV } from '../tokens';

export interface IEnvironment {
	isNode(): boolean
}

export class Environment
	implements IEnvironment {
	isNode(): boolean {
		return !!(process && process.versions && process.versions.node);
	}
}

DI.set(ENV, Environment);
