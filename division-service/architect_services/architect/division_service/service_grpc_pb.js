// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var architect_division_service_service_pb = require('../../architect/division_service/service_pb.js');

function serialize_division_service_MathRequest(arg) {
  if (!(arg instanceof architect_division_service_service_pb.MathRequest)) {
    throw new Error('Expected argument of type division_service.MathRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_division_service_MathRequest(buffer_arg) {
  return architect_division_service_service_pb.MathRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_division_service_MathResponse(arg) {
  if (!(arg instanceof architect_division_service_service_pb.MathResponse)) {
    throw new Error('Expected argument of type division_service.MathResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_division_service_MathResponse(buffer_arg) {
  return architect_division_service_service_pb.MathResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ArchitectService = exports.ArchitectService = {
  divide: {
    path: '/division_service.Architect/Divide',
    requestStream: false,
    responseStream: false,
    requestType: architect_division_service_service_pb.MathRequest,
    responseType: architect_division_service_service_pb.MathResponse,
    requestSerialize: serialize_division_service_MathRequest,
    requestDeserialize: deserialize_division_service_MathRequest,
    responseSerialize: serialize_division_service_MathResponse,
    responseDeserialize: deserialize_division_service_MathResponse,
  },
};

exports.ArchitectClient = grpc.makeGenericClientConstructor(ArchitectService);
