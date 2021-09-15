/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { VersionedSchemaObject } from '../ddl/schema/VersionedSchemaObject';
import { SchemaRelationColumn } from '../ddl/schema/SchemaRelationColumn';
import { SchemaRelation } from '../ddl/schema/SchemaRelation';
import { SchemaProperty } from '../ddl/schema/SchemaProperty';
import { SchemaPropertyColumn } from '../ddl/schema/SchemaPropertyColumn';
import { SchemaColumn } from '../ddl/schema/SchemaColumn';
import { SchemaOperation } from '../ddl/schema/SchemaOperation';
import { SchemaEntity } from '../ddl/schema/SchemaEntity';
import { SchemaReference } from '../ddl/schema/SchemaReference';
import { SchemaVersion } from '../ddl/schema/SchemaVersion';
import { SchemaCurrentVersion } from '../ddl/schema/SchemaCurrentVersion';
import { Schema } from '../ddl/schema/Schema';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'traffic-pattern');
    accumulator.add(VersionedSchemaObject, undefined);
    accumulator.add(SchemaRelationColumn, 0);
    accumulator.add(SchemaRelation, 1);
    accumulator.add(SchemaProperty, 2);
    accumulator.add(SchemaPropertyColumn, 3);
    accumulator.add(SchemaColumn, 4);
    accumulator.add(SchemaOperation, 5);
    accumulator.add(SchemaEntity, 6);
    accumulator.add(SchemaReference, 7);
    accumulator.add(SchemaVersion, 8);
    accumulator.add(SchemaCurrentVersion, 9);
    accumulator.add(Schema, 10);
});
//# sourceMappingURL=entityMappings.js.map