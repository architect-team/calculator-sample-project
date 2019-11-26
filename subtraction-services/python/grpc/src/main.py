import logging
import os
import time
from concurrent import futures

import grpc

import architect.sdk as architect


class SubtractionServicer(architect.current_service().Servicer):
    def Subtract(self, request, context):
        first = request.first
        second = request.second * -1
        addition_service = architect.service('architect/addition-service-rest')
        res = addition_service.client.get(
            '/add', params={'first': first, 'second': second})
        return architect.current_service().defs.SubtractionResponse(output=res.json()['result'])


def serve():
    host = os.environ['HOST']
    port = os.environ['PORT']
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    architect.current_service().add_servicer(SubtractionServicer(), server)
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
