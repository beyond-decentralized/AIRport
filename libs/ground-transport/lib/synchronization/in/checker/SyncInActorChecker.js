var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let SyncInActorChecker = class SyncInActorChecker {
    async ensureActors(message, context) {
        try {
            let actorGUIDs = [];
            let messageActorIndexMap = new Map();
            for (let i = 0; i < message.actors.length; i++) {
                const actor = message.actors[i];
                if (typeof actor.GUID !== 'string' || actor.GUID.length !== 36) {
                    throw new Error(`Invalid 'terminal.uuid'`);
                }
                this.checkActorApplication(actor, message);
                this.checkActorTerminal(actor, message);
                this.checkActorUser(actor, message);
                actorGUIDs.push(actor.GUID);
                messageActorIndexMap.set(actor.GUID, i);
                // Make sure id field is not in the input
                delete actor._localId;
            }
            const actors = await this.actorDao.findByGUIDs(actorGUIDs);
            for (const actor of actors) {
                const messageUserIndex = messageActorIndexMap.get(actor.GUID);
                message.actors[messageUserIndex] = actor;
            }
            const missingActors = message.actors
                .filter(messageActor => !messageActor._localId);
            if (missingActors.length) {
                await this.actorDao.insert(missingActors, context);
            }
        }
        catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
    checkActorApplication(actor, message) {
        if (typeof actor.application !== 'number') {
            throw new Error(`Expecting "in-message index" (number)
			in 'actor.terminal'`);
        }
        const application = message.applications[actor.application];
        if (!application) {
            throw new Error(`Did not find actor.application with "in-message index" ${actor.application}`);
        }
        actor.application = application;
    }
    checkActorTerminal(actor, message) {
        if (typeof actor.terminal !== 'number') {
            throw new Error(`Expecting "in-message index" (number)
			in 'actor.terminal'`);
        }
        const terminal = message.terminals[actor.terminal];
        if (!terminal) {
            throw new Error(`Did not find actor.terminal with "in-message index" ${actor.terminal}`);
        }
        actor.terminal = terminal;
    }
    checkActorUser(actor, message) {
        if (typeof actor.user !== 'number') {
            throw new Error(`Expecting "in-message index" (number)
			in 'actor.user'`);
        }
        const user = message.users[actor.user];
        if (!user) {
            throw new Error(`Did not find actor.user with "in-message index" ${actor.user}`);
        }
        actor.user = user;
    }
};
__decorate([
    Inject()
], SyncInActorChecker.prototype, "actorDao", void 0);
SyncInActorChecker = __decorate([
    Injected()
], SyncInActorChecker);
export { SyncInActorChecker };
//# sourceMappingURL=SyncInActorChecker.js.map