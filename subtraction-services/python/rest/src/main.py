import importlib
import json
import logging
import os
from concurrent import futures

import grpc
from flask import Flask, request

app = Flask(__name__)


@app.route("/subtract")
def subtract():
    print(request.args)
    first = int(request.args['first'])
    second = int(request.args['second']) * -1

    addition_defs = importlib.import_module('service_pb2')
    req = addition_defs.AddRequest(first=first, second=second)

    addition_grpc_pb = importlib.import_module('service_pb2_grpc')
    channel = grpc.insecure_channel(os.environ['ADDITION_SERVICE_ADDRESS'])
    client = addition_grpc_pb.ArchitectStub(channel)
    res = client.Add(req)

    return {'result': res.output}


if __name__ == '__main__':
    app.run(host=os.environ['HOST'], port=os.environ['PORT'])
