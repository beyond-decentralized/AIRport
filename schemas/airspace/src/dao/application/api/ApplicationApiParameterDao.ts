import { IContext, Injected } from "@airport/direction-indicator";
import { ApplicationApiParameter } from "../../../ddl/ddl";
import { BaseApplicationApiParameterDao, IBaseApplicationApiParameterDao } from "../../../generated/baseDaos";
import Q_airport____at_airport_slash_airspace from "../../../generated/qApplication";
import { QApplicationApiParameter } from "../../../generated/qInterfaces";

export interface IApplicationApiParameterDao
    extends IBaseApplicationApiParameterDao {

    insert(
        applicationApiParameters: ApplicationApiParameter[],
        context: IContext
    ): Promise<void>

}

@Injected()
export class ApplicationApiParameterDao
    extends BaseApplicationApiParameterDao
    implements IApplicationApiParameterDao {

    async insert(
        applicationApiParameters: ApplicationApiParameter[],
        context: IContext
    ): Promise<void> {
        let aap: QApplicationApiParameter;
        const VALUES = []
        for (const applicationApiParameter of applicationApiParameters) {
            VALUES.push([
                applicationApiParameter._localId, applicationApiParameter.index,
                applicationApiParameter.isRest, applicationApiParameter.operation._localId,
                applicationApiParameter.text
            ])
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: aap = Q_airport____at_airport_slash_airspace.ApplicationApiParameter,
            columns: [
                aap._localId,
                aap.index,
                aap.isRest,
                aap.operation._localId,
                aap.text
            ],
            VALUES
        }, context)
    }

}
