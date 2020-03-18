// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_pb = require('./service_pb.js');

function serialize_subtraction_service_SubtractRequest(arg) {
  if (!(arg instanceof service_pb.SubtractRequest)) {
    throw new Error('Expected argument of type subtraction_service.SubtractRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_subtraction_service_SubtractRequest(buffer_arg) {
  return service_pb.SubtractRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_subtraction_service_SubtractionResponse(arg) {
  if (!(arg instanceof service_pb.SubtractionResponse)) {
    throw new Error('Expected argument of type subtraction_service.SubtractionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_subtraction_service_SubtractionResponse(buffer_arg) {
  return service_pb.SubtractionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ArchitectService = exports.ArchitectService = {
  subtract: {
    path: '/subtraction_service.Architect/Subtract',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.SubtractRequest,
    responseType: service_pb.SubtractionResponse,
    requestSerialize: serialize_subtraction_service_SubtractRequest,
    requestDeserialize: deserialize_subtraction_service_SubtractRequest,
    responseSerialize: serialize_subtraction_service_SubtractionResponse,
    responseDeserialize: deserialize_subtraction_service_SubtractionResponse,
  },
};

exports.ArchitectClient = grpc.makeGenericClientConstructor(ArchitectService);
