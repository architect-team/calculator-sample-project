# Architect Calculator Example

This repository contains a set of connected services that form to produce
some common arithmetic operations. Though creating unique services to do 
such work would be unnecessarily complicated and would degrade performance,
the natural interconnected nature of these processes is a great way to
show off how Architect services are structured and how dependencies
communicate with one another.

`test-service` --> `division-service` --> `subtraction-service` --> `addition-service`

# Setup
1. `npm install -g architect-cli`

# Run the example
The `test-script` folder contains the top-level script that has a dependency on 
the `division-service`. The `division-service` in turn depends on the 
`subtraction-service` which depends on the `addition-service`, and outputs 
the results of the division function outlined in the script contents. 

1. `cd ./test-script/`
2. `architect install -r` - recursively installs all the server/client
stubs required for each service
3. `architect start` - starts all the dependencies, runs the script and
outputs the result, and then kills the running services
