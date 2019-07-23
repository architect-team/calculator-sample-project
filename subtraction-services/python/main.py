from concurrent import futures
import grpc
import logging
import os
import time

from src import architect

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


def serve():
    host = os.environ['HOST']
    port = os.environ['PORT']
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    server.add_insecure_port('{}:{}'.format(host, port))
    server.add_generic_rpc_handlers()
    server.start()

    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == '__main__':
    logging.basicConfig()
    serve()
