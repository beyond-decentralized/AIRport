/**
 * Sync log acknowledged is NUMBER(1) instead of boolean, because that allows
 * for MAX(AgtSharingMessage.state) with a GROUP BY.
 */
export var AgtSharingMessageAcknowledged;
(function (AgtSharingMessageAcknowledged) {
    AgtSharingMessageAcknowledged["NOT_ACKNOWLEDGED"] = "NOT_ACKNOWLEDGED";
    AgtSharingMessageAcknowledged["ACKNOWLEDGED"] = "ACKNOWLEDGED";
})(AgtSharingMessageAcknowledged || (AgtSharingMessageAcknowledged = {}));
//# sourceMappingURL=AgtSharingMessageAcknowledged.js.map