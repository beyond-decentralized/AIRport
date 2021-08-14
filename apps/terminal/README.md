# terminal
Transfers passengers (user data) between parking (local storage), 
ground transport (network storage and P2P) and airplanes (user facing Apps).

Terminal is the core application that hosts storage (SqLite) and interfaces
with schema libraries (which run via the "terminal" library, in separate
isolated processes) as well as with other users (on other devices running
AIRport terminals).
