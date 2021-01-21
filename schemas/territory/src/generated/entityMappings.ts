import { AIR_DB } from '@airport/air-control';
import { DI } from '@airport/di';
import { Package } from '../ddl/Package';
import { ApplicationPackage } from '../ddl/ApplicationPackage';
import { Domain } from '../ddl/Domain';
import { Application } from '../ddl/Application';
import { PackagedUnit } from '../ddl/PackagedUnit';

DI.db().get(AIR_DB).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'territory');
  accumulator.add(Package, 0);
  accumulator.add(ApplicationPackage, 1);
  accumulator.add(Domain, 2);
  accumulator.add(Application, 3);
  accumulator.add(PackagedUnit, 4);
});