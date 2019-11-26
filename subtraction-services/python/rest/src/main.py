import json
import logging
import os
from concurrent import futures

import grpc

import architect.sdk as architect
from flask import Flask, request

app = Flask(__name__)


@app.route("/subtract")
def subtract():
    print(request.args)
    first = int(request.args['first'])
    second = int(request.args['second']) * -1
    addition_service = architect.service('architect/addition-service-grpc')
    req = addition_service.defs.AddRequest(first=first, second=second)
    res = addition_service.client.Add(req)
    return {'result': res.output}


if __name__ == '__main__':
    app.run(host=os.environ['HOST'], port=os.environ['PORT'])
