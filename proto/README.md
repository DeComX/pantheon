# Generate javascript from proto

## Compile the proto file to js file
```
brew install protobuf
protoc --proto_path=./ --js_out=import_style=commonjs,binary:../webapp/src/proto/ *.proto
```

## Add the following line to the beginning of generated file to skip lint errors
```
/* eslint-disable */
```
