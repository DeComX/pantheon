## Frontend for pantheon


## Development Issues

#### 1. `gyp: No Xcode or CLT version detected!`
If you get `gyp: No Xcode or CLT version detected!`, reinstall xcode command line tools by:

```
> xcode-select --print-path
> sudo rm -r -f /Library/Developer/CommandLineTools
> xcode-select --install
```
