var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ALL_FIELDS, AND, MAX, tree, Y } from '@airport/tarmaq-query';
import { Inject, Injected } from '@airport/direction-indicator';
import { ensureChildJsMap } from '@airport/ground-control';
import { BaseApplicationDao, Q } from '../generated/generated';
let ApplicationDao = class ApplicationDao extends BaseApplicationDao {
    async findAllActive() {
        let s;
        return this.db.find.tree({
            SELECT: {},
            FROM: [
                s = Q.Application
            ]
        });
    }
    async findAllWithJson() {
        let a;
        let av;
        // FIXME: this should be don through currentVersion - verify that it get's populated and switch
        let cv;
        return this.db.find.tree({
            SELECT: {
                ...ALL_FIELDS,
                // currentVersion: {
                // 	applicationVersion: {
                // 		_localId: Y,
                // 		jsonApplication: Y
                // 	}
                // }
                versions: {
                    _localId: Y,
                    jsonApplication: Y
                }
            },
            FROM: [
                a = Q.Application,
                // cv = a.currentVersion.INNER_JOIN(),
                // av = cv.applicationVersion.INNER_JOIN()
                av = a.versions.INNER_JOIN()
            ]
        });
    }
    async findMapByVersionIds(applicationVersionIds) {
        const applicationMapByIndex = new Map();
        let s, sv;
        const applications = await this.db.find.tree({
            SELECT: {
                index: Y,
                domain: {
                    _localId: Y,
                    name: Y
                },
                name: Y,
                fullName: Y,
                versions: {
                    _localId: Y,
                    majorVersion: Y,
                    minorVersion: Y,
                    patchVersion: Y
                }
            },
            FROM: [
                s = Q.Application,
                sv = s.versions.INNER_JOIN()
            ],
            WHERE: sv._localId.IN(applicationVersionIds)
        });
        for (const application of applications) {
            for (const applicationVersion of application.versions) {
                applicationMapByIndex.set(applicationVersion._localId, application);
            }
        }
        return applicationMapByIndex;
    }
    async findMaxIndex() {
        const s = Q.Application;
        return await this.airportDatabase.findOne.field({
            SELECT: MAX(s.index),
            FROM: [
                s
            ]
        });
    }
    async findMaxVersionedMapByApplicationAndDomain_Names(applicationDomain_Names, applicationNames) {
        const maxVersionedMapByApplicationAndDomain_Names = new Map();
        let sv;
        let s;
        let d;
        let sMaV;
        let sMiV;
        const applicationLookupRecords = await this.airportDatabase.find.tree({
            FROM: [
                sMiV = tree({
                    FROM: [
                        sMaV = tree({
                            FROM: [
                                s = Q.Application,
                                sv = s.versions.INNER_JOIN(),
                                d = s.domain.INNER_JOIN()
                            ],
                            SELECT: {
                                index: s.index,
                                domainId: d._localId,
                                domainName: d.name,
                                name: s.name,
                                majorVersion: MAX(sv.majorVersion),
                                minorVersion: sv.minorVersion,
                                patchVersion: sv.patchVersion,
                            },
                            WHERE: AND(d.name.IN(applicationDomain_Names), s.name.IN(applicationNames)),
                            GROUP_BY: [
                                s.index,
                                d._localId,
                                d.name,
                                s.name,
                                sv.minorVersion,
                                sv.patchVersion,
                            ]
                        })
                    ],
                    SELECT: {
                        index: sMaV.index,
                        domainId: sMaV.domainId,
                        domainName: sMaV.domainName,
                        name: sMaV.name,
                        majorVersion: sMaV.majorVersion,
                        minorVersion: MAX(sMaV.minorVersion),
                        patchVersion: sMaV.patchVersion,
                    },
                    GROUP_BY: [
                        sMaV.index,
                        sMaV.domainId,
                        sMaV.domainName,
                        sMaV.name,
                        sMaV.majorVersion,
                        sMaV.patchVersion
                    ]
                })
            ],
            SELECT: {
                index: sMiV.index,
                domain: {
                    _localId: sMiV.domainId,
                    name: sMiV.domainName
                },
                name: sMiV.name,
                majorVersion: sMiV.majorVersion,
                minorVersion: sMiV.minorVersion,
                patchVersion: MAX(sMiV.patchVersion),
            },
            GROUP_BY: [
                sMiV.index,
                sMiV.domainId,
                sMiV.domainName,
                sMiV.name,
                sMiV.majorVersion,
                sMiV.minorVersion
            ]
        });
        for (const applicationLookupRecord of applicationLookupRecords) {
            ensureChildJsMap(maxVersionedMapByApplicationAndDomain_Names, applicationLookupRecord.domain.name)
                .set(applicationLookupRecord.name, applicationLookupRecord);
        }
        return maxVersionedMapByApplicationAndDomain_Names;
    }
    async setStatusByIndexes(indexes, status) {
        let s;
        await this.db.updateWhere({
            UPDATE: s = Q.Application,
            SET: {
                status
            },
            WHERE: s.index.IN(indexes)
        });
    }
    async findMapByFullNames(fullApplication_Names) {
        const mapByFullName = new Map();
        let s;
        const records = await this.db.find.tree({
            SELECT: {},
            FROM: [
                s = Q.Application
            ],
            WHERE: s.fullName.IN(fullApplication_Names)
        });
        for (const record of records) {
            mapByFullName.set(record.fullName, record);
        }
        return mapByFullName;
    }
    async findByDomain_NamesAndApplication_Names(domainNames, applicationNames) {
        let s;
        let d;
        return await this.db.find.tree({
            SELECT: {
                index: Y,
                domain: {
                    _localId: Y,
                    name: Y
                },
                fullName: Y,
                name: Y
            },
            FROM: [
                s = Q.Application,
                d = s.domain.INNER_JOIN()
            ],
            WHERE: AND(d.name.IN(domainNames), s.name.IN(applicationNames))
        });
    }
    async findByIndex(index) {
        let a;
        let d;
        return await this.db.findOne.tree({
            SELECT: {
                ...ALL_FIELDS,
                domain: {}
            },
            FROM: [
                a = Q.Application,
                d = a.domain.INNER_JOIN()
            ],
            WHERE: a.index.equals(index)
        });
    }
    async insert(applications, context) {
        let a;
        const VALUES = [];
        for (const application of applications) {
            VALUES.push([
                application.index, application.domain._localId, application.scope,
                application.fullName, application.name,
                // application.packageName,
                application.status, application.signature
            ]);
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: a = Q.Application,
            columns: [
                a.index,
                a.domain._localId,
                a.scope,
                a.fullName,
                a.name,
                // a.packageName,
                a.status,
                a.signature
            ],
            VALUES
        }, context);
    }
};
__decorate([
    Inject()
], ApplicationDao.prototype, "airportDatabase", void 0);
ApplicationDao = __decorate([
    Injected()
], ApplicationDao);
export { ApplicationDao };
//# sourceMappingURL=ApplicationDao.js.map