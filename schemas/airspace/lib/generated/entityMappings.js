/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { VersionedApplicationObject } from '../ddl/application/VersionedApplicationObject';
import { ApplicationRelationColumn } from '../ddl/application/ApplicationRelationColumn';
import { ApplicationRelation } from '../ddl/application/ApplicationRelation';
import { ApplicationProperty } from '../ddl/application/ApplicationProperty';
import { ApplicationPropertyColumn } from '../ddl/application/ApplicationPropertyColumn';
import { ApplicationColumn } from '../ddl/application/ApplicationColumn';
import { ApplicationOperation } from '../ddl/application/ApplicationOperation';
import { ApplicationEntity } from '../ddl/application/ApplicationEntity';
import { ApplicationReference } from '../ddl/application/ApplicationReference';
import { ApplicationVersion } from '../ddl/application/ApplicationVersion';
import { ApplicationCurrentVersion } from '../ddl/application/ApplicationCurrentVersion';
import { Application } from '../ddl/application/Application';
import { Domain } from '../ddl/application/Domain';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'traffic-pattern');
    accumulator.add(VersionedApplicationObject, undefined);
    accumulator.add(ApplicationRelationColumn, 0);
    accumulator.add(ApplicationRelation, 1);
    accumulator.add(ApplicationProperty, 2);
    accumulator.add(ApplicationPropertyColumn, 3);
    accumulator.add(ApplicationColumn, 4);
    accumulator.add(ApplicationOperation, 5);
    accumulator.add(ApplicationEntity, 6);
    accumulator.add(ApplicationReference, 7);
    accumulator.add(ApplicationVersion, 8);
    accumulator.add(ApplicationCurrentVersion, 9);
    accumulator.add(Application, 10);
    accumulator.add(Domain, 11);
});
//# sourceMappingURL=entityMappings.js.map