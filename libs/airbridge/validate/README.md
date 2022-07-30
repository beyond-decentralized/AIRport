# airbridge-validate

Move from server side templates to SPAs introduced a new problem:

In server-side UI frameworks the UI state resided on the server, in 
session objects.  This means that there was no need to validate it,
it was already known to be valid.  With SPAs the display and UI
logic moved to the client and the data model is being transfered
from the client back to the server.  This means that the passed
in data model must be validated.

AIRport removes the client-to-server gap by allowing to pass
entity objects all the way to the client and back.  This means that
there must be strict validation of all entity state passed in and
out of protected server scope.  Doing so via procedural checks
is tedious and error prone.  To solve this issue
@airport/airbridge-validate library has been introduced.

@airport/airbridge-validate provides a declarative DSL for
validating entity model trees:

```typescript
@Injected()
export class AgreementDvo
    extends BaseAgreementDvo {

    async validateAgreement() {
        await this.agreementDvo.validate(agreement, {
            agreementReasons: {
                reason: and(
                    uniqueIn(agreement),
                    or(
                        exists(),
                        {
                            factor: or(
                                exists(), {
                                    customText: length(5, 50),
                                    action: isNull(),
                                    object: isNull()
                                }, {
                                    action: oneOf('Helps', 'Lets'),
                                    customText: isNull(),
                                    object: oneOf('Me', 'Them', 'Us', 'You'),
                                }
                            ),
                            position: or(
                                exists(),
                                {
                                    name: length(5, 100)
                                }
                            )
                        },
                    )
                ),
                share: between(-100, 100)
            },
            idea: exists(),
            situationIdea: or(
                isNull(),
                exists(byId(), {
                    idea: equals(value(agreement.idea))
                }))
        })
    }
}
```

AIRport entity objects retain original values.  This allows to
compute if a property value has been modified.  Dvo.validate
will throw an exception if a property
has been modified (or its a newly created entity object) and
there is no validator defined for it.

The object graph passed into @Api() methods get's copied before
it is passed in.  On the completion of the @Api() request
the passed in object gets reconciled with the copy that was
used internally.  This allows to modify temporary internal state
parameters for the purpose of validation.  Dvo.validate will
exclude from persistence operations (via adding temporary
internal state flags) all entity objects that are not covered
by its validation operations.  The temporary internal flag
that governs exclusion of entities from peristence operations
is not copied over to the object originally passed into
the @Api() call.

Existance checks in validators check if the object exists (by
Id) and update the state of the object with the latest found
in the database, if the passed in object does not have the
passed in properies marked as modified.  These changes
are then copied over to the client.  This the client does
not have to requiry for latest state of the object (which
are updated by both the validation and the persistence APIs).
