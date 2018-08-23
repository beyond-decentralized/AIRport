import {
	IUtils,
	UtilsToken
}                              from '@airport/air-control'
import {max}                   from '@airport/air-control/lib/impl/core/field/Functions'
import {and}                   from '@airport/air-control/lib/impl/core/operation/LogicalOperation'
import {AirportDatabaseToken}  from '@airport/air-control/lib/InjectionTokens'
import {IAirportDatabase}      from '@airport/air-control/lib/lingo/AirportDatabase'
import {
	DomainName,
	SchemaName
}                              from '@airport/ground-control'
import {QDomain}               from '@airport/territory'
import {
	Inject,
	Service
}                              from 'typedi'
import {
	BaseSchemaVersionDao,
	IBaseSchemaVersionDao,
	ISchemaVersion,
	Q,
	QSchema,
	QSchemaVersion
}                              from '../generated/generated'
import {SchemaVersionDaoToken} from '../InjectionTokens'

export interface ISchemaVersionDao
	extends IBaseSchemaVersionDao {

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
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
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
		let sMaV
		let sMiV

		const maxSchemaVersions: ISchemaVersion[] = <any>await this.airportDatabase.db.find.tree({
			from: [
				sv = Q.SchemaVersion,
				s = sv.schema.innerJoin(),
				d = s.domain.innerJoin()
			],
			select: {
				integerVersion: max(sv.integerVersion),
				majorVersion: sv.majorVersion,
				minorVersion: sv.minorVersion,
				patchVersion: sv.patchVersion,
				schema: {
					index: s.index,
					name: s.name,
					domain: {
						id: d.id,
						name: d.name
					}
				},
				id: sv.id
			},
			where: and(
				d.name.in(schemaDomainNames),
				s.name.in(schemaNames)
			),
			groupBy: [
				sv.majorVersion,
				sv.minorVersion,
				sv.patchVersion,
				s.index,
				s.name,
				d.id,
				d.name
			]
		})

		// const maxSchemaVersions: ISchemaVersion[] = await this.airportDatabase.db.find.tree({
		// 	from: [
		// 		sMiV = tree({
		// 			from: [
		// 				sMaV = tree({
		// 					from: [
		// 						s = Q.Schema,
		// 						sv = s.versions.innerJoin(),
		// 						d = s.domain.innerJoin()
		// 					],
		// 					select: {
		// 						index: s.index,
		// 						schemaVersionId: sv.id,
		// 						domainId: d.id,
		// 						domainName: d.name,
		// 						name: s.name,
		// 						majorVersion: max(sv.majorVersion),
		// 						minorVersion: sv.minorVersion,
		// 						patchVersion: sv.patchVersion,
		// 					},
		// 					where: and(
		// 						d.name.in(schemaDomainNames),
		// 						s.name.in(schemaNames)
		// 					),
		// 					groupBy: [
		// 						s.index,
		// 						d.id,
		// 						d.name,
		// 						s.name,
		// 						sv.minorVersion,
		// 						sv.patchVersion,
		// 					]
		// 				})],
		// 			select: {
		// 				index: sMaV.index,
		// 				schemaVersionId: sMaV.schemaVersionId,
		// 				domainId: sMaV.domainId,
		// 				domainName: sMaV.domainName,
		// 				name: sMaV.name,
		// 				majorVersion: sMaV.majorVersion,
		// 				minorVersion: max(sMaV.minorVersion),
		// 				patchVersion: sMaV.patchVersion,
		// 			},
		// 			groupBy: [
		// 				sMaV.index,
		// 				sMaV.domainId,
		// 				sMaV.domainName,
		// 				sMaV.name,
		// 				sMaV.majorVersion,
		// 				sMaV.patchVersion
		// 			]
		// 		})],
		// 	select: {
		// 		majorVersion: sMiV.majorVersion,
		// 		minorVersion: sMiV.minorVersion,
		// 		patchVersion: max(sMiV.patchVersion),
		// 		schema: {
		// 			index: sMiV.index,
		// 			name: sMiV.name,
		// 			domain: {
		// 				id: sMiV.domainId,
		// 				name: sMiV.domainName,
		//
		// 			}
		// 		},
		// 		id: sMiV.schemaVersionId
		// 	},
		// 	groupBy: [
		// 		sMiV.index,
		// 		sMiV.domainId,
		// 		sMiV.domainName,
		// 		sMiV.name,
		// 		sMiV.majorVersion,
		// 		sMiV.minorVersion
		// 	]
		// })

		for (const maxSchemaVersion of maxSchemaVersions) {
			const schema = maxSchemaVersion.schema
			this.utils.ensureChildJsMap(
				maxVersionedMapBySchemaAndDomainNames, schema.domain.name)
				.set(schema.name, maxSchemaVersion)
		}


		return maxVersionedMapBySchemaAndDomainNames
	}

}