import { DI } from '@airport/di';
import { SCHEMA_VERSION_DUO } from '../tokens';
import { BaseApplicationVersionDuo } from '../generated/generated';
export class ApplicationVersionDuo extends BaseApplicationVersionDuo {
}
DI.set(SCHEMA_VERSION_DUO, ApplicationVersionDuo);
//# sourceMappingURL=ApplicationVersionDuo.js.map