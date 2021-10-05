import { and } from '@airport/air-control';
import { DI } from '@airport/di';
import { Q } from '..';
import { BaseApplicationDao } from '../generated/baseDaos';
import { APPLICATION_DAO } from '../tokens';
export class ApplicationDao extends BaseApplicationDao {
    async findByDomainNameAndName(domainName, name) {
        let a;
        let d;
        return await this.db.findOne.tree({
            select: {},
            from: [
                a = Q.Application,
                d = a.domain.innerJoin()
            ],
            where: and(d.name.equals(domainName), a.name.equals(name))
        });
    }
}
DI.set(APPLICATION_DAO, ApplicationDao);
//# sourceMappingURL=ApplicationDao.js.map