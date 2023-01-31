import {
	EntityDecorator,
	MappedSuperclassDecorator,
	DbEntity_TableConfiguration,
	TableDecorator
} from '../definition/IEntityDecorators'

/**
 * Created by Papa on 8/20/2016.
 */

export const Entity: EntityDecorator = function () {
	return function (constructor: { new(): Object }) {
		// No runtime logic required.
	}
}

export const Table: TableDecorator = function (
	tableConfiguration?: DbEntity_TableConfiguration
) {
	return function (constructor: Function) {
		// No runtime logic required.
	}
}

export const MappedSuperclass: MappedSuperclassDecorator = function () {
	return function (constructor: Function) {
	}
}
