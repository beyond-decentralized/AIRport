"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatastructureUtils {
    ensureChildArray(parentContainer, index) {
        let childArray;
        if (parentContainer instanceof Map) {
            childArray = parentContainer.get(index);
        }
        else {
            childArray = parentContainer[index];
        }
        if (!childArray) {
            childArray = [];
            if (parentContainer instanceof Map) {
                parentContainer.set(index, childArray);
            }
            else {
                parentContainer[index] = childArray;
            }
        }
        return childArray;
    }
    ;
    ensureChildMap(parentContainer, index) {
        let childObject;
        if (parentContainer instanceof Map) {
            childObject = parentContainer.get(index);
            if (!childObject) {
                childObject = {};
                parentContainer.set(index, childObject);
            }
        }
        else {
            childObject = parentContainer[index];
            if (!childObject) {
                childObject = {};
                parentContainer[index] = childObject;
            }
        }
        return childObject;
    }
    ensureChildJsMap(parentContainer, index) {
        let childMap = parentContainer.get(index);
        if (!childMap) {
            childMap = new Map();
            parentContainer.set(index, childMap);
        }
        return childMap;
    }
    ensureChildJsSet(parentContainer, index) {
        let childSet = parentContainer.get(index);
        if (!childSet) {
            childSet = new Set();
            parentContainer.set(index, childSet);
        }
        return childSet;
    }
}
exports.DatastructureUtils = DatastructureUtils;
//# sourceMappingURL=DatastructureUtils.js.map