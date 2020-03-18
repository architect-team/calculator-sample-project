import importlib
import logging
import os
import time
from concurrent import futures

import grpc
import requests

subtraction_grpc_pb = importlib.import_module('service_pb2_grpc')

class SubtractionServicer(subtraction_grpc_pb.ArchitectServicer):
    def Subtract(self, request, context):
        first = request.first
        second = request.second * -1
        res = requests.get(
            '{}/add'.format(os.environ['ADDITION_SERVICE_ADDRESS']), params={'first': first, 'second': second})
        subtraction_defs = importlib.import_module('service_pb2')
        return subtraction_defs.SubtractionResponse(output=res.json()['result'])


def serve():
    host = os.environ['HOST']
    port = os.environ['PORT']
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    subtraction_grpc_pb.add_ArchitectServicer_to_server(SubtractionServicer(), server)
    server.add_insecure_port('{}:{}'.format(host, port))
    server.start()
    print('Listening at {}:{}'.format(host, port))

    try:
        while True:
            time.sleep(60 * 60 * 24)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    logging.basicConfig()
    serve()
