"use strict";
// export interface AddToDatabaseJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
// 	(
// 		otm: QOtm, // One-to-Many IQEntity
// 		mto: QMto, // Many-to-One IQEntity
// 		db: IAirportDatabase, // Reference to the Airport functionality
// 		f: FunctionsAndOperators // Reference to all available functions and operators
// 	): JSONBaseOperation;
// }
Object.defineProperty(exports, "__esModule", { value: true });
var CascadeType;
(function (CascadeType) {
    CascadeType[CascadeType["NONE"] = 0] = "NONE";
    CascadeType[CascadeType["ALL"] = 1] = "ALL";
    // Cascade detach is not implemented because there is no session
    // DETACH,
    // Cascade merge is not implemented because there is no session
    // MERGE,
    CascadeType[CascadeType["PERSIST"] = 2] = "PERSIST";
    // Cascade refresh is not implemented because there is no session
    // REFRESH,
    CascadeType[CascadeType["REMOVE"] = 3] = "REMOVE"; // Cascade on remove operation
})(CascadeType = exports.CascadeType || (exports.CascadeType = {}));
var CascadeOverwrite;
(function (CascadeOverwrite) {
    // Always cascade
    CascadeOverwrite[CascadeOverwrite["ALWAYS"] = 0] = "ALWAYS";
    // Follow the default entity configuration rules
    CascadeOverwrite[CascadeOverwrite["DEFAULT"] = 1] = "DEFAULT";
    // Never cascade
    CascadeOverwrite[CascadeOverwrite["NEVER"] = 2] = "NEVER";
})(CascadeOverwrite = exports.CascadeOverwrite || (exports.CascadeOverwrite = {}));
//# sourceMappingURL=DatabaseRelationConfiguration.js.map