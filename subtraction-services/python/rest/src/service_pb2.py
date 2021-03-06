# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: service.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='service.proto',
  package='addition_service',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\rservice.proto\x12\x10\x61\x64\x64ition_service\"+\n\nAddRequest\x12\r\n\x05\x66irst\x18\x01 \x01(\x05\x12\x0e\n\x06second\x18\x02 \x01(\x05\"\x1d\n\x0b\x41\x64\x64Response\x12\x0e\n\x06output\x18\x01 \x01(\x05\x32Q\n\tArchitect\x12\x44\n\x03\x41\x64\x64\x12\x1c.addition_service.AddRequest\x1a\x1d.addition_service.AddResponse\"\x00\x62\x06proto3')
)




_ADDREQUEST = _descriptor.Descriptor(
  name='AddRequest',
  full_name='addition_service.AddRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='first', full_name='addition_service.AddRequest.first', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='second', full_name='addition_service.AddRequest.second', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=35,
  serialized_end=78,
)


_ADDRESPONSE = _descriptor.Descriptor(
  name='AddResponse',
  full_name='addition_service.AddResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='output', full_name='addition_service.AddResponse.output', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=80,
  serialized_end=109,
)

DESCRIPTOR.message_types_by_name['AddRequest'] = _ADDREQUEST
DESCRIPTOR.message_types_by_name['AddResponse'] = _ADDRESPONSE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

AddRequest = _reflection.GeneratedProtocolMessageType('AddRequest', (_message.Message,), {
  'DESCRIPTOR' : _ADDREQUEST,
  '__module__' : 'service_pb2'
  # @@protoc_insertion_point(class_scope:addition_service.AddRequest)
  })
_sym_db.RegisterMessage(AddRequest)

AddResponse = _reflection.GeneratedProtocolMessageType('AddResponse', (_message.Message,), {
  'DESCRIPTOR' : _ADDRESPONSE,
  '__module__' : 'service_pb2'
  # @@protoc_insertion_point(class_scope:addition_service.AddResponse)
  })
_sym_db.RegisterMessage(AddResponse)



_ARCHITECT = _descriptor.ServiceDescriptor(
  name='Architect',
  full_name='addition_service.Architect',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=111,
  serialized_end=192,
  methods=[
  _descriptor.MethodDescriptor(
    name='Add',
    full_name='addition_service.Architect.Add',
    index=0,
    containing_service=None,
    input_type=_ADDREQUEST,
    output_type=_ADDRESPONSE,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_ARCHITECT)

DESCRIPTOR.services_by_name['Architect'] = _ARCHITECT

# @@protoc_insertion_point(module_scope)
