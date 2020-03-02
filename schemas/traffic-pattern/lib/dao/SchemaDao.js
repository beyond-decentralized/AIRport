"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const tokens_1 = require("../tokens");
const generated_1 = require("../generated/generated");
class SchemaDao extends generated_1.BaseSchemaDao {
    async findAllActive() {
        let s;
        return this.db.find.tree({
            select: {},
            from: [
                s = generated_1.Q.Schema
            ]
        });
    }
    async findMapByVersionIds(schemaVersionIds) {
        const schemaMapByIndex = new Map();
        let s, sv;
        const schemas = await this.db.find.tree({
            select: {
                index: air_control_1.Y,
                domain: {
                    id: air_control_1.Y,
                    name: air_control_1.Y
                },
                name: air_control_1.Y,
                versions: {
                    id: air_control_1.Y,
                    majorVersion: air_control_1.Y,
                    minorVersion: air_control_1.Y,
                    patchVersion: air_control_1.Y
                }
            },
            from: [
                s = generated_1.Q.Schema,
                sv = s.versions.innerJoin()
            ],
            where: sv.id.in(schemaVersionIds)
        });
        for (const schema of schemas) {
            for (const schemaVersion of schema.versions) {
                schemaMapByIndex.set(schemaVersion.id, schema);
            }
        }
        return schemaMapByIndex;
    }
    async findMaxIndex() {
        const airDb = await di_1.container(this).get(air_control_1.AIR_DB);
        const s = generated_1.Q.Schema;
        return await airDb.findOne.field({
            select: air_control_1.max(s.index),
            from: [
                s
            ]
        });
    }
    async findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames, schemaNames) {
        const airDb = await di_1.container(this).get(air_control_1.AIR_DB);
        const maxVersionedMapBySchemaAndDomainNames = new Map();
        let sv;
        let s;
        let d;
        let sMaV;
        let sMiV;
        const schemas = await airDb.find.tree({
            from: [
                sMiV = air_control_1.tree({
                    from: [
                        sMaV = air_control_1.tree({
                            from: [
                                s = generated_1.Q.Schema,
                                sv = s.versions.innerJoin(),
                                d = s.domain.innerJoin()
                            ],
                            select: {
                                index: s.index,
                                domainId: d.id,
                                domainName: d.name,
                                name: s.name,
                                majorVersion: air_control_1.max(sv.majorVersion),
                                minorVersion: sv.minorVersion,
                                patchVersion: sv.patchVersion,
                            },
                            where: air_control_1.and(d.name.in(schemaDomainNames), s.name.in(schemaNames)),
                            groupBy: [
                                s.index,
                                d.id,
                                d.name,
                                s.name,
                                sv.minorVersion,
                                sv.patchVersion,
                            ]
                        })
                    ],
                    select: {
                        index: sMaV.index,
                        domainId: sMaV.domainId,
                        domainName: sMaV.domainName,
                        name: sMaV.name,
                        majorVersion: sMaV.majorVersion,
                        minorVersion: air_control_1.max(sMaV.minorVersion),
                        patchVersion: sMaV.patchVersion,
                    },
                    groupBy: [
                        sMaV.index,
                        sMaV.domainId,
                        sMaV.domainName,
                        sMaV.name,
                        sMaV.majorVersion,
                        sMaV.patchVersion
                    ]
                })
            ],
            select: {
                index: sMiV.index,
                domain: {
                    id: sMiV.domainId,
                    name: sMiV.domainName
                },
                name: sMiV.name,
                majorVersion: sMiV.majorVersion,
                minorVersion: sMiV.minorVersion,
                patchVersion: air_control_1.max(sMiV.patchVersion),
            },
            groupBy: [
                sMiV.index,
                sMiV.domainId,
                sMiV.domainName,
                sMiV.name,
                sMiV.majorVersion,
                sMiV.minorVersion
            ]
        });
        for (const schema of schemas) {
            ground_control_1.ensureChildJsMap(maxVersionedMapBySchemaAndDomainNames, schema.domain.name)
                .set(schema.name, schema);
        }
        return maxVersionedMapBySchemaAndDomainNames;
    }
    async setStatusByIndexes(indexes, status) {
        let s;
        await this.db.updateWhere({
            update: s = generated_1.Q.Schema,
            set: {
                status
            },
            where: s.index.in(indexes)
        });
    }
    async findMapByNames(schemaNames) {
        const mapByName = new Map();
        let s;
        const records = await this.db.find.tree({
            select: {},
            from: [
                s = generated_1.Q.Schema
            ],
            where: s.name.in(schemaNames)
        });
        for (const record of records) {
            mapByName.set(record.name, record);
        }
        return mapByName;
    }
}
exports.SchemaDao = SchemaDao;
di_1.DI.set(tokens_1.SCHEMA_DAO, SchemaDao);
//# sourceMappingURL=SchemaDao.js.map