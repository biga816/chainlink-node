# Chainlink Node
Docker Compose sample for Chainlink Node

## Getting Started
### 1. Clone this repository
```bash
$ git clone git@github.com:biga816/chainlink-node.git
```

### 2. Create files for startup
Create files by running:
```bash
# Move to repository root
$ cd chainlink-node

# Set api email & password
$ echo "user@example.com" > chainlink/data/.api
$ echo "password" >> chainlink/data/.api

# Set wallet password
$ echo "my_wallet_password" > chainlink/data/.password

# Copy .env file
$ cp chainlink/.env.sample chainlink/.env
```

Set the variables `ETH_URL` & `ETH_CHAIN_ID` in the `.env` to your Ethereum client's URL & Chain ID.

### 3. Run a Chainlink Node

Run the Docker images by running:
```bash
$ docker-compose up -d
$ docker exec -it chainlink chainlink local n -p /chainlink/.password -a /chainlink/.api
```

### 4. Connect to Chainlink node's UI interface
Open `http://localhost:6688`.


# Contract

## Installation

```bash
npm install
```

## Test

```bash
npm test
```

## Deploy

If needed, edit the `truffle-config.js` config file to set the desired network to a different port. It assumes any network is running the RPC port on 8545.

```bash
npm run migrate:dev
```

For deploying to live networks, Truffle will use `truffle-hdwallet-provider` for your mnemonic and an RPC URL. Set your environment variables `$RPC_URL` and `$MNEMONIC` before running:

```bash
npm run migrate:live
```

## Helper Scripts

There are 3 helper scripts provided with this box in the scripts directory:

- `fund-contract.js`
- `request-data.js`
- `read-contract.js`

They can be used by calling them from `npx truffle exec`, for example:

```bash
npx truffle exec scripts/fund-contract.js --network live
```

The CLI will output something similar to the following:

```
Using network 'live'.

Funding contract: 0x972DB80842Fdaf6015d80954949dBE0A1700705E
0xd81fcf7bfaf8660149041c823e843f0b2409137a1809a0319d26db9ceaeef650
Truffle v5.0.25 (core: 5.0.25)
Node v10.16.3
```

In the `request-data.js` script, example parameters are provided for you. You can change the oracle address, Job ID, and parameters based on the information available on [our documentation](https://docs.chain.link/docs/testnet-oracles).

```bash
npx truffle exec scripts/request-data.js --network live
```

This creates a request and will return the transaction ID, for example:

```
Using network 'live'.

Creating request on contract: 0x972DB80842Fdaf6015d80954949dBE0A1700705E
0x828f256109f22087b0804a4d1a5c25e8ce9e5ac4bbc777b5715f5f9e5b181a4b
Truffle v5.0.25 (core: 5.0.25)
Node v10.16.3
```

After creating a request on a live network, you will want to wait 3 blocks for the Chainlink node to respond. Then call the `read-contract.js` script to read the contract's state.

```bash
npx truffle exec scripts/read-contract.js --network live
```

Once the oracle has responded, you will receive a value similar to the one below:

```
Using network 'live'.

21568
Truffle v5.0.25 (core: 5.0.25)
Node v10.16.3
```
