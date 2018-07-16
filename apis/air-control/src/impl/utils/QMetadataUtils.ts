import {
	DbEntity,
	JSONBaseOperation
}                                from "@airport/ground-control";
import {
	Inject,
	Service
}                                from "typedi";
import {
	AirportDatabaseToken,
	QMetadataUtilsToken,
	UtilsToken
}                                from "../../InjectionTokens";
import {IAirportDatabase}        from "../../lingo/AirportDatabase";
import {IQEntityInternal}        from "../../lingo/core/entity/Entity";
import {IQOperableFieldInternal} from "../../lingo/core/field/OperableField";
import {IQMetadataUtils}         from "../../lingo/utils/QMetadataUtils";
import {IUtils}                  from "../../lingo/utils/Utils";

@Service(QMetadataUtilsToken)
export class QMetadataUtils
	implements IQMetadataUtils {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}

	getAllColumns(
		qEntity: IQEntityInternal
	): IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] {
		return qEntity.__driver__.allColumns;
	}

	getDbEntity<IQE extends IQEntityInternal>(
		qEntity: IQE
	): DbEntity {
		return qEntity.__driver__.dbEntity;
	}

	getNewEntity(qEntity: IQEntityInternal): any {
		const dbEntity          = qEntity.__driver__.dbEntity;
		const entityConstructor = this.airportDb.qSchemas[dbEntity.schemaVersion.schema.index].__constructors__[dbEntity.name];
		return new entityConstructor();
	}

}