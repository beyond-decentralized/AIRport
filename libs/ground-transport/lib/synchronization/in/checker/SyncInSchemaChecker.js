import { container } from "@airport/di";
import { SchemaStatus } from '@airport/ground-control';
import { DOMAIN_DAO, SCHEMA_DAO } from "@airport/airspace";
export class SyncInSchemaChecker {
    async ensureSchemas(message) {
        try {
            let schemaCheckMap = await this.checkSchemasAndDomains(message);
            for (let i = 0; i < message.schemas.length; i++) {
                let schema = message.schemas[i];
                message.schemas[i] = schemaCheckMap
                    .get(schema.domain.name).get(schema.name)
                    .schema;
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    async checkSchemasAndDomains(message) {
        const { allSchemaNames, domainCheckMap, domainNames, schemaCheckMap } = this.getNames(message);
        const schemaDao = await container(this).get(SCHEMA_DAO);
        const schemas = await schemaDao.findByDomainNamesAndSchemaNames(domainNames, allSchemaNames);
        for (let schema of schemas) {
            let domainName = schema.domain.name;
            let schemaName = schema.name;
            for (let [_, schemaCheck] of schemaCheckMap.get(domainName)) {
                if (schemaCheck.schemaName === schemaName) {
                    let domainCheck = domainCheckMap.get(domainName);
                    domainCheck.found = true;
                    domainCheck.domain = schema.domain;
                    schemaCheck.found = true;
                    schemaCheck.schema = schema;
                }
            }
        }
        let domainsToCreate = [];
        for (let [name, domainCheck] of domainCheckMap) {
            if (domainCheck.found) {
                continue;
            }
            let domain = {
                id: null,
                name
            };
            domainCheck.domain = domain;
            domainsToCreate.push(domain);
        }
        if (domainsToCreate.length) {
            const domainDao = await container(this).get(DOMAIN_DAO);
            await domainDao.insert(domainsToCreate);
        }
        let schemasToCreate = [];
        for (let [domainName, schemaChecksByName] of schemaCheckMap) {
            for (let [name, schemaCheck] of schemaChecksByName) {
                if (schemaCheck.found) {
                    continue;
                }
                let domain = domainCheckMap.get(domainName).domain;
                let schema = {
                    domain,
                    index: null,
                    jsonSchema: {},
                    packageName: 'bogus',
                    name,
                    scope: 'private',
                    status: SchemaStatus.STUB,
                    signature: null
                };
                schemaCheck.schema = schema;
                schemasToCreate.push(schema);
            }
        }
        if (schemasToCreate.length) {
            await schemaDao.insert(schemasToCreate);
        }
        return schemaCheckMap;
    }
    getNames(message) {
        if (!message.schemas || !(message.schemas instanceof Array)) {
            throw new Error(`Did not find schemas in TerminalMessage.`);
        }
        const domainCheckMap = new Map();
        const schemaCheckMap = new Map();
        for (let schema of message.schemas) {
            if (typeof schema !== 'object') {
                throw new Error(`Invalid SchemaVersion.schema`);
            }
            if (!schema.name || typeof schema.name !== 'string') {
                throw new Error(`Invalid SchemaVersion.Schema.name`);
            }
            const domain = schema.domain;
            if (typeof domain !== 'object') {
                throw new Error(`Invalid SchemaVersion.Schema.Domain`);
            }
            if (!domain.name || typeof domain.name !== 'string') {
                throw new Error(`Invalid SchemaVersion.Schema.Domain.name`);
            }
            let schemaChecksForDomain = schemaCheckMap.get(domain.name);
            if (!schemaChecksForDomain) {
                schemaChecksForDomain = new Map();
                schemaCheckMap.set(domain.name, schemaChecksForDomain);
            }
            if (!schemaChecksForDomain.has(schema.name)) {
                schemaChecksForDomain.set(schema.name, {
                    schemaName: schema.name,
                });
            }
            let domainCheck = domainCheckMap.get(domain.name);
            if (!domainCheck) {
                domainCheckMap.set(domain.name, {
                    domainName: domain.name
                });
            }
        }
        const domainNames = [];
        const allSchemaNames = [];
        for (const [domainName, schemaChecksForDomainMap] of schemaCheckMap) {
            domainNames.push(domainName);
            for (let [schemaName, _] of schemaChecksForDomainMap) {
                allSchemaNames.push(schemaName);
            }
        }
        return {
            allSchemaNames,
            domainCheckMap,
            domainNames,
            schemaCheckMap
        };
    }
}
//# sourceMappingURL=SyncInSchemaChecker.js.map