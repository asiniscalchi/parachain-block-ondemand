# Parachain Block OnDemand

## Overview

**Parachain Block OnDemand** is a Node.js application designed to interact with a Polkadot-based blockchain network. This project enables automated coretime purchasing to produce blocks on the relay chain using parachains. It includes functionality to monitor the parachain transaction pool and purchase coretime on demand when required.

## Features
- Automatically check the parachain transaction pool.
- Purchase coretime for a parachain on the relay chain using the onDemand feature.
- Configurable parameters using an `.env` file for easy setup.

## Prerequisites
- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/parachain-block-ondemand.git
   cd parachain-block-ondemand
   ```

2. Install project dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file by copying the provided example:
   ```sh
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration values:
   - Replace `RELAY_CHAIN_WS` with the relay chain WebSocket URL.
   - Replace `PARACHAIN_WS` with the parachain WebSocket URL.
   - Replace `PARACHAIN_ID` with the appropriate parachain ID.
   - Set `MAX_AMOUNT` for purchasing coretime.
   - Set the `INTERVAL` for how frequently the script will check and execute.
   - Add your `PRIVATE_KEY` for signing transactions.

## Usage
To run the project, execute the following command:
```sh
npm start
```
This command will run the script to monitor the parachain transaction pool and purchase coretime if necessary.

## Example Environment Configuration
Below is an example of the `.env` file:
```env
# RPC URLs
RELAY_CHAIN_WS=wss://example-relay-chain-node.com
PARACHAIN_WS=wss://example-parachain-node.com

# Parachain and transaction parameters
PARACHAIN_ID=1234
MAX_AMOUNT=1000000000
INTERVAL=6000

# Private key for signing transactions
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
```

## Important
- **Security Warning**: Never commit your `.env` file containing private keys or sensitive information to version control. The `.gitignore` file already has `.env` entries to prevent this.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contributing
If you'd like to contribute, feel free to open a pull request or submit issues for bug reports and feature requests.

## Disclaimer
This software is provided as-is and is meant for educational purposes. Use it at your own risk, especially on production networks.


