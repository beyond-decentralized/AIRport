# TODO list:

## Internalize IsConnectionReady message.

Right now clients poll the server once to see if the connection is ready (before sending
API requests)  This won't work if the AIRport famework tab get's reloaded.  I tried
checking every time but that breaks in inconsistent ways.  The way to do it is to
just check at the time of reception of the API request and delay it if the app that
is being called is not initialized.

## Make table missing FROM join error developer friendly

Right now if you write a query and forget to add a table in the FROM for the entities you
have selected you get an 'undefined' error from within query processing code.  Instead
there should be a developer friendly error message, stating that an entity is in the
"SELECT: {}" clause but is missing from the "FROM: []" clause and should suggest a
way to get it done like: "entityAlias.enityName.LEFT_JOIN()"

## Time out transactions
A transaction can take too long (ex: an application does not reply for whatever reason).
There should be a timeout after which the transaction is timed out and the nearest
SAVEPOINT is rolled back.

## Refactoring
See refactoring.md