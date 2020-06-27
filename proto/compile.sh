#!/bin/bash

MODEL_PB="model_pb.js"

protoc --proto_path=./ --js_out=import_style=commonjs,binary:. *.proto

echo "$(echo '/* eslint-disable */'; cat $MODEL_PB)" > $MODEL_PB

mv $MODEL_PB ../webapp/src/proto/
