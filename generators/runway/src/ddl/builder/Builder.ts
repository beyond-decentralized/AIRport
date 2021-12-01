import {PropertyDocEntry} from '../parser/DocEntry'
import {EntityCandidate}  from '../parser/EntityCandidate'
import {FileBuilder}      from './entity/FileBuilder'
import {QColumnBuilder}     from './entity/QColumnBuilder'
import {QEntityFileBuilder} from './entity/QEntityFileBuilder'
import {QPropertyBuilder}   from './entity/QPropertyBuilder'
import {QRelationBuilder}   from './entity/QRelationBuilder'
import {QTransientBuilder}  from './entity/QTransientBuilder'
import {SColumn}            from './application/SProperty'

/**
 * Created by Papa on 4/25/2016.
 */

export interface IBuilder {

	build(
		...args: any[]
	): string;

}

export interface MemberData {
	definitions: string;
}

export interface IQCoreEntityBuilder
	extends IBuilder {

	constructorFields: { [name: string]: boolean };
	entity: EntityCandidate;
	fileBuilder: FileBuilder;

	addImport(
		classNames: (string | { asName: string, sourceName: string }) [],
		filePath: string
	): void;

}

export abstract class QCoreEntityBuilder
	implements IQCoreEntityBuilder {

	constructorFields: { [name: string]: boolean } = {}

	constructor(
		public entity: EntityCandidate,
		protected fullGenerationPath: string,
		protected workingDirPath: string,
		public fileBuilder: FileBuilder,
		protected entityMapByName: { [entityName: string]: EntityCandidate }
	) {
	}

	abstract build(...args: any[]): string;

	addImport(
		classNames: (string | { asName: string, sourceName: string }) [],
		filePath: string,
		toLowerCase?: boolean,
	): void {
		this.fileBuilder.addImport(classNames, filePath, toLowerCase)
	}

	protected getColumnBuilders(
		columns: SColumn[]
	): QColumnBuilder[] {
		return columns.map(
			column => new QColumnBuilder(this, column)
		)
	}

	protected getPropertyBuilders(
		properties: PropertyDocEntry[]
	): QPropertyBuilder[] {
		return properties.map(
			property => this.addPropertyBuilder(property)
		).filter(
			builder => builder != null)
	}

	protected getTransientPropertyBuilders(
		properties: PropertyDocEntry[]
	): QTransientBuilder[] {
		return properties.map(
			property => new QTransientBuilder(this, property)
		)
	}

	protected getRelationBuilders(
		properties: PropertyDocEntry[],
		buildRelationInstance: boolean
	): QRelationBuilder[] {
		return properties.map(
			property => this.addRelationBuilder(property, buildRelationInstance)
		).filter(
			builder => builder != null)
	}

	protected buildPropertyData(
		propertyBuilders: QPropertyBuilder[]
	): MemberData {
		const propertyData: MemberData = {
			definitions: ``,
		}

		propertyBuilders.forEach((
			builder: QPropertyBuilder
		) => {
			propertyData.definitions += `	${builder.buildDefinition()}\n`
		})

		return propertyData
	}

	protected buildRelationData(
		relationBuilders: QRelationBuilder[]
	): MemberData {
		const relationData: MemberData = {
			definitions: ``,
		}

		relationBuilders.forEach((
			builder: QRelationBuilder
		) => {
			relationData.definitions += `	${builder.buildDefinition()}\n`
		})

		return relationData
	}

	private addPropertyBuilder(
		property: PropertyDocEntry
	): QPropertyBuilder {
		let propertyBuilder = null
		if (property.primitive) {
			propertyBuilder = new QPropertyBuilder(this, property)
		}

		return propertyBuilder
	}

	private addRelationBuilder(
		property: PropertyDocEntry,
		buildRelationInstance: boolean
	): QRelationBuilder {
		let relationBuilder = null
		if (property.entity || property.fromProject) {
			relationBuilder = new QRelationBuilder(this, property, this.entityMapByName, buildRelationInstance)
		}
		return relationBuilder
	}

}

export function getPropertyFieldType( //
	propertyDocEntry: PropertyDocEntry //
): string {
	switch (propertyDocEntry.primitive) {
		case 'boolean':
			return 'BOOLEAN'
		case 'Date':
			return 'DATE'
		case 'number':
			return 'NUMBER'
		case 'string':
		case 'Json':
			return 'STRING'
		case 'any':
			return 'ANY'
		default:
			throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
	}
}

export function getPropertyJSONOperationInterface( //
	propertyDocEntry: PropertyDocEntry //
): string {
	switch (propertyDocEntry.primitive) {
		case 'boolean':
			return 'JSONRawBooleanOperation'
		case 'Date':
			return 'JSONRawDateOperation'
		case 'number':
			return 'JSONRawNumberOperation'
		case 'string':
		case 'Json':
			return 'JSONRawStringOperation'
		case 'any':
			return 'JSONRawUntypedOperation'
		default:
			throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
	}
}

export function getPropertyTypedOperationInterface( //
	propertyDocEntry: PropertyDocEntry //
): string {
	switch (propertyDocEntry.primitive) {
		case 'boolean':
			return 'IBooleanOperation'
		case 'Date':
			return 'IDateOperation'
		case 'number':
			return 'INumberOperation'
		case 'string':
		case 'Json':
			return 'IStringOperation'
		case 'any':
			return 'IUntypedOperation'
		default:
			throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
	}
}

export function getPropertyFieldInterface( //
	propertyDocEntry: PropertyDocEntry //
): string {
	return getPrimitiveFieldInterface(propertyDocEntry.primitive)
}

export function getColumnFieldInterface( //
	sColumn: SColumn //
): string {
	return getPrimitiveFieldInterface(sColumn.type)
}

export function getPrimitiveFieldInterface( //
	primitive: string //
): string {
	switch (primitive) {
		case 'boolean':
			return 'IQBooleanField'
		case 'Date':
			return 'IQDateField'
		case 'number':
			return 'IQNumberField'
		case 'string':
		case 'Json':
			return 'IQStringField'
		case 'any':
			return 'IQUntypedField'
		default:
			throw new Error(`Unexpected primitive ${primitive}`)
	}
}

export function getPropertyFieldClass( //
	propertyDocEntry: PropertyDocEntry //
): string {
	switch (propertyDocEntry.primitive) {
		case 'boolean':
			return 'QBooleanField'
		case 'Date':
			return 'QDateField'
		case 'number':
			return 'QNumberField'
		case 'string':
		case 'Json':
			return 'QStringField'
		case 'any':
			return 'QUntypedField'
		default:
			throw new Error(`Unexpected primitive ${propertyDocEntry.primitive}`)
	}
}

export function getRelationFieldType( //
	entityProperty: PropertyDocEntry //
): string {
	if (entityProperty.isArray) {
		return 'ONE_TO_MANY'
	} else {
		return 'MANY_TO_ONE'
	}
}
