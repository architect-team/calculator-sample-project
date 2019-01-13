# Snappi Calculator Demo
The calculator demo shows off how Architect can orchestrate a complex 
network of independent services to do meaningful work.

## Setup
1. Make sure you have node v8.x installed
    * [nvm](https://github.com/creationix/nvm) is a great tool for managing which version of node you're using
    * See [architect-cli/issues/3](https://github.com/architect-team/architect-cli/issues/3) for details on unsupported node versions
  
2. [Install GRPC from source](https://github.com/grpc/grpc/blob/master/BUILDING.md)
    * Installation from source is required to support all language plugins, and it auto-installs the `protoc` CLI
3. `npm login`
    * If you don't already have an account at npmjs.org, make one and send your username to David before continuing
4. `npm install -g architect-cli`

## Run the demo
The `test-script` folder contains the top-level script that has a dependency on 
the `division-service`. The `division-service` in turn depends on the 
`subtraction-service` which depends on the `addition-service`, and outputs 
the results of the division function outlined in the script contents. 

1. `cd ./test-script/`
2. `architect install -r`
    * Recursively installs all the server/client stubs required for each service
3. `architect start`
    * Starts all the dependencies, runs the script and outputs the result, and then kills the running services
