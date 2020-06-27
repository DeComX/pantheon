#!/bin/bash

MODEL_PB="model_pb.js"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "cd $DIR"
cd $DIR

echo "Compiling proto to javascript file..."
protoc --proto_path=./ --js_out=import_style=commonjs,binary:. *.proto

echo "Adding eslint-disable header..."
echo "$(echo '/* eslint-disable */'; cat $MODEL_PB)" > $MODEL_PB

echo "Moving file to webapp..."
mv $MODEL_PB ../webapp/src/proto/

echo "finished"
