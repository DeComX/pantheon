# Generate javascript from proto

## Compile the proto file to js file
```
brew install protobuf
protoc --proto_path=./ --js_out=import_style=commonjs,binary:./ *.proto
```

## Copy the js file to webapp/src/proto/
```
cp model_pb.js ../webapp/src/proto
```
