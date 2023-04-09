import { IContext, Injected } from "@airport/direction-indicator";
import { Y } from "@airport/tarmaq-query";
import { ApplicationApiClass } from "../../../ddl/application/api/ApplicationApiClass";
import { BaseApplicationApiClassDao, IBaseApplicationApiClassDao } from "../../../generated/baseDaos";
import Q_airport____at_airport_slash_airspace from "../../../generated/qApplication";
import { QApplicationApiClass, QApplicationApiOperation, QApplicationApiParameter, QApplicationApiReturnType } from "../../../generated/qInterfaces";

export interface IApplicationApiClassDao
    extends IBaseApplicationApiClassDao {

    findWithAllNestedObjects(): Promise<ApplicationApiClass[]>

    insert(
        applicationApiClasses: ApplicationApiClass[],
        context: IContext
    ): Promise<void>

}

@Injected()
export class ApplicationApiClassDao
    extends BaseApplicationApiClassDao
    implements IApplicationApiClassDao {

    async findWithAllNestedObjects(): Promise<ApplicationApiClass[]> {
        let aac: QApplicationApiClass,
            aao: QApplicationApiOperation,
            aap: QApplicationApiParameter,
            aart: QApplicationApiReturnType

        return await this._find({
            SELECT: {
                "*": Y,
                operations: {
                    "*": Y,
                    parameters: {},
                    returnType: {}
                }
            },
            FROM: [
                aac = Q_airport____at_airport_slash_airspace.ApplicationApiClass,
                aao = aac.operations.LEFT_JOIN(),
                aap = aao.parameters.LEFT_JOIN(),
                aart = aao.returnType.LEFT_JOIN()
            ]
        })
    }

    async insert(
        applicationApiClasses: ApplicationApiClass[],
        context: IContext
    ): Promise<void> {
        let aac: QApplicationApiClass;
        const VALUES = []
        for (const applicationApiClass of applicationApiClasses) {
            VALUES.push([
                applicationApiClass._localId,
                applicationApiClass.name,
                applicationApiClass.applicationVersion._localId,
            ])
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: aac = Q_airport____at_airport_slash_airspace.ApplicationApiClasss,
            columns: [
                aac._localId,
                aac.name,
                aac.applicationVersion._localId
            ],
            VALUES
        }, context)
    }

}
