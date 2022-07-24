# airbridge-validate

Move from server side templates to SPAs introduced a new problem:

In server-side UI frameworks the UI state resided on the server, in 
session objects.  This means that there was no need to validate it,
it was already known to be valid.  With SPAs the display and UI
logic moved to the client and the data model is being transfered
from the client back to the server.  This means that the passed
in data model must be validated.

@airport/airbridge-validate provides a declarative DSL for
validating entity model trees