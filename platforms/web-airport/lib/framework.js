import { IOC } from '@airport/direction-indicator';
import { injectTransactionalReceiver, WEB_MESSAGE_RECEIVER } from '@airport/web-terminal';
import { startDb } from '@airport/sqljs';
injectTransactionalReceiver();
export async function initFramework() {
    await startDb('AIRport-prerelease');
    await IOC.get(WEB_MESSAGE_RECEIVER);
}
//# sourceMappingURL=framework.js.map