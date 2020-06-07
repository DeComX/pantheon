// source: model.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.decomx.pantheon.Task', null, global);
goog.exportSymbol('proto.decomx.pantheon.Task.TaskStatus', null, global);
goog.exportSymbol('proto.decomx.pantheon.TaskDetails', null, global);
goog.exportSymbol('proto.decomx.pantheon.TaskOp', null, global);
goog.exportSymbol('proto.decomx.pantheon.TaskOp.OpType', null, global);
goog.exportSymbol('proto.decomx.pantheon.User', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decomx.pantheon.User = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.decomx.pantheon.User, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.decomx.pantheon.User.displayName = 'proto.decomx.pantheon.User';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decomx.pantheon.TaskDetails = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.decomx.pantheon.TaskDetails, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.decomx.pantheon.TaskDetails.displayName = 'proto.decomx.pantheon.TaskDetails';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decomx.pantheon.TaskOp = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.decomx.pantheon.TaskOp, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.decomx.pantheon.TaskOp.displayName = 'proto.decomx.pantheon.TaskOp';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.decomx.pantheon.Task = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.decomx.pantheon.Task.repeatedFields_, null);
};
goog.inherits(proto.decomx.pantheon.Task, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.decomx.pantheon.Task.displayName = 'proto.decomx.pantheon.Task';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decomx.pantheon.User.prototype.toObject = function(opt_includeInstance) {
  return proto.decomx.pantheon.User.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decomx.pantheon.User} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.User.toObject = function(includeInstance, msg) {
  var f, obj = {
    ethereumaddress: msg.getEthereumaddress_asB64(),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    introduction: jspb.Message.getFieldWithDefault(msg, 3, ""),
    contactsMap: (f = msg.getContactsMap()) ? f.toObject(includeInstance, undefined) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decomx.pantheon.User}
 */
proto.decomx.pantheon.User.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decomx.pantheon.User;
  return proto.decomx.pantheon.User.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decomx.pantheon.User} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decomx.pantheon.User}
 */
proto.decomx.pantheon.User.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setEthereumaddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setIntroduction(value);
      break;
    case 4:
      var value = msg.getContactsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readString, null, "", "");
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decomx.pantheon.User.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.decomx.pantheon.User.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.decomx.pantheon.User} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.User.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEthereumaddress_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getIntroduction();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getContactsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(4, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeString);
  }
};


/**
 * optional bytes ethereumAddress = 1;
 * @return {!(string|Uint8Array)}
 */
proto.decomx.pantheon.User.prototype.getEthereumaddress = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes ethereumAddress = 1;
 * This is a type-conversion wrapper around `getEthereumaddress()`
 * @return {string}
 */
proto.decomx.pantheon.User.prototype.getEthereumaddress_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getEthereumaddress()));
};


/**
 * optional bytes ethereumAddress = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getEthereumaddress()`
 * @return {!Uint8Array}
 */
proto.decomx.pantheon.User.prototype.getEthereumaddress_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getEthereumaddress()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.decomx.pantheon.User} returns this
 */
proto.decomx.pantheon.User.prototype.setEthereumaddress = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.decomx.pantheon.User.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.decomx.pantheon.User} returns this
 */
proto.decomx.pantheon.User.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string introduction = 3;
 * @return {string}
 */
proto.decomx.pantheon.User.prototype.getIntroduction = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.decomx.pantheon.User} returns this
 */
proto.decomx.pantheon.User.prototype.setIntroduction = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * map<string, string> contacts = 4;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,string>}
 */
