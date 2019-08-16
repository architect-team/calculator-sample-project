# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: architect/subtraction_service/service.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='architect/subtraction_service/service.proto',
  package='subtraction_service',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n+architect/subtraction_service/service.proto\x12\x13subtraction_service\"0\n\x0fSubtractRequest\x12\r\n\x05\x66irst\x18\x01 \x01(\x05\x12\x0e\n\x06second\x18\x02 \x01(\x05\"%\n\x13SubtractionResponse\x12\x0e\n\x06output\x18\x01 \x01(\x05\x32g\n\tArchitect\x12Z\n\x08Subtract\x12$.subtraction_service.SubtractRequest\x1a(.subtraction_service.SubtractionResponseb\x06proto3')
)




_SUBTRACTREQUEST = _descriptor.Descriptor(
  name='SubtractRequest',
  full_name='subtraction_service.SubtractRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='first', full_name='subtraction_service.SubtractRequest.first', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='second', full_name='subtraction_service.SubtractRequest.second', index=1,
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
  serialized_start=68,
  serialized_end=116,
)


_SUBTRACTIONRESPONSE = _descriptor.Descriptor(
  name='SubtractionResponse',
  full_name='subtraction_service.SubtractionResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='output', full_name='subtraction_service.SubtractionResponse.output', index=0,
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
  serialized_start=118,
  serialized_end=155,
)

DESCRIPTOR.message_types_by_name['SubtractRequest'] = _SUBTRACTREQUEST
DESCRIPTOR.message_types_by_name['SubtractionResponse'] = _SUBTRACTIONRESPONSE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

SubtractRequest = _reflection.GeneratedProtocolMessageType('SubtractRequest', (_message.Message,), dict(
  DESCRIPTOR = _SUBTRACTREQUEST,
  __module__ = 'architect.subtraction_service.service_pb2'
  # @@protoc_insertion_point(class_scope:subtraction_service.SubtractRequest)
  ))
_sym_db.RegisterMessage(SubtractRequest)

SubtractionResponse = _reflection.GeneratedProtocolMessageType('SubtractionResponse', (_message.Message,), dict(
  DESCRIPTOR = _SUBTRACTIONRESPONSE,
  __module__ = 'architect.subtraction_service.service_pb2'
  # @@protoc_insertion_point(class_scope:subtraction_service.SubtractionResponse)
  ))
_sym_db.RegisterMessage(SubtractionResponse)



_ARCHITECT = _descriptor.ServiceDescriptor(
  name='Architect',
  full_name='subtraction_service.Architect',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=157,
  serialized_end=260,
  methods=[
  _descriptor.MethodDescriptor(
    name='Subtract',
    full_name='subtraction_service.Architect.Subtract',
    index=0,
    containing_service=None,
    input_type=_SUBTRACTREQUEST,
    output_type=_SUBTRACTIONRESPONSE,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_ARCHITECT)

DESCRIPTOR.services_by_name['Architect'] = _ARCHITECT

# @@protoc_insertion_point(module_scope)
