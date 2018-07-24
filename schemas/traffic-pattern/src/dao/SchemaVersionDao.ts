import {
	IUtils,
	UtilsToken
}                              from "@airport/air-control";
import {max}                   from "@airport/air-control/lib/impl/core/field/Functions";
import {tree}                  from "@airport/air-control/lib/impl/core/Joins";
import {and}                   from "@airport/air-control/lib/impl/core/operation/LogicalOperation";
import {AirportDatabaseToken}  from "@airport/air-control/lib/InjectionTokens";
import {IAirportDatabase}      from "@airport/air-control/lib/lingo/AirportDatabase";
import {
	SchemaIndex,
	SchemaVersionId,
	SchemaVersionMajor,
	SchemaVersionMinor,
	SchemaVersionPatch
}                              from "@airport/ground-control";
import {
	Inject,
	Service
}                              from "typedi";
import {
	SchemaDomainName,
	SchemaName
}                              from "../ddl/schema/Schema";
import {
	BaseSchemaVersionDao,
	IBaseSchemaVersionDao,
	Q,
	QSchema,
	QSchemaVersion
}                              from "../generated/generated";
import {SchemaVersionDaoToken} from "../InjectionTokens";

export interface MaxSchemaVersionView {

	index: SchemaIndex;
	schemaVersionId: SchemaVersionId;
	domainName: SchemaDomainName;
	name: SchemaName;
	majorVersion: SchemaVersionMajor;
	minorVersion: SchemaVersionMinor;
	patchVersion: SchemaVersionPatch;

}

export interface ISchemaVersionDao
	extends IBaseSchemaVersionDao {

	findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: SchemaDomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>>;

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
		super(utils);
	}

	async findMaxVersionedMapBySchemaAndDomainNames(
		schemaDomainNames: SchemaDomainName[],
		schemaNames: SchemaName[]
	): Promise<Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>> {
		const maxVersionedMapBySchemaAndDomainNames
			: Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>
			= new Map();

		let sv: QSchemaVersion;
		let s: QSchema;
		let sMaV;
		let sMiV;

		const schemas: MaxSchemaVersionView[] = await this.airportDatabase.db.find.tree({
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
								schemaVersionId: sv.id,
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
						schemaVersionId: sMaV.schemaVersionId,
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
				schemaVersionId: sMiV.schemaVersionId,
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

}