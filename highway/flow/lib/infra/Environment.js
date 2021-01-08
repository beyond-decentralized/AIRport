import { DI } from '@airport/di';
import { ENV } from '../tokens';
export class Environment {
    isNode() {
        return !!(process && process.versions && process.versions.node);
    }
}
DI.set(ENV, Environment);
//# sourceMappingURL=Environment.js.map