proto.decomx.pantheon.User.prototype.getContactsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,string>} */ (
      jspb.Message.getMapField(this, 4, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.decomx.pantheon.User} returns this
 */
proto.decomx.pantheon.User.prototype.clearContactsMap = function() {
  this.getContactsMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decomx.pantheon.TaskDetails.prototype.toObject = function(opt_includeInstance) {
  return proto.decomx.pantheon.TaskDetails.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decomx.pantheon.TaskDetails} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.TaskDetails.toObject = function(includeInstance, msg) {
  var f, obj = {
    details: jspb.Message.getFieldWithDefault(msg, 1, ""),
    ownerdeposit: jspb.Message.getFieldWithDefault(msg, 2, 0),
    workerdeposit: jspb.Message.getFieldWithDefault(msg, 3, 0),
    ownerpay: jspb.Message.getFieldWithDefault(msg, 4, 0),
    workerpay: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decomx.pantheon.TaskDetails}
 */
proto.decomx.pantheon.TaskDetails.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decomx.pantheon.TaskDetails;
  return proto.decomx.pantheon.TaskDetails.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decomx.pantheon.TaskDetails} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decomx.pantheon.TaskDetails}
 */
proto.decomx.pantheon.TaskDetails.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDetails(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setOwnerdeposit(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setWorkerdeposit(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setOwnerpay(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setWorkerpay(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decomx.pantheon.TaskDetails.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.decomx.pantheon.TaskDetails.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.decomx.pantheon.TaskDetails} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.TaskDetails.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDetails();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getOwnerdeposit();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getWorkerdeposit();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getOwnerpay();
  if (f !== 0) {
    writer.writeUint64(
      4,
      f
    );
  }
  f = message.getWorkerpay();
  if (f !== 0) {
    writer.writeUint64(
      5,
      f
    );
  }
};


/**
 * optional string details = 1;
 * @return {string}
 */
proto.decomx.pantheon.TaskDetails.prototype.getDetails = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.decomx.pantheon.TaskDetails} returns this
 */
proto.decomx.pantheon.TaskDetails.prototype.setDetails = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint64 ownerDeposit = 2;
 * @return {number}
 */
proto.decomx.pantheon.TaskDetails.prototype.getOwnerdeposit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.decomx.pantheon.TaskDetails} returns this
 */
proto.decomx.pantheon.TaskDetails.prototype.setOwnerdeposit = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint64 workerDeposit = 3;
 * @return {number}
 */
proto.decomx.pantheon.TaskDetails.prototype.getWorkerdeposit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.decomx.pantheon.TaskDetails} returns this
 */
proto.decomx.pantheon.TaskDetails.prototype.setWorkerdeposit = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional uint64 ownerPay = 4;
 * @return {number}
 */
proto.decomx.pantheon.TaskDetails.prototype.getOwnerpay = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.decomx.pantheon.TaskDetails} returns this
 */
proto.decomx.pantheon.TaskDetails.prototype.setOwnerpay = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint64 workerPay = 5;
 * @return {number}
 */
proto.decomx.pantheon.TaskDetails.prototype.getWorkerpay = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.decomx.pantheon.TaskDetails} returns this
 */
proto.decomx.pantheon.TaskDetails.prototype.setWorkerpay = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decomx.pantheon.TaskOp.prototype.toObject = function(opt_includeInstance) {
  return proto.decomx.pantheon.TaskOp.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decomx.pantheon.TaskOp} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.TaskOp.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    index: jspb.Message.getFieldWithDefault(msg, 2, 0),
    deadline: jspb.Message.getFieldWithDefault(msg, 3, 0),
    comments: jspb.Message.getFieldWithDefault(msg, 4, ""),
    override: (f = msg.getOverride()) && proto.decomx.pantheon.TaskDetails.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decomx.pantheon.TaskOp}
 */
proto.decomx.pantheon.TaskOp.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decomx.pantheon.TaskOp;
  return proto.decomx.pantheon.TaskOp.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decomx.pantheon.TaskOp} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decomx.pantheon.TaskOp}
 */
