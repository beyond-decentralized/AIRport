import { abs, add, avg, concat, count, distinct, divide, exists, format, intersect, lcase, len, max, mid, min, minus, modulus, multiply, now, replace, round, subtract, sum, trim, ucase, union, unionAll } from "./core/field/Functions";
import { bool, date, num, str, wrapPrimitive } from "./core/field/WrapperFunctions";
import { and, not, or } from "./core/operation/LogicalOperation";
export const databaseState = {
    applications: [],
    entityMap: new Map(),
    functions: {
        abs,
        avg,
        count,
        max,
        min,
        sum,
        ucase,
        lcase,
        mid,
        len,
        round,
        now,
        format,
        replace,
        trim,
        distinct,
        exists,
        divide,
        subtract,
        modulus,
        multiply,
        add,
        concat,
        union,
        unionAll,
        intersect,
        minus,
        // logical operators
        and,
        not,
        or,
        // primitive wrappers
        bool,
        date,
        num,
        str,
        wrapPrimitive,
    },
    qApplications: [],
    QM: {},
};
//# sourceMappingURL=databaseState.js.map