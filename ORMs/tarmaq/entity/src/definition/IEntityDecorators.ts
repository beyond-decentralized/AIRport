import { ClassDecorator } from '@airport/direction-indicator'
import {
	DbIndexConfiguration,
	DbObjectConfiguration
} from '@airport/ground-control'

/**
 * Marks an object as an ORM entity.
 */
export interface EntityDecorator {
	(): ClassDecorator
}

export interface IndexConfiguration
	extends DbIndexConfiguration {
}

/**
 * SQL Table configuration
 */
export interface DbEntity_TableConfiguration
	extends DbObjectConfiguration<IndexConfiguration> {
}

/**
 * Marks an object as a SQL table.
 */
export interface TableDecorator {
	(tableConfiguration?: DbEntity_TableConfiguration): ClassDecorator
}

/**
 * Marks an object as a superclass of ORM entities.
 */
export interface MappedSuperclassDecorator {
	(): ClassDecorator
}
