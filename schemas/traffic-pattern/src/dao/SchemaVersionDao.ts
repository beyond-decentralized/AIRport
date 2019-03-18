import {
	and,
	distinct,
	field,
	IQNumberField,
	max,
	RawFieldQuery,
	tree,
	Y
}                          from '@airport/air-control'
import {DI}                from '@airport/di'
import {
	DomainName,
	SchemaIndex,
	SchemaName
}                          from '@airport/ground-control'
import {QDomain}           from '@airport/territory'
import {
	SCHEMA_VERSION_DAO,
	SCHEMA_VERSION_DMO
}                          from '../diTokens'
import {ISchemaVersionDmo} from '../dmo/SchemaVersionDmo'
import {
	BaseSchemaVersionDao,
	IBaseSchemaVersionDao,
	ISchemaVersion,
	Q,
	QSchema,
	QSchemaVersion
}                          from '../generated/generated'

export interface ISchemaVersionDao
	extends IBaseSchemaVersionDao {

	findAllLatestForSchemaIndexes(
		schemaIndexes: SchemaIndex[]
	): Promise<ISchemaVersion[]>

	findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: DomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>

}

export class SchemaVersionDao
	extends BaseSchemaVersionDao
	implements ISchemaVersionDao {

	private schemaVersionDmo: ISchemaVersionDmo

	constructor() {
		super()

		DI.get(
			(schemaVersionDmo) => {
				this.schemaVersionDmo = schemaVersionDmo
			}, SCHEMA_VERSION_DMO)
	}

	async findAllLatestForSchemaIndexes(
		schemaIndexes: SchemaIndex[]
	): Promise<ISchemaVersion[]> {
		let sv: QSchemaVersion

		return await this.db.find.tree({
			from: [
				sv = Q.SchemaVersion
			],
			select: {},
			where: and(
				sv.id.in(this.idsForMaxVersionSelect()),
				sv.schema.index.in(schemaIndexes)
			)
		})
	}

	async findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: DomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>> {
		const maxVersionedMapBySchemaAndDomainNames
			      : Map<DomainName, Map<SchemaName, ISchemaVersion>>
			      = new Map()

		let sv: QSchemaVersion
		let s: QSchema
		let d: QDomain

		const maxSchemaVersions: ISchemaVersion[] = <any>await this.db.find.tree({
			select: {
				integerVersion: Y,
				majorVersion: Y,
				minorVersion: Y,
				patchVersion: Y,
				schema: {
					index: Y,
					name: Y,
					domain: {
						id: Y,
						name: Y
					}
				},
				id: Y
			},
			from: [
				sv = Q.SchemaVersion,
				s = sv.schema.innerJoin(),
				d = s.domain.innerJoin()
			],
			where: and(
				sv.id.in(this.idsForMaxVersionSelect()),
				d.name.in(schemaDomainNames),
				s.name.in(schemaNames)
			),
		})

		for (const maxSchemaVersion of maxSchemaVersions) {
			const schema = maxSchemaVersion.schema
			this.utils.ensureChildJsMap(
				maxVersionedMapBySchemaAndDomainNames, schema.domain.name)
				.set(schema.name, maxSchemaVersion)
		}


		return maxVersionedMapBySchemaAndDomainNames
	}

	private idsForMaxVersionSelect(): RawFieldQuery<IQNumberField> {
		let svMax
		let sv2: QSchemaVersion

		return field({
			from: [
				svMax = tree({
					from: [
						sv2 = Q.SchemaVersion
					],
					select: distinct({
						integerVersion: max(sv2.integerVersion),
						id: sv2.id,
						schemaIndex: sv2.schema.index
					})
				})
			],
			select: svMax.id
		})
	}

}

DI.set(SCHEMA_VERSION_DAO, SchemaVersionDao)
