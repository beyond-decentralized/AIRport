import {
	distinct,
	field,
	IQNumberField,
	IUtils,
	RawFieldQuery,
	tree,
	UtilsToken,
	Y
} from '@airport/air-control'
import {max}                  from '@airport/air-control/lib/impl/core/field/Functions'
import {and}                  from '@airport/air-control/lib/impl/core/operation/LogicalOperation'
import {AirportDatabaseToken} from '@airport/air-control/lib/InjectionTokens'
import {IAirportDatabase}     from '@airport/air-control/lib/lingo/AirportDatabase'
import {
	DomainName,
	SchemaName
}                             from '@airport/ground-control'
import {QDomain}              from '@airport/territory'
import {
	Inject,
	Service
}                             from 'typedi'
import {ISchemaVersionDmo}    from '../dmo/SchemaVersionDmo'
import {
	BaseSchemaVersionDao,
	IBaseSchemaVersionDao,
	ISchemaVersion,
	Q,
	QSchema,
	QSchemaVersion
}                             from '../generated/generated'
import {
	SchemaVersionDaoToken,
	SchemaVersionDmoToken
}                             from '../InjectionTokens'

export interface ISchemaVersionDao
	extends IBaseSchemaVersionDao {

	findAllLatest(
	): Promise<ISchemaVersion[]>;

	findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: DomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<DomainName, Map<SchemaName, ISchemaVersion>>>;

}

@Service(SchemaVersionDaoToken)
export class SchemaVersionDao
	extends BaseSchemaVersionDao
	implements ISchemaVersionDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDatabase: IAirportDatabase,
		@Inject(SchemaVersionDmoToken)
		private schemaVersionDmo: ISchemaVersionDmo,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

	async findAllLatest(
	): Promise<ISchemaVersion[]> {
		let sv: QSchemaVersion

		return await this.db.find.tree({
			from: [
				sv = Q.SchemaVersion
			],
			select: {},
			where: sv.id.in(this.idsForMaxVersionSelect())
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