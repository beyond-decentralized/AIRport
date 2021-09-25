import { AIRPORT_DATABASE, and, max, tree, Y } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { ensureChildJsMap } from '@airport/ground-control';
import { SCHEMA_DAO } from '../tokens';
import { BaseSchemaDao, Q } from '../generated/generated';
export class SchemaDao extends BaseSchemaDao {
    async findAllActive() {
        let s;
        return this.db.find.tree({
            select: {},
            from: [
                s = Q.Schema
            ]
        });
    }
    async findMapByVersionIds(schemaVersionIds) {
        const schemaMapByIndex = new Map();
        let s, sv;
        const schemas = await this.db.find.tree({
            select: {
                index: Y,
                domain: {
                    id: Y,
                    name: Y
                },
                name: Y,
                versions: {
                    id: Y,
                    majorVersion: Y,
                    minorVersion: Y,
                    patchVersion: Y
                }
            },
            from: [
                s = Q.Schema,
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
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const s = Q.Schema;
        return await airDb.findOne.field({
            select: max(s.index),
            from: [
                s
            ]
        });
    }
    async findMaxVersionedMapBySchemaAndDomainNames(schemaDomainNames, schemaNames) {
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const maxVersionedMapBySchemaAndDomainNames = new Map();
        let sv;
        let s;
        let d;
        let sMaV;
        let sMiV;
        const schemaLookupRecords = await airDb.find.tree({
            from: [
                sMiV = tree({
                    from: [
                        sMaV = tree({
                            from: [
                                s = Q.Schema,
                                sv = s.versions.innerJoin(),
                                d = s.domain.innerJoin()
                            ],
                            select: {
                                index: s.index,
                                domainId: d.id,
                                domainName: d.name,
                                name: s.name,
                                jsonSchema: s.jsonSchema,
                                majorVersion: max(sv.majorVersion),
                                minorVersion: sv.minorVersion,
                                patchVersion: sv.patchVersion,
                            },
                            where: and(d.name.in(schemaDomainNames), s.name.in(schemaNames)),
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
                        jsonSchema: sMaV.jsonSchema,
                        name: sMaV.name,
                        majorVersion: sMaV.majorVersion,
                        minorVersion: max(sMaV.minorVersion),
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
                jsonSchema: sMiV.jsonSchema,
                name: sMiV.name,
                majorVersion: sMiV.majorVersion,
                minorVersion: sMiV.minorVersion,
                patchVersion: max(sMiV.patchVersion),
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
        for (const schemaLookupRecord of schemaLookupRecords) {
            ensureChildJsMap(maxVersionedMapBySchemaAndDomainNames, schemaLookupRecord.domain.name)
                .set(schemaLookupRecord.name, schemaLookupRecord);
        }
        return maxVersionedMapBySchemaAndDomainNames;
    }
    async setStatusByIndexes(indexes, status) {
        let s;
        await this.db.updateWhere({
            update: s = Q.Schema,
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
                s = Q.Schema
            ],
            where: s.name.in(schemaNames)
        });
        for (const record of records) {
            mapByName.set(record.name, record);
        }
        return mapByName;
    }
}
DI.set(SCHEMA_DAO, SchemaDao);
//# sourceMappingURL=SchemaDao.js.map