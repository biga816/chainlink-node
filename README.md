# chainlink-node

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
$ cp chainlink/.env.sample chainlink/.env2
```

Set the variable `ETH_URL` in the `.env` to your Ethereum client's URL.

## 2. Run a Chainlink Node

Run the Docker images by running:
```bash
$ docker-compose up -d
$ docker exec -it -d chainlink chainlink local n -p /chainlink/.password -a /chainlink/.api
```