proto.decomx.pantheon.TaskOp.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.decomx.pantheon.TaskOp.OpType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIndex(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setDeadline(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setComments(value);
      break;
    case 5:
      var value = new proto.decomx.pantheon.TaskDetails;
      reader.readMessage(value,proto.decomx.pantheon.TaskDetails.deserializeBinaryFromReader);
      msg.setOverride(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decomx.pantheon.TaskOp.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.decomx.pantheon.TaskOp.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.decomx.pantheon.TaskOp} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.TaskOp.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getDeadline();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getComments();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getOverride();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.decomx.pantheon.TaskDetails.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.decomx.pantheon.TaskOp.OpType = {
  OWNER_UPDATE: 0,
  WORKER_ACCEPT: 1,
  REQUEST_CHANGE: 2,
  REQUEST_FINAL_REVIEW: 3,
  RECALL: 4,
  APPROVE: 5,
  REJECT: 6,
  CLAIM: 7
};

/**
 * optional OpType type = 1;
 * @return {!proto.decomx.pantheon.TaskOp.OpType}
 */
proto.decomx.pantheon.TaskOp.prototype.getType = function() {
  return /** @type {!proto.decomx.pantheon.TaskOp.OpType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.decomx.pantheon.TaskOp.OpType} value
 * @return {!proto.decomx.pantheon.TaskOp} returns this
 */
proto.decomx.pantheon.TaskOp.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional uint32 index = 2;
 * @return {number}
 */
proto.decomx.pantheon.TaskOp.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.decomx.pantheon.TaskOp} returns this
 */
proto.decomx.pantheon.TaskOp.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint64 deadline = 3;
 * @return {number}
 */
proto.decomx.pantheon.TaskOp.prototype.getDeadline = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.decomx.pantheon.TaskOp} returns this
 */
proto.decomx.pantheon.TaskOp.prototype.setDeadline = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional string comments = 4;
 * @return {string}
 */
proto.decomx.pantheon.TaskOp.prototype.getComments = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.decomx.pantheon.TaskOp} returns this
 */
proto.decomx.pantheon.TaskOp.prototype.setComments = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional TaskDetails override = 5;
 * @return {?proto.decomx.pantheon.TaskDetails}
 */
proto.decomx.pantheon.TaskOp.prototype.getOverride = function() {
  return /** @type{?proto.decomx.pantheon.TaskDetails} */ (
    jspb.Message.getWrapperField(this, proto.decomx.pantheon.TaskDetails, 5));
};


/**
 * @param {?proto.decomx.pantheon.TaskDetails|undefined} value
 * @return {!proto.decomx.pantheon.TaskOp} returns this
*/
proto.decomx.pantheon.TaskOp.prototype.setOverride = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.decomx.pantheon.TaskOp} returns this
 */
