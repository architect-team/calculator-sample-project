// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var architect_addition_service_service_pb = require('../../architect/addition_service/service_pb.js');

function serialize_addition_service_AddRequest(arg) {
  if (!(arg instanceof architect_addition_service_service_pb.AddRequest)) {
    throw new Error('Expected argument of type addition_service.AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_addition_service_AddRequest(buffer_arg) {
  return architect_addition_service_service_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_addition_service_AddResponse(arg) {
  if (!(arg instanceof architect_addition_service_service_pb.AddResponse)) {
    throw new Error('Expected argument of type addition_service.AddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_addition_service_AddResponse(buffer_arg) {
  return architect_addition_service_service_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ArchitectService = exports.ArchitectService = {
  add: {
    path: '/addition_service.Architect/Add',
    requestStream: false,
    responseStream: false,
    requestType: architect_addition_service_service_pb.AddRequest,
    responseType: architect_addition_service_service_pb.AddResponse,
    requestSerialize: serialize_addition_service_AddRequest,
    requestDeserialize: deserialize_addition_service_AddRequest,
    responseSerialize: serialize_addition_service_AddResponse,
    responseDeserialize: deserialize_addition_service_AddResponse,
  },
};

exports.ArchitectClient = grpc.makeGenericClientConstructor(ArchitectService);
