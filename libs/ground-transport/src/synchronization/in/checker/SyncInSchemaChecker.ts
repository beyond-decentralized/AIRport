import { TerminalMessage } from "@airport/arrivals-n-departures";
import { container } from "@airport/di";
import { SchemaScope, SchemaStatus } from '@airport/ground-control';
import {
    DOMAIN_DAO,
    IDomain,
    ISchema,
    SCHEMA_DAO
} from "@airport/airspace";

export interface IDomainCheckRecord {
    domain?: IDomain
    domainName: string
    found?: boolean
}

export interface ISchemaCheckRecord {
    found?: boolean
    schemaName: string
    schema?: ISchema;
}

export interface ISyncInSchemaChecker {

    ensureSchemas(
        message: TerminalMessage
    ): Promise<boolean>

}

export class SyncInSchemaChecker
    implements ISyncInSchemaChecker {

    async ensureSchemas(
        message: TerminalMessage
    ): Promise<boolean> {
        try {
            let schemaCheckMap = await this.checkSchemasAndDomains(message);

            for (let i = 0; i < message.schemas.length; i++) {
                let schema = message.schemas[i]
                message.schemas[i] = schemaCheckMap
                    .get(schema.domain.name).get(schema.name)
                    .schema
            }
        } catch (e) {
            console.error(e)
            return false
        }

        return true
    }

    private async checkSchemasAndDomains(
        message: TerminalMessage
    ): Promise<Map<string, Map<string, ISchemaCheckRecord>>> {
        const { allSchemaNames, domainCheckMap, domainNames, schemaCheckMap }
            = this.getNames(message)

        const schemaDao = await container(this).get(SCHEMA_DAO)
        const schemas = await schemaDao.findByDomainNamesAndSchemaNames(domainNames, allSchemaNames)

        for (let schema of schemas) {
            let domainName = schema.domain.name
            let schemaName = schema.name

            for (let [_, schemaCheck] of schemaCheckMap.get(domainName)) {
                if (schemaCheck.schemaName === schemaName) {
                    let domainCheck = domainCheckMap.get(domainName)
                    domainCheck.found = true
                    domainCheck.domain = schema.domain
                    schemaCheck.found = true
                    schemaCheck.schema = schema
                }
            }
        }

        let domainsToCreate: IDomain[] = []
        for (let [name, domainCheck] of domainCheckMap) {
            if (domainCheck.found) {
                continue
            }
            let domain: IDomain = {
                id: null,
                name
            }
            domainCheck.domain = domain
            domainsToCreate.push(domain)
        }
        if (domainsToCreate.length) {
            const domainDao = await container(this).get(DOMAIN_DAO)
            await domainDao.insert(domainsToCreate)
        }

        let schemasToCreate: ISchema[] = []
        for (let [domainName, schemaChecksByName] of schemaCheckMap) {
            for (let [name, schemaCheck] of schemaChecksByName) {
                if (schemaCheck.found) {
                    continue
                }
                let domain = domainCheckMap.get(domainName).domain
                let schema: ISchema = {
                    domain,
                    index: null,
                    jsonSchema: {} as any,
                    packageName: 'bogus',
                    name,
                    scope: 'private',
                    status: SchemaStatus.STUB,
                    signature: null
                }
                schemaCheck.schema = schema
                schemasToCreate.push(schema)
            }
        }

        if (schemasToCreate.length) {
            await schemaDao.insert(schemasToCreate)
        }

        return schemaCheckMap
    }

    private getNames(
        message: TerminalMessage
    ): {
        allSchemaNames: string[],
        domainCheckMap: Map<string, IDomainCheckRecord>,
        domainNames: string[],
        schemaCheckMap: Map<string, Map<string, ISchemaCheckRecord>>
    } {
        if (!message.schemas || !(message.schemas instanceof Array)) {
            throw new Error(`Did not find schemas in TerminalMessage.`)
        }

        const domainCheckMap: Map<string, IDomainCheckRecord> = new Map()
        const schemaCheckMap: Map<string, Map<string, ISchemaCheckRecord>> = new Map()

        for (let schema of message.schemas) {
            if (typeof schema !== 'object') {
                throw new Error(`Invalid SchemaVersion.schema`)
            }
            if (!schema.name || typeof schema.name !== 'string') {
                throw new Error(`Invalid SchemaVersion.Schema.name`)
            }
            const domain = schema.domain
            if (typeof domain !== 'object') {
                throw new Error(`Invalid SchemaVersion.Schema.Domain`)
            }
            if (!domain.name || typeof domain.name !== 'string') {
                throw new Error(`Invalid SchemaVersion.Schema.Domain.name`)
            }
            let schemaChecksForDomain = schemaCheckMap.get(domain.name)
            if (!schemaChecksForDomain) {
                schemaChecksForDomain = new Map()
                schemaCheckMap.set(domain.name, schemaChecksForDomain)
            }
            if (!schemaChecksForDomain.has(schema.name)) {
                schemaChecksForDomain.set(schema.name, {
                    schemaName: schema.name,
                })
            }
            let domainCheck = domainCheckMap.get(domain.name)
            if (!domainCheck) {
                domainCheckMap.set(domain.name, {
                    domainName: domain.name
                })
            }
        }

        const domainNames = []
        const allSchemaNames = []
        for (const [domainName, schemaChecksForDomainMap] of schemaCheckMap) {
            domainNames.push(domainName)
            for (let [schemaName, _] of schemaChecksForDomainMap) {
                allSchemaNames.push(schemaName)
            }
        }

        return {
            allSchemaNames,
            domainCheckMap,
            domainNames,
            schemaCheckMap
        }
    }

}