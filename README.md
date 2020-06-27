# Pantheon

Pantheon is a data platform to help open communities/organizations to record contributions of its members.

## DevOps Issues

#### 1. `gyp: No Xcode or CLT version detected!`
If you get `gyp: No Xcode or CLT version detected!`, reinstall xcode command line tools by:

```
> xcode-select --print-path
> sudo rm -r -f /Library/Developer/CommandLineTools
> xcode-select --install
```

#### 2. 'Lock file is already being held' for ipfs.test.js
If you get the error, just retry or wait 10s to retry. It's because the lock file is not released. We are fixing it.
