import { UserAccount_Email } from "@airport/aviation-communication";
import { Injected } from "@airport/direction-indicator";
import { IRepositoryMember, Repository_GUID } from "@airport/ground-control";
import { AND } from "@airport/tarmaq-query";
import { QUserAccount } from "@airport/travel-document-checkpoint";
import { QRepositoryMember } from "../../generated/qInterfaces";
import { RepositoryMember } from "../../ddl/repository/RepositoryMember";
import { BaseRepositoryMemberDao } from "../../generated/baseDaos";
import Q_airport____at_airport_slash_holding_dash_pattern from "../../generated/qApplication";

@Injected()
export class RepositoryMemberDao
    extends BaseRepositoryMemberDao {

    async findForRepositoryAndUser(
        repositoryGUID: Repository_GUID,
        userEmail: UserAccount_Email
    ): Promise<IRepositoryMember> {
        let rm: QRepositoryMember,
            ua: QUserAccount

        return await this._findOne({
            SELECT: {},
            FROM: [
                rm = Q_airport____at_airport_slash_holding_dash_pattern.RepositoryMember,
                ua = rm.userAccount.LEFT_JOIN()
            ],
            WHERE: AND(
                rm.GUID.equals(repositoryGUID),
                ua.email.equals(userEmail)
            )
        })
    }

}
