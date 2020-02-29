import { DI } from '@airport/di';
import { SCHEMA_VERSION_DUO } from '../tokens';
import { BaseSchemaVersionDuo } from '../generated/generated';
export class SchemaVersionDuo extends BaseSchemaVersionDuo {
}
DI.set(SCHEMA_VERSION_DUO, SchemaVersionDuo);
//# sourceMappingURL=SchemaVersionDuo.js.map