proto.decomx.pantheon.TaskOp.prototype.clearOverride = function() {
  return this.setOverride(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.decomx.pantheon.TaskOp.prototype.hasOverride = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.decomx.pantheon.Task.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.decomx.pantheon.Task.prototype.toObject = function(opt_includeInstance) {
  return proto.decomx.pantheon.Task.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.decomx.pantheon.Task} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.Task.toObject = function(includeInstance, msg) {
  var f, obj = {
    details: (f = msg.getDetails()) && proto.decomx.pantheon.TaskDetails.toObject(includeInstance, f),
    status: jspb.Message.getFieldWithDefault(msg, 2, 0),
    owner: msg.getOwner_asB64(),
    worker: msg.getWorker_asB64(),
    opList: jspb.Message.toObjectList(msg.getOpList(),
    proto.decomx.pantheon.TaskOp.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.decomx.pantheon.Task}
 */
proto.decomx.pantheon.Task.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.decomx.pantheon.Task;
  return proto.decomx.pantheon.Task.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.decomx.pantheon.Task} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.decomx.pantheon.Task}
 */
proto.decomx.pantheon.Task.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.decomx.pantheon.TaskDetails;
      reader.readMessage(value,proto.decomx.pantheon.TaskDetails.deserializeBinaryFromReader);
      msg.setDetails(value);
      break;
    case 2:
      var value = /** @type {!proto.decomx.pantheon.Task.TaskStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOwner(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setWorker(value);
      break;
    case 5:
      var value = new proto.decomx.pantheon.TaskOp;
      reader.readMessage(value,proto.decomx.pantheon.TaskOp.deserializeBinaryFromReader);
      msg.addOp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.decomx.pantheon.Task.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.decomx.pantheon.Task.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.decomx.pantheon.Task} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.decomx.pantheon.Task.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDetails();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.decomx.pantheon.TaskDetails.serializeBinaryToWriter
    );
  }
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getOwner_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getWorker_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getOpList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.decomx.pantheon.TaskOp.serializeBinaryToWriter
    );
  }
};


/**
 * @enum {number}
 */
proto.decomx.pantheon.Task.TaskStatus = {
  PENDING_ACCEPT: 0,
  PENDING_WORKER_PROOF: 1,
  PENDING_CHANGE_REVIEW: 2,
  PENDING_FINAL_REVIEW: 3,
  CLOSED: 4
};

/**
 * optional TaskDetails details = 1;
 * @return {?proto.decomx.pantheon.TaskDetails}
 */
proto.decomx.pantheon.Task.prototype.getDetails = function() {
  return /** @type{?proto.decomx.pantheon.TaskDetails} */ (
    jspb.Message.getWrapperField(this, proto.decomx.pantheon.TaskDetails, 1));
};


/**
 * @param {?proto.decomx.pantheon.TaskDetails|undefined} value
 * @return {!proto.decomx.pantheon.Task} returns this
*/
proto.decomx.pantheon.Task.prototype.setDetails = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.decomx.pantheon.Task} returns this
 */
proto.decomx.pantheon.Task.prototype.clearDetails = function() {
  return this.setDetails(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.decomx.pantheon.Task.prototype.hasDetails = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional TaskStatus status = 2;
 * @return {!proto.decomx.pantheon.Task.TaskStatus}
 */
proto.decomx.pantheon.Task.prototype.getStatus = function() {
  return /** @type {!proto.decomx.pantheon.Task.TaskStatus} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.decomx.pantheon.Task.TaskStatus} value
 * @return {!proto.decomx.pantheon.Task} returns this
 */
proto.decomx.pantheon.Task.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional bytes owner = 3;
 * @return {!(string|Uint8Array)}
 */
proto.decomx.pantheon.Task.prototype.getOwner = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes owner = 3;
 * This is a type-conversion wrapper around `getOwner()`
 * @return {string}
 */
proto.decomx.pantheon.Task.prototype.getOwner_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOwner()));
};


/**
 * optional bytes owner = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOwner()`
 * @return {!Uint8Array}
 */
proto.decomx.pantheon.Task.prototype.getOwner_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOwner()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.decomx.pantheon.Task} returns this
 */
proto.decomx.pantheon.Task.prototype.setOwner = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional bytes worker = 4;
 * @return {!(string|Uint8Array)}
 */
proto.decomx.pantheon.Task.prototype.getWorker = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes worker = 4;
 * This is a type-conversion wrapper around `getWorker()`
 * @return {string}
 */
proto.decomx.pantheon.Task.prototype.getWorker_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getWorker()));
};


/**
 * optional bytes worker = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getWorker()`
 * @return {!Uint8Array}
 */
proto.decomx.pantheon.Task.prototype.getWorker_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getWorker()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.decomx.pantheon.Task} returns this
 */
proto.decomx.pantheon.Task.prototype.setWorker = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * repeated TaskOp op = 5;
 * @return {!Array<!proto.decomx.pantheon.TaskOp>}
 */
proto.decomx.pantheon.Task.prototype.getOpList = function() {
  return /** @type{!Array<!proto.decomx.pantheon.TaskOp>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.decomx.pantheon.TaskOp, 5));
};


/**
 * @param {!Array<!proto.decomx.pantheon.TaskOp>} value
 * @return {!proto.decomx.pantheon.Task} returns this
*/
proto.decomx.pantheon.Task.prototype.setOpList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.decomx.pantheon.TaskOp=} opt_value
 * @param {number=} opt_index
 * @return {!proto.decomx.pantheon.TaskOp}
 */
proto.decomx.pantheon.Task.prototype.addOp = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.decomx.pantheon.TaskOp, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.decomx.pantheon.Task} returns this
 */
proto.decomx.pantheon.Task.prototype.clearOpList = function() {
  return this.setOpList([]);
};


goog.object.extend(exports, proto.decomx.pantheon);
