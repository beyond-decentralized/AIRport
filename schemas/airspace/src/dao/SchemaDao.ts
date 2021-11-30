import {
	AIRPORT_DATABASE,
	and,
	max,
	tree,
	Y
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	DomainName,
	ensureChildJsMap,
	JsonSchema,
	SchemaIndex,
	SchemaName,
	SchemaStatus,
	SchemaVersionId
} from '@airport/ground-control'
import { SCHEMA_DAO } from '../tokens'
import {
	BaseSchemaDao,
	IBaseSchemaDao,
	ISchema,
	Q,
	QDomain,
	QSchema,
	QSchemaVersion
} from '../generated/generated'

export interface ISchemaLookupRecord {
	index: number
	domain: {
		id: number
		name: string
	},
	jsonSchema: JsonSchema
	name: string
	majorVersion: number
	minorVersion: number
	patchVersion: number
}

export interface ISchemaDao
	extends IBaseSchemaDao {

	findAllActive(): Promise<ISchema[]>;

	findMapByVersionIds(
		schemaVersionIds: SchemaVersionId[]
	): Promise<Map<SchemaIndex, ISchema>>;

	findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: DomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<DomainName, Map<SchemaName, ISchemaLookupRecord>>>;

	setStatusByIndexes(
		indexes: SchemaIndex[],
		status: SchemaStatus
	): Promise<void>;

	findMapByNames(
		schemaNames: SchemaName[]
	): Promise<Map<SchemaName, ISchema>>

	findByDomainNamesAndSchemaNames(
		domainNames: string[],
		schemaNames: string[]
	): Promise<ISchema[]>

	insert(
		schemas: ISchema[]
	): Promise<void>

}

