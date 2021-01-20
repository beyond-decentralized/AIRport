import { SQLDataType } from '@airport/ground-control';
import * as fs from 'fs';
export class VespaSchemaGenerator {
    async generate(store) {
        const workingDirPath = process.cwd().replace(/\\/g, '/');
        const mainDirPath = workingDirPath + '/src/main';
        if (!fs.existsSync(mainDirPath)) {
            fs.mkdirSync(mainDirPath);
        }
        const applicationPath = mainDirPath + '/application';
        if (!fs.existsSync(applicationPath)) {
            fs.mkdirSync(applicationPath);
        }
        const deploymentXml = this.generateDeploymentXml();
        fs.writeFileSync(applicationPath + '/deployment.xml', deploymentXml);
        const hostsXml = this.generateHostsXml();
        fs.writeFileSync(applicationPath + '/hosts.xml', hostsXml);
        const servicesXml = this.generateServicesXml(store);
        fs.writeFileSync(applicationPath + '/services.xml', servicesXml);
        const searchDefinitionsPath = applicationPath + '/searchdefinitions';
        if (!fs.existsSync(searchDefinitionsPath)) {
            fs.mkdirSync(searchDefinitionsPath);
        }
        // make searchdefinitions directory
        //   make 1 .sd file per document
        for (const documentName in store.documentMap) {
            const document = store.documentMap[documentName];
            const searchDefinition = this.generateSearchDefinition(document);
            fs.writeFileSync(applicationPath + '/' + document.name + '.sd', searchDefinition);
        }
    }
    generateDeploymentXml() {
        return `<deployment version='1.0'>
  <test />
  <staging />
  <prod />
</deployment>
`;
    }
    generateHostsXml() {
        return `<hosts>
	<host name='localhost'>
		<alias>node1</alias>
	</host>
</hosts>`;
    }
    generateServicesXml(store) {
        let documents = ``;
        for (const documentName in store.documentMap) {
            const document = store.documentMap[documentName];
            documents += `
			<document mode='index' type='${document.name}'></document>
			`;
        }
        return `<services version='1.0'>
	<container id='default' version='1.0'>
		<document-api/>
		<nodes>
			<node hostalias='node1'/>
		</nodes>
	</container>
	<content id='content' version='1.0'>
		<documents>
			${documents}
		</documents>
		<nodes>
			<node hostalias='node1' distribution-key='0'/>
		</nodes>
		<redundancy>1</redundancy>
	</content>
</services>`;
    }
    generateSearchDefinition(document) {
        let fields = '';
        for (const fieldName in document.fieldMap) {
            const field = document.fieldMap[fieldName];
            let indexing = '';
            let indexingParts = [];
            for (const indexingKeyword in field.indexing) {
                if (field.indexing[indexingKeyword]) {
                    indexingParts.push(indexingKeyword);
                }
            }
            if (indexingParts.length) {
                indexing = `indexing: ` + indexingParts.join(' | ');
            }
            let attribute = '';
            let fieldType = this.getFieldType(field, document);
            fields += `
		field ${fieldName} type ${fieldType} {
			${indexing}
			${attribute}
		}
			`;
        }
        let fieldsets = '';
        for (const fieldsetName in document.fieldsetMap) {
            const fieldset = document.fieldsetMap[fieldsetName];
            let fieldsetFields = [];
            for (const fieldsetField in fieldset.fieldMap) {
                if (fieldset.fieldMap[fieldsetField]) {
                    fieldsetFields.push(fieldsetField);
                }
            }
            fieldsets += `
	fieldset ${fieldset.isDefault ? 'default' : fieldsetName} {
		fields: ${fieldsetFields.join(', ')}
	}
	`;
        }
        return `search ${document.name} {
	document ${document.name} {
		${fields}
	}
	${fieldsets}
}`;
    }
    getFieldType(field, document) {
        switch (field.dbColumn.type) {
            case SQLDataType.ANY:
                return 'string';
            case SQLDataType.BOOLEAN:
                return 'bool';
            case SQLDataType.DATE:
                return 'string';
            case SQLDataType.JSON:
                return 'string';
            case SQLDataType.NUMBER: {
                if (!field.dbColumn.precision) {
                    return 'double';
                }
                if (field.dbColumn.scale) {
                    if (field.dbColumn.precision < 33) {
                        return 'float';
                    }
                    return 'double';
                }
                if (field.dbColumn.precision < 33) {
                    return 'int';
                }
                return 'long';
            }
            case SQLDataType.STRING:
                return 'string';
            default:
                throw new Error(`Unexpected DbColumn type: ${field.dbColumn.type}, on Field
		${field.name}
		of @vespa.Document() ${document.name}`);
        }
    }
}
//# sourceMappingURL=VespaSchemaGenerator.js.map