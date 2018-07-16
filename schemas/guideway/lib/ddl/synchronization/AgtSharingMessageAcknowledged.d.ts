/**
 * Sync log acknowledged is NUMBER(1) instead of boolean, because that allows
 * for MAX(AgtSharingMessage.state) with a GROUP BY.
 */
export declare enum AgtSharingMessageAcknowledged {
    NOT_ACKNOWLEDGED = 0,
    ACKNOWLEDGED = 1,
}
