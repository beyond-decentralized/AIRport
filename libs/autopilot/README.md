# autopilot

Autopilot engages when DAOs are used in "zero-include" mode.  All schemas can operate in 
either autopilot mode, code mode or hybrid mode (where some operations are in autopilot
and some are executed in code, on the client side).  In autopilot mode the only thing 
that is imported into the client code (besides the thin the "@airport/di", 
"@airport/autopilot" and   "@airport/pressurization" libraries) is the tokens.ts file
from the schema.  These thin includes happen when all DAOs in a schema contain only 
decorator based CRUD logic.  If at least one DAO in a schema has non-decorator code, 
schema's index.ts will contain DAO code and all generated code resources (and import
of "@airport/tower" and related libraries is required):

![Autopilot Flow](../../presentations/images/Autopilot-Flow.png)

NOTE: Including DAO code in client bundle (as well as the "@airport/tower" library) is
needed if you are writing dynamic queries (supported) or are doing complex transactional
 logic (not yet supported from the client, except for automatic transactional wrapping
 of saved entity trees via the @Save() decorator).

In full autopilot mode all database operations must be defined in DAOs in appropriate
decorators. When a DAO is retrieved via the Inversion of Control (IOC) object:

const dao = IOC.getSync(DAO_TOKEN_NAME);

a proxy object is created that captures all of the calls, serializes the parameters 
and does a remote query to the locally installed AIRPort application (or the parent
browser frame, if AIRport is running inside the browser):

await dao.performOperation(a, b, c);

The autopilot configuration is defined in the token definitions of schema's 
"tokens.ts" file.  When injecting DAOs, the "@airport/di" library checks the autopilot
configuration and if a dependency is in autopilot mode, injects the proxy object.

For DAOs that contain both autopilot and regular code operations, the token definition
is configured with explict listing of all regular code operations.  During injection of
such DAOs an instance of that DAO is created and is wrapped in an Autopilot proxy.
When a DAO method is invoked the proxy determines if the method needs to be passed 
though to the DAO or of it's an autopilot method (execution of which can be passed to
the local AIRport server, which has the necessary configuration to execute the
approriate crud logic).