# chainlink-node
Docker Compose sample for Chainlink Node

## Getting Started

### 1. Create files for startup
Create files by running:
```bash
# Set api email & password
$ echo "user@example.com" > chainlink/data/.api
$ echo "password" >> chainlink/data/.api

# Set wallet password
$ echo "my_wallet_password" > chainlink/data/.password

# Copy .env file
$ cp chainlink/.env.sample chainlink/.env
```

Set the variables `ETH_URL` & `ETH_CHAIN_ID` in the `.env` to your Ethereum client's URL & Chain ID.

## 2. Run a Chainlink Node

Run the Docker images by running:
```bash
$ docker-compose up -d
$ docker exec -it -d chainlink chainlink local n -p /chainlink/.password -a /chainlink/.api
```

## 3. Connect to Chainlink node's UI interface
Open `http://localhost:6688`.
