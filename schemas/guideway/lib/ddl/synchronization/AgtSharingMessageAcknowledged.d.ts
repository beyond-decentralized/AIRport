/**
 * Sync log acknowledged is NUMBER(1) instead of boolean, because that allows
 * for MAX(AgtSharingMessage.state) with a GROUP BY.
 */
export declare enum AgtSharingMessageAcknowledged {
    NOT_ACKNOWLEDGED = "NOT_ACKNOWLEDGED",
    ACKNOWLEDGED = "ACKNOWLEDGED"
}
//# sourceMappingURL=AgtSharingMessageAcknowledged.d.ts.map