import {
	SchemaIndex,
	SchemaVersionId,
	Y
}                         from "@airport/air-control";
import {max}              from "@airport/air-control/lib/impl/core/field/Functions";
import {tree}             from "@airport/air-control/lib/impl/core/Joins";
import {and}              from "@airport/air-control/lib/impl/core/operation/LogicalOperation";
import {
	AirportDatabaseToken,
	UtilsToken
}                         from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase} from "@airport/air-control/lib/lingo/AirportDatabase";
import {IUtils}           from "@airport/air-control/lib/lingo/utils/Utils";
import {Inject}           from "typedi/decorators/Inject";
import {Service}          from "typedi/decorators/Service";
import {
	QSchemaVersion,
	SchemaDomainName,
	SchemaName
}                         from "..";
import {SchemaStatus}     from "../ddl/schema/SchemaStatus";
import {
	BaseSchemaDao,
	IBaseSchemaDao,
	ISchema,
	Q,
	QSchema
}                         from "../generated/generated";
import {SchemaDaoToken}   from "../InjectionTokens";


export interface ISchemaDao
	extends IBaseSchemaDao {

	findMapByVersionIds(
		schemaVersionIds: SchemaVersionId[]
	): Promise<Map<SchemaIndex, ISchema>>;

	findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: SchemaDomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<SchemaDomainName, Map<SchemaName, ISchema>>>;

	setStatusByIndexes(
		indexes: SchemaIndex[],
		status: SchemaStatus
	): Promise<void>;

}

@Service(SchemaDaoToken)
export class SchemaDao
	extends BaseSchemaDao
	implements ISchemaDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDatabase: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils,
	) {
		super(utils);
	}

	async findMapByVersionIds(
		schemaVersionIds: SchemaVersionId[]
	): Promise<Map<SchemaVersionId, ISchema>> {

		const schemaMapByIndex: Map<SchemaVersionId, ISchema> = new Map();

		let s: QSchema,
			sv: QSchemaVersion;
		const schemas = await this.db.find.tree({
			select: {
				index: Y,
				domainName: Y,
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
		});

		for (const schema of schemas) {
			for (const schemaVersion of schema.versions) {
				schemaMapByIndex.set(schemaVersion.id, schema)
			}
		}

		return schemaMapByIndex;
	}

	async findMaxIndex(): Promise<SchemaIndex> {
		const s = Q.Schema;
		return await this.airportDatabase.findOne.field({
			select: max(s.index),
			from: [
				s
			]
		});
	}

	async findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: SchemaDomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<SchemaDomainName, Map<SchemaName, ISchema>>> {
		const maxVersionedMapBySchemaAndDomainNames: Map<SchemaDomainName, Map<SchemaName, ISchema>>
			= new Map();

		let sv: QSchemaVersion;
		let s: QSchema;
		let sMaV;
		let sMiV;


		const schemas = await this.airportDatabase.db.find.tree({
			from: [
				sMiV = tree({
					from: [
						sMaV = tree({
							from: [
								s = Q.Schema,
								sv = s.versions.innerJoin()
							],
							select: {
								index: s.index,
								domainName: s.domainName,
								name: s.domainName,
								majorVersion: max(sv.majorVersion),
								minorVersion: sv.minorVersion,
								patchVersion: sv.patchVersion,
							},
							where: and(
								s.domainName.in(schemaDomainNames),
								s.name.in(schemaNames)
							),
							groupBy: [
								s.index,
								s.domainName,
								s.name,
								sv.minorVersion,
								sv.patchVersion,
							]
						})],
					select: {
						index: sMaV.index,
						domainName: sMaV.domainName,
						name: sMaV.name,
						majorVersion: sMaV.majorVersion,
						minorVersion: max(sMaV.minorVersion),
						patchVersion: sMaV.patchVersion,
					},
					groupBy: [
						sMaV.index,
						sMaV.domainName,
						sMaV.name,
						sMaV.majorVersion,
						sMaV.patchVersion
					]
				})],
			select: {
				index: sMiV.index,
				domainName: sMiV.domainName,
				name: sMiV.name,
				majorVersion: sMiV.majorVersion,
				minorVersion: sMiV.minorVersion,
				patchVersion: max(sMiV.patchVersion),
			},
			groupBy: [
				sMiV.index,
				sMiV.domainName,
				sMiV.name,
				sMiV.majorVersion,
				sMiV.minorVersion
			]
		});

		for (const schema of schemas) {
			this.utils.ensureChildJsMap(
				maxVersionedMapBySchemaAndDomainNames, schema.domainName)
				.set(schema.name, schema);
		}


		return maxVersionedMapBySchemaAndDomainNames;
	}

	async setStatusByIndexes(
		indexes: SchemaIndex[],
		status: SchemaStatus
	): Promise<void> {
		let s: QSchema;
		await this.db.updateWhere({
			update: s = Q.Schema,
			set: {
				status
			},
			where: s.index.in(indexes)
		});
	}
}