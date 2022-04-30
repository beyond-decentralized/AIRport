var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/air-control';
let ApplicationRecorder = class ApplicationRecorder {
    async record(ddlObjects, 
    // normalOperation: boolean,
    context) {
        await this.transactionManager.transactInternal(async () => {
            // FIXME: add support for real application versioning
            this.setDefaultVersioning(ddlObjects);
            await this.domainDao.checkAndInsertIfNeeded(ddlObjects.domains);
            await this.applicationDao.insert(ddlObjects.applications);
            await this.applicationVersionDao.insert(ddlObjects.applicationVersions);
            await this.applicationReferenceDao.insert(ddlObjects.applicationReferences);
            await this.applicationEntityDao.insert(ddlObjects.entities);
            await this.applicationPropertyDao.insert(ddlObjects.properties);
            await this.applicationRelationDao.insert(ddlObjects.relations);
            await this.applicationColumnDao.insert(ddlObjects.columns);
            await this.applicationPropertyColumnDao.insert(ddlObjects.propertyColumns);
            await this.applicationRelationColumnDao.insert(ddlObjects.relationColumns);
        }, context);
    }
    setDefaultVersioning(ddlObjects) {
        for (const applicationReference of ddlObjects.applicationReferences) {
            applicationReference.deprecatedSinceVersion = null;
            applicationReference.removedInVersion = null;
            applicationReference.sinceVersion = applicationReference.ownApplicationVersion;
        }
        for (const entity of ddlObjects.entities) {
            entity.deprecatedSinceVersion = null;
            entity.removedInVersion = null;
            entity.sinceVersion = entity.applicationVersion;
        }
        for (const property of ddlObjects.properties) {
            property.deprecatedSinceVersion = null;
            property.removedInVersion = null;
            property.sinceVersion = property.entity.applicationVersion;
        }
        for (const relation of ddlObjects.relations) {
            relation.deprecatedSinceVersion = null;
            relation.removedInVersion = null;
            relation.sinceVersion = relation.entity.applicationVersion;
        }
        for (const column of ddlObjects.columns) {
            column.deprecatedSinceVersion = null;
            column.removedInVersion = null;
            column.sinceVersion = column.entity.applicationVersion;
        }
        for (const propertyColumn of ddlObjects.propertyColumns) {
            propertyColumn.deprecatedSinceVersion = null;
            propertyColumn.removedInVersion = null;
            propertyColumn.sinceVersion = propertyColumn.property.entity.applicationVersion;
        }
        for (const relationColumn of ddlObjects.relationColumns) {
            relationColumn.deprecatedSinceVersion = null;
            relationColumn.removedInVersion = null;
            relationColumn.sinceVersion = relationColumn.parentRelation.entity.applicationVersion;
        }
    }
    async bulkCreate(dao, entities, context) {
        await dao.save(entities, context);
    }
};
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationColumnDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationEntityDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationPropertyColumnDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationPropertyDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationReferenceDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationRelationColumnDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationRelationDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "applicationVersionDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "domainDao", void 0);
__decorate([
    Inject()
], ApplicationRecorder.prototype, "transactionManager", void 0);
ApplicationRecorder = __decorate([
    Injected()
], ApplicationRecorder);
export { ApplicationRecorder };
//# sourceMappingURL=ApplicationRecorder.js.map