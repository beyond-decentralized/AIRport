"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../diTokens");
class NonNullValidator {
    validate(entity, jsonInsertValues, dbEntity) {
        const values = jsonInsertValues.V;
        const columns = dbEntity.columns;
        const columnMapByIndex = {};
        for (const column of columns) {
            columnMapByIndex[column.index] = column;
        }
        let draftColumnIndex;
        const presentColumns = jsonInsertValues.C.map(columnIndex => {
            const column = columnMapByIndex[columnIndex];
            if (column.name === ground_control_1.repositoryEntity.IS_DRAFT) {
                draftColumnIndex = columnIndex;
            }
            return columnMapByIndex[columnIndex];
        });
        for (let i = 0; i < values.length; i++) {
            const entityValues = values[i];
            let isDraft = false;
            let hasNonNullViolations = false;
            for (let j = 0; j < presentColumns.length; j++) {
                const column = presentColumns[j];
                if (column.isGenerated) {
                    continue;
                }
                const value = entityValues[j];
                if (j === draftColumnIndex) {
                    isDraft = value;
                }
                if (column.notNull
                    && value === null || value === undefined) {
                    hasNonNullViolations = true;
                }
            }
            if (hasNonNullViolations && !isDraft) {
                throw new Error(`Entity ${i} has null values for "NOT NULL" columns is not a "draft".`);
            }
        }
    }
}
exports.NonNullValidator = NonNullValidator;
di_1.DI.set(diTokens_1.NON_NULL_VALIDATOR, NonNullValidator);
//# sourceMappingURL=NonNullValidator.js.map