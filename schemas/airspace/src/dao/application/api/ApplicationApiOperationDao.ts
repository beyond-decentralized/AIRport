import { IContext, Injected } from "@airport/direction-indicator";
import { QApplicationApiOperation } from "../../../../dist/app/bundle";
import { ApplicationApiOperation } from "../../../ddl/ddl";
import { BaseApplicationApiOperationDao, IBaseApplicationApiOperationDao } from "../../../generated/baseDaos";
import Q_airport____at_airport_slash_airspace from "../../../generated/qApplication";

export interface IApplicationApiOperationDao
    extends IBaseApplicationApiOperationDao {

    insert(
        applicationApiOperations: ApplicationApiOperation[],
        context: IContext
    ): Promise<void>

}

@Injected()
export class ApplicationApiOperationDao
    extends BaseApplicationApiOperationDao
    implements IApplicationApiOperationDao {

    async insert(
        applicationApiOperations: ApplicationApiOperation[],
        context: IContext
    ): Promise<void> {
        let aao: QApplicationApiOperation;
        const VALUES = []
        for (const applicationApiOperation of applicationApiOperations) {
            VALUES.push([
                applicationApiOperation._localId, applicationApiOperation.isAsync,
                applicationApiOperation.name, applicationApiOperation.apiClass._localId,
            ])
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: aao = Q_airport____at_airport_slash_airspace.ApplicationApiOperation,
            columns: [
                aao._localId,
                aao.isAsync,
                aao.name,
                aao.apiClass._localId
            ],
            VALUES
        }, context)
    }

}
