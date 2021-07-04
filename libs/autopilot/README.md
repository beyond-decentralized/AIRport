# autopilot

Autopilot engages when a schema is used in zero-code mode.  All schemas can operate in 
either autopilot mode or code mode.  In autopilot mode the only thing that is imported (besides interfaces, which are zero code by default) is the tokens.ts file.  This is 
the default import mode for a schema (that is what is being imported from index.js).
NOTE: if you are writing dynamic queries or are doing complex transactional logic (yet
 to be supported from the client) then you need to import from code.js explicitly.

In autopilot mode all database operations must be defined in DAOs in appropriate
decorates. When a dao is retrieved via the Inversion of Control operation:

const dao = IOC.getSync(DAO_TOKEN_NAME);

A proxy object is created that captures all of the calls, serializes the parameters 
and does a remote query to the locally installed AIRPORT application (or parent
frame, in browser mode):

await dao.performOperation(a, b, c);

All DAOs are by default in "autopilot" mode and get flipped to "code" if they have
logic outside of the zero-code decorators (if they have member methods that
are not decorated with zero-code decorators).  This is done in token definition
and can be verified at schema generation time. When injecting "@airport/di" library
checks the "autopilot" flag and if a dependency is in autopilot mode, injects the
proxy object.