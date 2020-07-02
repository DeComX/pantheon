## Intro

BlockPin is a blockchain native IPFS pin service. It provides a RESTFUL API to help clients to upload and pin IPFS files without running a local IPFS node.

## How does it different from other IPFS pin services?

#### Reusing Blockchain Account System

The system is natively compatible with your blockchain account. You don't need extra API key or user/password to call the service. The service will authenticate you by your blockchain account.

The way it works is that:
- Before sending request, you have to get a nonce from the server. The server will link the nonce to your ethereum public address
- You signed the request with the nonce and send it to server.
- The server will authenticate the request by both of you ethereum public address and nonce. If it's valid request, it will expire the nonce.
- If you request a new nonce without using the old one, the old one will expire as well.


#### Token Based Quota Management

Currently the quota of each use is hardcoded: each user can only do 100 writes per day. In V2 we will release our own ERC20 compatible tokens for quota mangement. The new workflow would be

1. Users buy tokens from either exChanges or our official website. The token will be locked for period of time in the smart contract
2. Each write/pin request will consume some quota. User will calculate the consumption and sign a transaction to transfer the quota to server along with the request
3. Server will keep the transactions and show it to the smart contract to do the clearance peridically(before the locktime expired)

## API

####Supported Services

For now. it will only support write and pin service. For data read, you can rely on Cloundfare IPFS gateway service. We will release our own gateway service soon!

#### REST API

TBD
