import { IContext, Injected } from "@airport/direction-indicator";
import { ApplicationApiReturnType } from "../../../ddl/application/api/ApplicationApiReturnType";
import { BaseApplicationApiReturnTypeDao, IBaseApplicationApiReturnTypeDao } from "../../../generated/baseDaos";
import Q_airport____at_airport_slash_airspace from "../../../generated/qApplication";
import { QApplicationApiReturnType } from "../../../generated/qInterfaces";

export interface IApplicationApiReturnTypeDao
    extends IBaseApplicationApiReturnTypeDao {

    insert(
        applicationApiReturnTypes: ApplicationApiReturnType[],
        context: IContext
    ): Promise<void>

}

@Injected()
export class ApplicationApiReturnTypeDao
    extends BaseApplicationApiReturnTypeDao
    implements IApplicationApiReturnTypeDao {

    async insert(
        applicationApiReturnTypes: ApplicationApiReturnType[],
        context: IContext
    ): Promise<void> {
        let aart: QApplicationApiReturnType;
        const VALUES = []
        for (const applicationApiReturnType of applicationApiReturnTypes) {
            VALUES.push([
                applicationApiReturnType._localId, applicationApiReturnType.isArray,
                applicationApiReturnType.type
            ])
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: aart = Q_airport____at_airport_slash_airspace.ApplicationApiReturnType,
            columns: [
                aart._localId,
                aart.isArray,
                aart.operation._localId,
                aart.type
            ],
            VALUES
        }, context)
    }
}
