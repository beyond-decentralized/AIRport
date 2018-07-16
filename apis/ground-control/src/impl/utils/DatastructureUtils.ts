import {IDatastructureUtils} from "../../lingo/utils/DatastructureUtils";

export class DatastructureUtils
	implements IDatastructureUtils {

	ensureChildArray<E>(
		parentContainer: E[][] | {} | Map<number | string, E[]>,
		index: number | string
	): E[] {
		let childArray;
		if (parentContainer instanceof Map) {
			childArray = parentContainer.get(index);
		} else {
			childArray = parentContainer[index];
		}
		if (!childArray) {
			childArray = [];
			if (parentContainer instanceof Map) {
				parentContainer.set(index, childArray);
			} else {
				parentContainer[index] = childArray;
			}
		}

		return childArray;
	};

	ensureChildMap(
		parentContainer: any[] | {} | Map<number | string, any>,
		index: number | string
	): {} {
		let childObject;
		if (parentContainer instanceof Map) {
			childObject = parentContainer.get(index);
			if (!childObject) {
				childObject = {};
				parentContainer.set(index, childObject);
			}
		} else {
			childObject = parentContainer[index];
			if (!childObject) {
				childObject = {};
				parentContainer[index] = childObject;
			}
		}

		return childObject;
	}

	ensureChildJsMap<E, I extends number | string, CI extends number | string>(
		parentContainer: Map<number | string, Map<CI, E>>,
		index: I
	): Map<CI, E> {
		let childMap = parentContainer.get(index);
		if (!childMap) {
			childMap = new Map();
			parentContainer.set(index, childMap);
		}

		return childMap;
	}

	ensureChildJsSet<E>(
		parentContainer: Map<number | string, Set<E>>,
		index: number | string
	): Set<E> {
		let childSet = parentContainer.get(index);
		if (!childSet) {
			childSet = new Set();
			parentContainer.set(index, childSet);
		}

		return childSet;
	}

}