# TODO list:

## Internalize IsConnectionReady message.

Right now clients poll the server once to see if the connection is ready (before sending
API requests)  This won't work if the AIRport famework tab get's reloaded.  I tried
checking every time but that breaks in inconsistent ways.  The way to do it is to
just check at the time of reception of the API request and delay it if the app that
is being called is not initialized.

## Artifact Generation
many artifacts for current applications need to be generated automatically.  These include:

client
runtime
src/to_be_generated

### fold in "client" sub-project

The core reason why there is a nested 'client' project right now is the fact
that clients (unline apps using the API) won't be injected using '@airport/direction-indicator'.
So the client objects are "new"ed while the API objects are "@Inject()"ed.  These should
be combined into a single object, where the internal implementation differs based on what
is included (for client the Autopilot library is used, if the AUTOPILOT tokens are backed
by classes).  Clients will instead get the object by calling ApiClassName.get(), which will
internally perform dependency injection in the class, after it "new"s it.

## Make table missing from join error developer friendly

Right now if you write a query and forget to add a table in the from for the entities you
have selected you get an 'undefined' error from within query processing code.  Instead
there should be a developer friendly error message, stating that an entity is in the
"select: {}" clause but is missing from the "from: []" clause and should suggest a
way to get it done "like: entityAlias.enityName.leftJoin()"

## Time out transactions
A transaction can take too long (ex: an application does not reply for whatever reason).
There should be a timeout after which the transaction is timed out and the nearest
SAVEPOINT is rolled back.

## Refactoring
See refactoring.md