export class SchemaDao
	extends BaseSchemaDao
	implements ISchemaDao {

	async findAllActive()
		: Promise<ISchema[]> {
		let s: QSchema

		return this.db.find.tree({
			select: {},
			from: [
				s = Q.Schema
			]
		})
	}

	async findMapByVersionIds(
		schemaVersionIds: SchemaVersionId[]
	): Promise<Map<SchemaVersionId, ISchema>> {

		const schemaMapByIndex: Map<SchemaVersionId, ISchema> = new Map()

		let s: QSchema,
			sv: QSchemaVersion
		const schemas = await this.db.find.tree({
			select: {
				index: Y,
				domain: {
					id: Y,
					name: Y
				},
				name: Y,
				versions: {
					id: Y,
					majorVersion: Y,
					minorVersion: Y,
					patchVersion: Y
				}
			},
			from: [
				s = Q.Schema,
				sv = s.versions.innerJoin()
			],
			where: sv.id.in(schemaVersionIds)
		})

		for (const schema of schemas) {
			for (const schemaVersion of schema.versions) {
				schemaMapByIndex.set(schemaVersion.id, schema)
			}
		}

		return schemaMapByIndex
	}

	async findMaxIndex(): Promise<SchemaIndex> {
		const airDb = await container(this).get(AIRPORT_DATABASE)

		const s = Q.Schema
		return await airDb.findOne.field({
			select: max(s.index),
			from: [
				s
			]
		})
	}

	async findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: DomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<DomainName, Map<SchemaName, ISchemaLookupRecord>>> {
		const airDb = await container(this).get(AIRPORT_DATABASE)

		const maxVersionedMapBySchemaAndDomainNames: Map<DomainName, Map<SchemaName, ISchemaLookupRecord>>
			= new Map()

		let sv: QSchemaVersion
		let s: QSchema
		let d: QDomain
		let sMaV
		let sMiV

		const schemaLookupRecords = await airDb.find.tree({
			from: [
				sMiV = tree({
					from: [
						sMaV = tree({
							from: [
								s = Q.Schema,
								sv = s.versions.innerJoin(),
								d = s.domain.innerJoin()
							],
							select: {
								index: s.index,
								domainId: d.id,
								domainName: d.name,
								name: s.name,
								jsonSchema: s.jsonSchema,
								majorVersion: max(sv.majorVersion),
								minorVersion: sv.minorVersion,
								patchVersion: sv.patchVersion,
							},
							where: and(
								d.name.in(schemaDomainNames),
								s.name.in(schemaNames)
							),
							groupBy: [
								s.index,
								d.id,
								d.name,
								s.name,
								sv.minorVersion,
								sv.patchVersion,
							]
						})],
					select: {
						index: sMaV.index,
						domainId: sMaV.domainId,
						domainName: sMaV.domainName,
						jsonSchema: sMaV.jsonSchema,
						name: sMaV.name,
						majorVersion: sMaV.majorVersion,
						minorVersion: max(sMaV.minorVersion),
						patchVersion: sMaV.patchVersion,
					},
					groupBy: [
						sMaV.index,
						sMaV.domainId,
						sMaV.domainName,
						sMaV.name,
						sMaV.majorVersion,
						sMaV.patchVersion
					]
				})],
			select: {
				index: sMiV.index,
				domain: {
					id: sMiV.domainId,
					name: sMiV.domainName
				},
				jsonSchema: sMiV.jsonSchema,
				name: sMiV.name,
				majorVersion: sMiV.majorVersion,
				minorVersion: sMiV.minorVersion,
				patchVersion: max(sMiV.patchVersion),
			},
			groupBy: [
				sMiV.index,
				sMiV.domainId,
				sMiV.domainName,
				sMiV.name,
				sMiV.majorVersion,
				sMiV.minorVersion
			]
		})

		for (const schemaLookupRecord of schemaLookupRecords) {
			ensureChildJsMap(
				maxVersionedMapBySchemaAndDomainNames, schemaLookupRecord.domain.name)
				.set(schemaLookupRecord.name, schemaLookupRecord)
		}


		return maxVersionedMapBySchemaAndDomainNames
	}

	async setStatusByIndexes(
		indexes: SchemaIndex[],
		status: SchemaStatus
	): Promise<void> {
		let s: QSchema
		await this.db.updateWhere({
			update: s = Q.Schema,
			set: {
				status
			},
			where: s.index.in(indexes)
		})
	}

	async findMapByNames(
		schemaNames: SchemaName[]
	): Promise<Map<SchemaName, ISchema>> {
		const mapByName: Map<SchemaName, ISchema> = new Map()

		let s: QSchema

		const records = await this.db.find.tree({
			select: {},
			from: [
				s = Q.Schema
			],
			where: s.name.in(schemaNames)
		})

		for (const record of records) {
			mapByName.set(record.name, record)
		}

		return mapByName
	}

	async findByDomainNamesAndSchemaNames(
		domainNames: string[],
		schemaNames: string[]
	): Promise<ISchema[]> {
		let s: QSchema
		let d: QDomain

		return await this.db.find.tree({
			select: {
				index: Y,
				domain: {
					id: Y,
					name: Y
				},
				name: Y
			},
			from: [
				s = Q.Schema,
				d = s.domain.innerJoin()
			],
			where: and(
				d.name.in(domainNames),
				s.name.in(schemaNames)
			),
			orderBy: [
				d.name.asc(),
				s.index.asc()
			]
		})
	}

	async insert(
		schemas: ISchema[]
	): Promise<void> {
		let s: QSchema;
		const values = []
		for (const schema of schemas) {
			values.push([
				schema.index, schema.domain.id, schema.scope,
				schema.name, schema.packageName, schema.status,
				schema.jsonSchema
			])
		}
		await this.db.insertValuesGenerateIds({
			insertInto: s = Q.Schema,
			columns: [
				s.index,
				s.domain.id,
				s.scope,
				s.name,
				s.packageName,
				s.status,
				s.jsonSchema
			],
			values
		})
	}
}

DI.set(SCHEMA_DAO, SchemaDao)
