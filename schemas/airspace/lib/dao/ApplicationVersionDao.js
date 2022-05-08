var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { and, Y } from '@airport/air-traffic-control';
import { Injected } from '@airport/direction-indicator';
import { BaseApplicationVersionDao, Q } from '../generated/generated';
let ApplicationVersionDao = class ApplicationVersionDao extends BaseApplicationVersionDao {
    /*
    async findAllLatestForApplicationIndexes(
        applicationIndexes: ApplicationIndex[]
    ): Promise<IApplicationVersion[]> {
        let sv: QApplicationVersion

        return await this.db.find.tree({
            from: [
                sv = Q.ApplicationVersion
            ],
            select: {},
            where: and(
                sv.id.in(this.idsForMaxVersionSelect()),
                sv.application.index.in(applicationIndexes)
            )
        })
    }
    */
    async findAllActiveOrderByApplicationIndexAndId() {
        let sv;
        // let s: QApplication
        return await this.db.find.tree({
            from: [
                sv = Q.ApplicationVersion,
                // s = sv.application.innerJoin()
            ],
            select: {},
            orderBy: [
                sv.application.index.asc(),
                sv.id.desc()
            ]
        });
    }
    async findByDomainNamesAndApplicationNames(domainNames, applicationNames) {
        let sv;
        let s;
        let d;
        return await this.db.find.tree({
            select: {
                id: Y,
                integerVersion: Y,
                application: {
                    domain: {
                        name: Y
                    },
                    fullName: Y,
                    name: Y
                }
            },
            from: [
                sv = Q.ApplicationVersion,
                s = sv.application.innerJoin(),
                d = s.domain.innerJoin()
            ],
            where: and(d.name.in(domainNames), s.name.in(applicationNames))
        });
    }
    /*
    async findMaxVersionedMapByApplicationAndDomainNames(
        applicationDomainNames: DomainName[],
        applicationNames: ApplicationName[]
    ): Promise<Map<DomainName, Map<ApplicationName, IApplicationVersion>>> {
        const maxVersionedMapByApplicationAndDomainNames
                  : Map<DomainName, Map<ApplicationName, IApplicationVersion>>
                  = new Map()

        let sv: QApplicationVersion
        let s: QApplication
        let d: QDomain

        const maxApplicationVersions: IApplicationVersion[] = <any>await this.db.find.tree({
            select: {
                integerVersion: Y,
                majorVersion: Y,
                minorVersion: Y,
                patchVersion: Y,
                application: {
                    index: Y,
                    name: Y,
                    domain: {
                        id: Y,
                        name: Y
                    }
                },
                id: Y
            },
            from: [
                sv = Q.ApplicationVersion,
                s = sv.application.innerJoin(),
                d = s.domain.innerJoin()
            ],
            where: and(
                sv.id.in(this.idsForMaxVersionSelect()),
                d.name.in(applicationDomainNames),
                s.name.in(applicationNames)
            ),
        })

        for (const maxApplicationVersion of maxApplicationVersions) {
            const application = maxApplicationVersion.application
            this.utils.ensureChildJsMap(
                maxVersionedMapByApplicationAndDomainNames, application.domain.name)
                .set(application.name, maxApplicationVersion)
        }


        return maxVersionedMapByApplicationAndDomainNames
    }

    private idsForMaxVersionSelect(): RawFieldQuery<IQNumberField> {
        let svMax
        let sv2: QApplicationVersion

        return field({
            from: [
                svMax = tree({
                    from: [
                        sv2 = Q.ApplicationVersion
                    ],
                    select: distinct({
                        integerVersion: max(sv2.integerVersion),
                        id: sv2.id,
                        applicationIndex: sv2.application.index
                    })
                })
            ],
            select: svMax.id
        })
    }
*/
    async insert(applicationVersions, context) {
        let sv;
        const values = [];
        for (const applicationVersion of applicationVersions) {
            values.push([
                applicationVersion.id, applicationVersion.integerVersion,
                applicationVersion.versionString, applicationVersion.majorVersion,
                applicationVersion.minorVersion, applicationVersion.patchVersion,
                applicationVersion.application.index, applicationVersion.jsonApplication
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sv = Q.ApplicationVersion,
            columns: [
                sv.id,
                sv.integerVersion,
                sv.versionString,
                sv.majorVersion,
                sv.minorVersion,
                sv.patchVersion,
                sv.application.index,
                sv.jsonApplication
            ],
            values
        }, context);
    }
};
ApplicationVersionDao = __decorate([
    Injected()
], ApplicationVersionDao);
export { ApplicationVersionDao };
//# sourceMappingURL=ApplicationVersionDao.js.map