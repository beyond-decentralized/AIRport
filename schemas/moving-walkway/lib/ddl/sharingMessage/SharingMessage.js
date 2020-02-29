var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbDate, DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-control";
// FIXME: SECURITY - ensure that a given sharing message is processed only once by a given AGT
/**
 * A sharing message is a record of a number of RepositoryTransactionBlocks
 * being sent to or from given AGT.  Other SharingMessages are supported as
 * well.
 *
 * When the data in an incoming SharingMessage isn't ready to be processed
 * because of:
 *  Locally missing schemas
 *  Locally outdated schemas
 *  Locally missing data
 *  Received data needing to be upgraded to latest version of schema
 *
 * Q: Should the entire message be blocked from processing or just the affected
 * RTBs?
 *
 * Entire Message
 * PROs:
 *  All related data is guaranteed to be synced at to local TM at the same time
 *
 * CONs:
 *  Any data that is not related to blocked RTBs is also blocked
 *
 * Just affected RTBs:
 * PROs:
 *  System keeps you as up to date as possible, even though some of the updates
 *  may appear to be partial (across repository boundaries).  However,
 *  it should still be usable as long as a repository represents a given
 *  unit of knowledge that has value by itself.
 *  Not inserting data that can be inserted can itself snowball into not
 *  being able to insert even more data.
 *
 * CONs:
 *  Users get a temporary view of the data that is still out of sync,
 *  just a bit closer to the latest.  However, apps can be notified
 *  that some of the data could not be synced and can handle the scenario
 *  that way.
 *
 * A:  Sync on per RTB level - we want to present the user with
 * the latest possible snapshot of the data.
 */
let SharingMessage = class SharingMessage {
};
__decorate([
    Id(),
    GeneratedValue()
], SharingMessage.prototype, "id", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: "SHARING_NODE_ID", referencedColumnName: "ID"
    })
], SharingMessage.prototype, "sharingNode", void 0);
__decorate([
    DbNumber()
], SharingMessage.prototype, "origin", void 0);
__decorate([
    Column({ name: "AGT_SHARING_MESSAGE_ID" })
], SharingMessage.prototype, "agtSharingMessageId", void 0);
__decorate([
    Column({ name: "SYNC_TIMESTAMP" }),
    DbDate()
], SharingMessage.prototype, "syncTimestamp", void 0);
__decorate([
    OneToMany({ mappedBy: "sharingMessage" })
], SharingMessage.prototype, "sharingMessageRepoTransBlocks", void 0);
SharingMessage = __decorate([
    Entity(),
    Table({ name: "SHARING_MESSAGES" })
], SharingMessage);
export { SharingMessage };
//# sourceMappingURL=SharingMessage.js.map