import { DatabaseIndexConfiguration, DatabaseObjectConfiguration } from '@airport/ground-control';
import { ClassDecorator } from './decorators';
/**
 * Marks an object as an ORM entity.
 */
export interface EntityDecorator {
    (): ClassDecorator;
}
export interface IndexConfiguration extends DatabaseIndexConfiguration {
}
/**
 * SQL Table configuration
 */
export interface ApplicationEntity_TableConfiguration extends DatabaseObjectConfiguration<IndexConfiguration> {
}
/**
 * Marks an object as a SQL table.
 */
export interface TableDecorator {
    (tableConfiguration?: ApplicationEntity_TableConfiguration): ClassDecorator;
}
/**
 * Marks an object as a superclass of ORM entities.
 */
export interface MappedSuperclassDecorator {
    (): ClassDecorator;
}
//# sourceMappingURL=EntityDecorators.d.ts.map