from concurrent import futures
from flask import Flask, request
import grpc
import logging
import os
import json

import architect.sdk as architect


app = Flask(__name__)


@app.route("/subtract")
def subtract():
    print(request.args)
    first = int(request.args['first'])
    second = int(request.args['second']) * -1
    addition_service = architect.service('architect/addition-service')
    add_request = addition_service.defs.AddRequest(first=first, second=second)
    add_response = addition_service.client.Add(add_request)
    return json.dumps({
      'result': add_response.output
    })


if __name__ == '__main__':
    app.run(host=os.environ['HOST'], port=os.environ['PORT'])
