from concurrent import futures
import grpc
import logging
import os
import time

import architect.sdk as architect


class SubtractionServicer(architect.current_service().Servicer):
    def Subtract(self, request, context):
        first = request.first
        second = request.second * -1
        addition_service = architect.service('architect/addition-service')
        add_request = addition_service.defs.AddRequest(first=first, second=second)
        add_response = addition_service.client.Add(add_request)
        return architect.current_service().defs.SubtractionResponse(output=add_response.output)


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
