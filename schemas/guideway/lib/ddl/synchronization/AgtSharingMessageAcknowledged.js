/**
 * Sync log acknowledged is NUMBER(1) instead of boolean, because that allows
 * for MAX(AgtSharingMessage.state) with a GROUP BY.
 */
export var AgtSharingMessageAcknowledged;
(function (AgtSharingMessageAcknowledged) {
    AgtSharingMessageAcknowledged[AgtSharingMessageAcknowledged["NOT_ACKNOWLEDGED"] = 0] = "NOT_ACKNOWLEDGED";
    AgtSharingMessageAcknowledged[AgtSharingMessageAcknowledged["ACKNOWLEDGED"] = 1] = "ACKNOWLEDGED";
})(AgtSharingMessageAcknowledged || (AgtSharingMessageAcknowledged = {}));
//# sourceMappingURL=AgtSharingMessageAcknowledged.js.map