var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { FieldSQLQuery } from '../FieldSQLQuery';
import { TreeSQLQuery } from '../TreeSQLQuery';
let SubStatementSqlGenerator = class SubStatementSqlGenerator {
    getTreeQuerySql(jsonTreeQuery, dialect, context) {
        let mappedSqlQuery = new TreeSQLQuery(jsonTreeQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this.storeDriver, this, this.utils, context);
        const subQuerySql = mappedSqlQuery.toSQL({}, context);
        const parameterReferences = mappedSqlQuery.parameterReferences;
        return {
            parameterReferences,
            subQuerySql
        };
    }
    getFieldQuerySql(jsonFieldSqlSubQuery, dialect, qEntityMapByAlias, context) {
        let fieldSqlQuery = new FieldSQLQuery(jsonFieldSqlSubQuery, dialect, this.airportDatabase, this.applicationUtils, this.entityStateManager, this.qMetadataUtils, this.qValidator, this.relationManager, this.sqlQueryAdapter, this.storeDriver, this, this.utils, context);
        fieldSqlQuery.addQEntityMapByAlias(qEntityMapByAlias);
        const subQuerySql = fieldSqlQuery.toSQL({}, context);
        const parameterReferences = fieldSqlQuery.parameterReferences;
        return {
            parameterReferences,
            subQuerySql
        };
    }
};
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "qMetadataUtils", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "qValidator", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "relationManager", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "sqlQueryAdapter", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "storeDriver", void 0);
__decorate([
    Inject()
], SubStatementSqlGenerator.prototype, "utils", void 0);
SubStatementSqlGenerator = __decorate([
    Injected()
], SubStatementSqlGenerator);
export { SubStatementSqlGenerator };
//# sourceMappingURL=SubStatementSqlGenerator.js.map